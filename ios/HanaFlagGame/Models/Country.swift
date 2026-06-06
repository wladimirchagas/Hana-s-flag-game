import Foundation

struct Country: Identifiable, Codable, Hashable {
    var id: String { code }
    let code: String           // ISO 3166-1 alpha-2, uppercase (e.g. "US")
    let name: String
    var nameOfficial: String?
    var capital: String?
    var subregion: String?
    var continent: Continent
    var population: Int?
    var languages: [String]?
    var currencies: [CurrencyInfo]?

    var flagSvgURL: URL {
        URL(string: "https://flagcdn.com/\(code.flagCdnCode).svg")!
    }
    var flagPngURL: URL {
        URL(string: "https://flagcdn.com/w320/\(code.flagCdnCode).png")!
    }
}

extension String {
    var flagCdnCode: String {
        let upper = self.uppercased()
        let territoryMap: [String: String] = [
            "DK-GL": "gl",
            "DK-FO": "fo",
            "GB-FK": "fk",
            "GB-JE": "je",
            "GB-GG": "gg",
            "GB-IM": "im",
            "GB-GI": "gi",
            "GB-IO": "io",
            "GB-GS": "gs",
            "NZ-CK": "ck",
            "NZ-NU": "nu",
            "FI-AX": "ax",
            "AU-CC": "cc",
            "ES-GIB~": "gi",
            "FR-GF": "gf",
            "FR-GP": "gp",
            "FR-MQ": "mq",
            "FR-RE": "re",
            "FR-YT": "yt"
        ]
        return territoryMap[upper] ?? self.lowercased()
    }
}

struct CurrencyInfo: Codable, Hashable {
    let code: String
    let name: String
    var symbol: String?
}

enum Continent: String, Codable, CaseIterable, Hashable {
    case africa = "Africa"
    case americas = "Americas"
    case asia = "Asia"
    case europe = "Europe"
    case oceania = "Oceania"

    var emoji: String {
        switch self {
        case .africa: return "🌍"
        case .americas: return "🌎"
        case .asia: return "🌏"
        case .europe: return "🌍"
        case .oceania: return "🌏"
        }
    }

    var color: String {
        switch self {
        case .africa: return "coral"
        case .americas: return "sky"
        case .asia: return "mustard"
        case .europe: return "lime"
        case .oceania: return "appPink"
        }
    }
}
