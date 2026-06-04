import Foundation

enum GameMode: Hashable, Codable {
    case hana                               // Custom country list, retry enabled
    case quickQuiz(flagCount: Int)          // Random sample, no retry
    case all195                             // All countries, no retry
    case continent(codes: [String], label: String)
    case subregion(codes: [String], label: String)
    case similarity(codes: [String], label: String, hardcore: Bool)
    case subnational(countryCode: String, countryName: String)

    var displayLabel: String {
        switch self {
        case .hana: return "Hana's Game"
        case .quickQuiz(let n): return "Quick Quiz · \(n) flags"
        case .all195: return "All 195"
        case .continent(_, let l): return l
        case .subregion(_, let l): return l
        case .similarity(_, let l, let hc): return hc ? "\(l) · Hardcore" : l
        case .subnational(_, let name): return "\(name) · Regions"
        }
    }

    var modeLabel: String {
        switch self {
        case .hana: return "Hana's Game"
        case .quickQuiz: return "Quick Quiz"
        case .all195: return "Flag Master · All"
        case .continent: return "Flag Master · Continent"
        case .subregion: return "Flag Master · Sub-region"
        case .similarity: return "Flag Master · Similarity"
        case .subnational: return "Subnational"
        }
    }

    var allowsRetry: Bool {
        if case .hana = self { return true }
        return false
    }

    var filterCodes: [String]? {
        switch self {
        case .hana: return nil   // loaded separately from UserDefaults
        case .quickQuiz: return nil
        case .all195: return nil
        case .continent(let c, _): return c
        case .subregion(let c, _): return c
        case .similarity(let c, _, _): return c
        case .subnational: return nil
        }
    }

    var flagCount: Int? {
        if case .quickQuiz(let n) = self { return n }
        return nil
    }

    var useFullAlternatives: Bool {
        if case .similarity(_, _, let hc) = self { return hc }
        return false
    }

    var leaderboardKey: String {
        switch self {
        case .hana: return "custom"
        case .quickQuiz(let n): return "quiz-\(n)"
        case .all195: return "all195"
        case .continent(_, let l): return "continent-\(l.lowercased().replacingOccurrences(of: " ", with: "-"))"
        case .subregion(_, let l): return "subregion-\(l.lowercased().replacingOccurrences(of: " ", with: "-"))"
        case .similarity(_, let l, let hc): return "similarity-\(l.lowercased())\(hc ? "-hardcore" : "")"
        case .subnational(let c, _): return "subnational-\(c.lowercased())"
        }
    }
}

struct GameConfig: Hashable {
    let mode: GameMode
    var selectedCodes: [String]? = nil  // for .hana mode, loaded at start time
}
