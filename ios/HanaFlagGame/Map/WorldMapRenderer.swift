import SwiftUI
import CoreGraphics

// MARK: - ISO numeric → alpha-2 lookup

/// Maps ISO 3166-1 numeric codes (as strings) to alpha-2 codes.
/// Covers all 195 UN member / observer states; numeric codes not listed here
/// fall back to a "no match" result and the country simply draws un-highlighted.
let NUMERIC_TO_ALPHA2: [String: String] = [
    "004": "AF", "008": "AL", "012": "DZ", "020": "AD", "024": "AO",
    "028": "AG", "032": "AR", "051": "AM", "036": "AU", "040": "AT",
    "031": "AZ", "044": "BS", "048": "BH", "050": "BD", "052": "BB",
    "112": "BY", "056": "BE", "084": "BZ", "204": "BJ", "064": "BT",
    "068": "BO", "070": "BA", "072": "BW", "076": "BR", "096": "BN",
    "100": "BG", "854": "BF", "108": "BI", "132": "CV", "116": "KH",
    "120": "CM", "124": "CA", "140": "CF", "148": "TD", "152": "CL",
    "156": "CN", "170": "CO", "174": "KM", "178": "CG", "180": "CD",
    "188": "CR", "384": "CI", "191": "HR", "192": "CU", "196": "CY",
    "203": "CZ", "208": "DK", "262": "DJ", "212": "DM", "214": "DO",
    "218": "EC", "818": "EG", "222": "SV", "226": "GQ", "232": "ER",
    "233": "EE", "748": "SZ", "231": "ET", "242": "FJ", "246": "FI",
    "250": "FR", "266": "GA", "270": "GM", "268": "GE", "276": "DE",
    "288": "GH", "300": "GR", "308": "GD", "320": "GT", "324": "GN",
    "624": "GW", "328": "GY", "332": "HT", "340": "HN", "348": "HU",
    "352": "IS", "356": "IN", "360": "ID", "364": "IR", "368": "IQ",
    "372": "IE", "376": "IL", "380": "IT", "388": "JM", "392": "JP",
    "400": "JO", "398": "KZ", "404": "KE", "296": "KI", "408": "KP",
    "410": "KR", "414": "KW", "417": "KG", "418": "LA", "428": "LV",
    "422": "LB", "426": "LS", "430": "LR", "434": "LY", "438": "LI",
    "440": "LT", "442": "LU", "450": "MG", "454": "MW", "458": "MY",
    "462": "MV", "466": "ML", "470": "MT", "584": "MH", "478": "MR",
    "480": "MU", "484": "MX", "583": "FM", "498": "MD", "492": "MC",
    "496": "MN", "499": "ME", "504": "MA", "508": "MZ", "104": "MM",
    "516": "NA", "520": "NR", "524": "NP", "528": "NL", "554": "NZ",
    "558": "NI", "562": "NE", "566": "NG", "807": "MK", "578": "NO",
    "512": "OM", "586": "PK", "585": "PW", "591": "PA", "598": "PG",
    "600": "PY", "604": "PE", "608": "PH", "616": "PL", "620": "PT",
    "634": "QA", "642": "RO", "643": "RU", "646": "RW", "659": "KN",
    "662": "LC", "670": "VC", "882": "WS", "674": "SM", "678": "ST",
    "682": "SA", "686": "SN", "688": "RS", "690": "SC", "694": "SL",
    "702": "SG", "703": "SK", "705": "SI", "090": "SB", "706": "SO",
    "710": "ZA", "728": "SS", "724": "ES", "144": "LK", "729": "SD",
    "740": "SR", "752": "SE", "756": "CH", "760": "SY", "762": "TJ",
    "834": "TZ", "764": "TH", "626": "TL", "768": "TG", "776": "TO",
    "780": "TT", "788": "TN", "792": "TR", "795": "TM", "798": "TV",
    "800": "UG", "804": "UA", "784": "AE", "826": "GB", "840": "US",
    "858": "UY", "860": "UZ", "548": "VU", "862": "VE", "704": "VN",
    "887": "YE", "894": "ZM", "716": "ZW",
    // UN observer states
    "336": "VA", "275": "PS",
    // Additional territories commonly present in 50m TopoJSON
    "630": "PR", "344": "HK", "446": "MO", "158": "TW",
    "316": "GU", "850": "VI", "660": "AI",
]

