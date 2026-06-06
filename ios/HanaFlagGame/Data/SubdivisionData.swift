import Foundation

struct SubdivisionMeta: Codable, Identifiable {
    var id: String { code }
    let code: String
    let name: String
    let typeLabel: String
}

struct CountrySubdivisionMeta: Codable {
    let countryCode: String
    let pluralLabel: String
    let divisions: [SubdivisionMeta]
}

private struct GeoJSONSubdivisionFile: Decodable {
    struct Feature: Decodable {
        struct Properties: Decodable {
            let name: String?
            let name_en: String?
            let iso_3166_2: String?
            let type: String?
            let type_en: String?
            
            enum CodingKeys: String, CodingKey {
                case name
                case name_en = "name_en"
                case iso_3166_2 = "iso_3166_2"
                case type
                case type_en = "type_en"
            }
        }
        let properties: Properties?
    }
    let features: [Feature]
}

final class SubdivisionDataService {
    static let shared = SubdivisionDataService()
    private var cache: [String: CountrySubdivisionMeta] = [:]
    private init() {}

    func subdivisions(for countryCode: String) -> CountrySubdivisionMeta? {
        let code = countryCode.uppercased()
        if let cached = cache[code] { return cached }
        guard let url = Bundle.main.url(forResource: "subdivisions/\(code.lowercased())", withExtension: "json")
               ?? Bundle.main.url(forResource: code.lowercased(), withExtension: "json", subdirectory: "subdivisions")
        else { return nil }
        guard let data = try? Data(contentsOf: url),
              let geoJSON = try? JSONDecoder().decode(GeoJSONSubdivisionFile.self, from: data)
        else { return nil }

        // Count type_en occurrences to find the most common type
        var typeCounts: [String: Int] = [:]
        for f in geoJSON.features {
            if let t = f.properties?.type_en, !t.isEmpty {
                typeCounts[t, default: 0] += 1
            }
        }
        let bestType = typeCounts.max(by: { $0.value < $1.value })?.key ?? "Division"

        func pluralize(_ type: String) -> String {
            let t = type.trimmingCharacters(in: .whitespacesAndNewlines)
            if t.isEmpty { return "Divisions" }
            if t == "Land" { return "Länder" }
            if t == "Territory" { return "Territories" }
            if t == "County" { return "Counties" }
            if t == "City" { return "Cities" }
            if t == "Dependency" { return "Dependencies" }
            if t == "Duchy" { return "Duchies" }
            if t == "Autonomous Community" { return "Autonomous Communities" }
            if t == "Autonomous Region" { return "Autonomous Regions" }
            if t == "Autonomous Republic" { return "Autonomous Republics" }
            if t == "Federal District" { return "Federal Districts" }
            if t == "Union Territory" { return "Union Territories" }
            return t + "s"
        }

        let pluralLabel = pluralize(bestType)

        let divisions = geoJSON.features.compactMap { f -> SubdivisionMeta? in
            guard let p = f.properties else { return nil }
            let divCode = p.iso_3166_2 ?? p.name ?? ""
            if divCode.isEmpty { return nil }
            let name = p.name_en ?? p.name ?? divCode
            let typeLabel = p.type_en ?? p.type ?? bestType
            return SubdivisionMeta(code: divCode, name: name, typeLabel: typeLabel)
        }

        if divisions.isEmpty { return nil }

        let meta = CountrySubdivisionMeta(
            countryCode: code,
            pluralLabel: pluralLabel,
            divisions: divisions
        )
        cache[code] = meta
        return meta
    }

    /// Countries that have subdivision GeoJSON files available
    var availableCountryCodes: [String] {
        guard let url = Bundle.main.url(forResource: "subdivisions", withExtension: nil),
              let contents = try? FileManager.default.contentsOfDirectory(atPath: url.path)
        else { return KNOWN_SUBDIVISION_CODES }
        return contents
            .filter { $0.hasSuffix(".json") }
            .map { $0.replacingOccurrences(of: ".json", with: "").uppercased() }
            .sorted()
    }
}


let KNOWN_SUBDIVISION_CODES: [String] = [
    "AU", "BR", "CA", "CN", "DE", "FR", "IN", "IT", "JP", "MX",
    "NG", "PK", "RU", "US", "ZA", "AR", "BD", "CI", "EG", "ES",
    "ET", "GA", "GB", "GH", "ID", "KE", "KZ", "MG", "MM", "MZ",
    "PH", "SN", "TH", "TZ", "UG", "UZ", "VN"
]
