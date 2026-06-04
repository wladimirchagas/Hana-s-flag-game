import Foundation

enum Difficulty: String, CaseIterable {
    case easy, moderate, hard
}

let EASY_CODES: Set<String> = [
    "AR", "AU", "BR", "CA", "CH", "CN", "DE", "EG", "ES", "FR",
    "GB", "GR", "ID", "IN", "IT", "JP", "KR", "MX", "MY", "NL",
    "NP", "NZ", "PT", "RU", "SA", "SE", "SG", "TR", "US", "VA", "ZA"
]

let MODERATE_CODES: Set<String> = [
    "AL", "AT", "BA", "BD", "BE", "BG", "BO", "BY", "CL", "CM",
    "CO", "CR", "CU", "CY", "CZ", "DK", "DZ", "EC", "EE", "ET",
    "FI", "GA", "GH", "GT", "HN", "HR", "HU", "IE", "IL", "IQ",
    "IR", "IS", "JM", "JO", "KE", "KP", "KW", "LB", "LT", "LU",
    "LV", "LY", "MA", "MD", "MK", "MN", "MT", "NG", "NO", "PA",
    "PE", "PH", "PK", "PL", "PS", "QA", "RO", "RS", "SI", "SK",
    "SN", "SY", "TH", "TN", "TZ", "UA", "UY", "VE", "VN", "YE",
    "ZW", "AE", "AF", "AM", "AZ", "GE", "KZ", "LK", "MM", "OM",
    "UZ", "DO", "SV", "GD", "HT", "HN", "NI", "PR", "TT"
]

func difficultyOf(_ code: String) -> Difficulty {
    if EASY_CODES.contains(code) { return .easy }
    if MODERATE_CODES.contains(code) { return .moderate }
    return .hard
}

func codesForDifficulty(_ difficulty: Difficulty) -> Set<String> {
    switch difficulty {
    case .easy: return EASY_CODES
    case .moderate: return MODERATE_CODES
    case .hard: return UN_MEMBER_CODES.subtracting(EASY_CODES).subtracting(MODERATE_CODES)
    }
}
