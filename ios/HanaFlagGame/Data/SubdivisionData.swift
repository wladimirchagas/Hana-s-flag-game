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
              let meta = try? JSONDecoder().decode(CountrySubdivisionMeta.self, from: data)
        else { return nil }
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
