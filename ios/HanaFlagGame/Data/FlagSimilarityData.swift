import Foundation

struct SimilarityGroup: Identifiable {
    let id: String
    let label: String
    let codes: [String]  // ISO 3166-1 alpha-2 country codes
}

let FLAG_SIMILARITY_GROUPS: [SimilarityGroup] = [
    SimilarityGroup(id: "stripes-canton",     label: "Stripes & Canton",                 codes: ["US", "LR", "MY"]),
    SimilarityGroup(id: "blue-ensign",        label: "Blue Ensign",                       codes: ["NZ", "AU", "TV", "FJ"]),
    SimilarityGroup(id: "vertical-byr",       label: "Vertical Blue-Yellow-Red",          codes: ["TD", "RO", "AD", "MD"]),
    SimilarityGroup(id: "gran-colombia",      label: "Gran Colombia palette",             codes: ["CO", "EC", "VE"]),
    SimilarityGroup(id: "green-yellow-red",   label: "Green-Yellow-Red",                  codes: ["CG", "SN", "CM", "GH", "BO", "ET", "ST", "GW", "TG", "BJ", "GN", "ML", "LT", "MM", "BF"]),
    SimilarityGroup(id: "red-white-bicolor",  label: "Red & White bicolour",              codes: ["SG", "ID", "MC", "PL", "MT"]),
    SimilarityGroup(id: "arab-palette",       label: "Arab palette",                      codes: ["EG", "IQ", "YE", "SD", "KW", "JO", "PS", "AE", "SY"]),
    SimilarityGroup(id: "red-white-blue-h",   label: "Red-White-Blue horizontal",         codes: ["LU", "NL", "PY", "HR", "SK", "SI", "RU", "RS"]),
    SimilarityGroup(id: "triangle-hoist",     label: "Triangle on hoist",                 codes: ["CZ", "CL", "CR", "CU", "PH"]),
    SimilarityGroup(id: "red-white-green",    label: "Red-White-Green",                   codes: ["HU", "TJ", "IR", "GQ", "BG", "IT", "MX"]),
    SimilarityGroup(id: "red-white-red",      label: "Red-White-Red stripes",             codes: ["LV", "AT", "LB", "TH"]),
    SimilarityGroup(id: "blue-white",         label: "Blue & White",                      codes: ["BW", "AR", "HN", "NI", "SV", "UY", "GT"]),
    SimilarityGroup(id: "saffron-white-green",label: "Saffron, White & Green",            codes: ["IN", "NE"]),
    SimilarityGroup(id: "disc-on-field",      label: "Plain field with disc",             codes: ["JP", "BD", "PW", "LA"]),
    SimilarityGroup(id: "red-field-star",     label: "Red field with centred star",       codes: ["CN", "VN", "MA"]),
    SimilarityGroup(id: "red-crescent-star",  label: "Red field, crescent & star",        codes: ["TR", "TN"]),
    SimilarityGroup(id: "red-eagle",          label: "Red field with eagle",              codes: ["AL", "ME"]),
    SimilarityGroup(id: "serrated",           label: "Serrated bicolour",                 codes: ["BH", "QA"]),
    SimilarityGroup(id: "blue-red-bicolor",   label: "Blue & Red bicolour",               codes: ["LI", "HT"]),
    SimilarityGroup(id: "green-crescent",     label: "Green field with crescent",         codes: ["MV", "MR"]),
    SimilarityGroup(id: "green-yellow-blue",  label: "Green, Yellow & Blue",              codes: ["GA", "RW", "SB"]),
    SimilarityGroup(id: "blue-stars-stripe",  label: "Blue field with stars & stripe",    codes: ["NR", "MH", "CV"]),
    SimilarityGroup(id: "hoist-stripe",       label: "Vertical hoist stripe",             codes: ["OM", "MG", "BJ", "GW"]),
    SimilarityGroup(id: "nordic-cross",       label: "Nordic Cross",                      codes: ["DK", "NO", "IS", "SE", "FI"]),
    SimilarityGroup(id: "green-white-orange", label: "Green, White & Orange",             codes: ["IE", "CI"]),
    SimilarityGroup(id: "green-blue",         label: "Green, White & Blue",               codes: ["DJ", "SL", "LS"]),
    SimilarityGroup(id: "red-white-cross",    label: "Red & White cross",                 codes: ["CH", "TO", "GE"]),
    SimilarityGroup(id: "shahada",            label: "Shahada inscription",               codes: ["SA", "AF"]),
    SimilarityGroup(id: "black-red-green",    label: "Black, Red & Green stripes",        codes: ["KE", "SS", "LY", "MW"]),
    SimilarityGroup(id: "black-yellow-red",   label: "Black, Yellow & Red vertical",      codes: ["DE", "BE"]),
    SimilarityGroup(id: "symmetric-vertical", label: "Symmetric vertical tricolour",      codes: ["PE", "NG"]),
]

/// Maps each country code to the array of similarity-group IDs it belongs to.
let FLAG_SIMILARITIES: [String: [String]] = {
    var result: [String: [String]] = [:]
    for group in FLAG_SIMILARITY_GROUPS {
        for code in group.codes {
            result[code, default: []].append(group.id)
        }
    }
    return result
}()