// MARK: - WorldMapRenderer

struct WorldMapRenderer: View {
    let shapes: [CountryShape]
    var projection: OrthographicProjection
    var countryColors: [String: Color] = [:]
    var selectedNumericId: String? = nil
    var onTap: ((String) -> Void)? = nil  // passes numeric ID

    @Environment(\.colorScheme) var scheme

    // MARK: - Hit testing helpers

    /// Computes the average projected position of a shape's first ring.
    private func centroid(for shape: CountryShape, proj: OrthographicProjection) -> CGPoint? {
        guard let ring = shape.rings.first, !ring.isEmpty else { return nil }
        var sumX: Double = 0, sumY: Double = 0, count: Double = 0
        for coord in ring {
            guard coord.count >= 2,
                  let pt = proj.project(lon: coord[0], lat: coord[1]) else { continue }
            sumX += pt.x; sumY += pt.y; count += 1
        }
        guard count > 0 else { return nil }
        return CGPoint(x: sumX / count, y: sumY / count)
    }

    /// Finds the country whose centroid is nearest to the tap point.
    private func nearestCountry(to tapPoint: CGPoint, proj: OrthographicProjection) -> String? {
        var best: String? = nil
        var bestDist = Double.infinity
        for shape in shapes {
            guard let c = centroid(for: shape, proj: proj) else { continue }
            let dx = tapPoint.x - c.x
            let dy = tapPoint.y - c.y
            let dist = dx * dx + dy * dy
            if dist < bestDist {
                bestDist = dist
                best = shape.id
            }
        }
        return best
    }

    // MARK: - Body

    var body: some View {
        GeometryReader { geo in
            let size = geo.size
            // The projection already has translateX/Y set by the caller; we keep it
            // as-is so that WorldMapView's projection() function drives placement.
            let proj = projection
            let radius = min(size.width, size.height) / 2 * 0.98

            ZStack {
                // Ocean circle
                Circle()
                    .fill(
                        LinearGradient(
                            colors: [
                                scheme == .dark
                                    ? Color(red: 0.05, green: 0.12, blue: 0.28)
                                    : Color(red: 0.56, green: 0.80, blue: 0.95),
                                scheme == .dark
                                    ? Color(red: 0.03, green: 0.07, blue: 0.18)
                                    : Color(red: 0.35, green: 0.65, blue: 0.88)
                            ],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: radius * 2, height: radius * 2)
                    .position(x: size.width / 2, y: size.height / 2)

                // Country shapes drawn on a Canvas
                Canvas { context, _ in
                    for shape in shapes {
                        let alpha2 = NUMERIC_TO_ALPHA2[shape.id]
                        let isSelected = shape.id == selectedNumericId

                        let fillColor: Color
                        if isSelected {
                            fillColor = Color.mustard
                        } else if let a2 = alpha2, let c = countryColors[a2] {
                            fillColor = c
                        } else {
                            fillColor = Color.flagGameBackground(scheme).opacity(0.6)
                        }

                        let strokeColor = Color.flagGameInk(scheme).opacity(isSelected ? 0.8 : 0.4)
                        let strokeWidth: CGFloat = isSelected ? 1.0 : 0.5

                        for ring in shape.rings {
                            guard let cgPath = buildPath(ring: ring, projection: proj) else { continue }
                            let path = Path(cgPath)
                            context.fill(path, with: .color(fillColor))
                            context.stroke(path, with: .color(strokeColor), lineWidth: strokeWidth)
                        }
                    }
                }
                .frame(width: size.width, height: size.height)
                .clipShape(Circle().scale(radius * 2 / min(size.width, size.height)))

                // Sphere border ring
                Circle()
                    .strokeBorder(
                        Color.flagGameInk(scheme).opacity(0.25),
                        lineWidth: 1
                    )
                    .frame(width: radius * 2, height: radius * 2)
                    .position(x: size.width / 2, y: size.height / 2)
            }
            .contentShape(Circle().scale(radius * 2 / min(size.width, size.height)))
            .onTapGesture { location in
                if let id = nearestCountry(to: location, proj: proj) {
                    onTap?(id)
                }
            }
        }
    }
}
