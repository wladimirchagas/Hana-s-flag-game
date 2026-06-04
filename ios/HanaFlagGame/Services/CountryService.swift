import Foundation

final class CountryService: ObservableObject {
    static let shared = CountryService()

    @Published private(set) var countries: [Country] = []
    @Published private(set) var isLoaded = false
    @Published private(set) var error: String?

    private let cacheKey = "flagGame.cachedCountries"
    private let cacheVersionKey = "flagGame.countryDataVersion"
    private let cacheVersion = 2

    private init() {}

    func loadIfNeeded() async {
        guard !isLoaded else { return }
        if let cached = loadFromCache() {
            await MainActor.run {
                self.countries = cached
                self.isLoaded = true
            }
            Task { await refreshFromAPI() }
            return
        }
        await fetchAndCache()
    }

    @discardableResult
    func fetchAndCache() async -> [Country] {
        do {
            let fetched = try await fetchFromAPI()
            let merged = mergeWithStatic(fetched)
            saveToCache(merged)
            await MainActor.run {
                self.countries = merged
                self.isLoaded = true
                self.error = nil
            }
            return merged
        } catch {
            let fallback = STATIC_COUNTRIES
            await MainActor.run {
                if self.countries.isEmpty { self.countries = fallback }
                self.isLoaded = true
                self.error = error.localizedDescription
            }
            return fallback
        }
    }

    private func refreshFromAPI() async {
        guard let fresh = try? await fetchFromAPI() else { return }
        let merged = mergeWithStatic(fresh)
        saveToCache(merged)
        await MainActor.run {
            self.countries = merged
        }
    }

    private func fetchFromAPI() async throws -> [Country] {
        let apiURL = "https://restcountries.com/v3.1/all?fields=name,flags,cca2,region,subregion,capital,population,languages,currencies"
        guard let url = URL(string: apiURL) else { throw URLError(.badURL) }
        let (data, response) = try await URLSession.shared.data(from: url)
        guard let httpResp = response as? HTTPURLResponse, httpResp.statusCode == 200 else {
            throw URLError(.badServerResponse)
        }

        let raw = try JSONSerialization.jsonObject(with: data) as? [[String: Any]] ?? []
        var result: [Country] = []

        for item in raw {
            guard
                let nameDict = item["name"] as? [String: Any],
                let name = nameDict["common"] as? String,
                let code = item["cca2"] as? String,
                let region = item["region"] as? String,
                let continent = continentFrom(region)
            else { continue }

            if !UN_MEMBER_CODES.contains(code.uppercased()) { continue }

            let official = nameDict["official"] as? String
            let subregion = item["subregion"] as? String
            let capitals = item["capital"] as? [String]
            let pop = item["population"] as? Int
            let langDict = item["languages"] as? [String: String]
            let languages = langDict.map { Array(Set($0.values)).sorted() }
            let currDict = item["currencies"] as? [String: [String: String]]
            let currencies = currDict?.compactMap { k, v -> CurrencyInfo? in
                guard let n = v["name"], !n.isEmpty else { return nil }
                return CurrencyInfo(code: k, name: n, symbol: v["symbol"])
            }

            result.append(Country(
                code: code.uppercased(),
                name: name,
                nameOfficial: official,
                capital: capitals?.first,
                subregion: subregion,
                continent: continent,
                population: pop,
                languages: languages,
                currencies: currencies?.isEmpty == false ? currencies : nil
            ))
        }

        result.sort { $0.name.localizedCompare($1.name) == .orderedAscending }
        return result
    }

    private func continentFrom(_ region: String) -> Continent? {
        switch region {
        case "Africa": return .africa
        case "Americas": return .americas
        case "Asia": return .asia
        case "Europe": return .europe
        case "Oceania": return .oceania
        default: return nil
        }
    }

    private func mergeWithStatic(_ api: [Country]) -> [Country] {
        var lookup = Dictionary(uniqueKeysWithValues: api.map { ($0.code, $0) })
        for static_ in STATIC_COUNTRIES {
            if lookup[static_.code] == nil { lookup[static_.code] = static_ }
        }
        return lookup.values.sorted { $0.name.localizedCompare($1.name) == .orderedAscending }
    }

    private func saveToCache(_ countries: [Country]) {
        guard let data = try? JSONEncoder().encode(countries) else { return }
        UserDefaults.standard.set(data, forKey: cacheKey)
        UserDefaults.standard.set(cacheVersion, forKey: cacheVersionKey)
    }

    private func loadFromCache() -> [Country]? {
        guard UserDefaults.standard.integer(forKey: cacheVersionKey) == cacheVersion,
              let data = UserDefaults.standard.data(forKey: cacheKey),
              let decoded = try? JSONDecoder().decode([Country].self, from: data),
              !decoded.isEmpty
        else { return nil }
        return decoded
    }

    func country(code: String) -> Country? {
        countries.first { $0.code == code.uppercased() }
    }

    var worldBankPopulationLoaded = false
    func refreshPopulation() async {
        guard !worldBankPopulationLoaded else { return }
        let wbURL = "https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&date=2024&per_page=400"
        guard let url = URL(string: wbURL) else { return }
        guard let (data, _) = try? await URLSession.shared.data(from: url) else { return }
        guard let arr = (try? JSONSerialization.jsonObject(with: data)) as? [Any],
              arr.count >= 2,
              let rows = arr[1] as? [[String: Any]] else { return }
        let popMap: [String: Int] = rows.reduce(into: [:]) { acc, row in
            guard let countryDict = row["country"] as? [String: String],
                  let id = countryDict["id"]?.uppercased(),
                  let val = row["value"] as? Double, val > 0 else { return }
            acc[id] = Int(val)
        }
        await MainActor.run {
            self.countries = self.countries.map { c in
                guard let pop = popMap[c.code] else { return c }
                var updated = c
                updated.population = pop
                return updated
            }
            self.worldBankPopulationLoaded = true
            self.saveToCache(self.countries)
        }
    }
}
