import Foundation

// MARK: - TopoJSON types for countries-50m.json

struct TopoJSON: Decodable {
    let type: String
    let objects: TopoObjects
    let arcs: [[[Double]]]
    let transform: TopoTransform?
}

struct TopoObjects: Decodable {
    let countries: TopoObject?
    let land: TopoObject?
}

struct TopoObject: Decodable {
    let type: String
    let geometries: [TopoGeometry]
}

struct TopoGeometry: Decodable {
    let type: String
    let id: String?
    let arcs: TopoArcs?
    let properties: [String: String]?
}

enum TopoArcs: Decodable {
    case polygon([[Int]])
    case multipolygon([[[Int]]])

    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if let p = try? container.decode([[Int]].self) {
            self = .polygon(p); return
        }
        if let mp = try? container.decode([[[Int]]].self) {
            self = .multipolygon(mp); return
        }
        throw DecodingError.typeMismatch(
            TopoArcs.self,
            .init(codingPath: decoder.codingPath, debugDescription: "Unknown arcs format")
        )
    }
}

struct TopoTransform: Decodable {
    let scale: [Double]
    let translate: [Double]
}

// MARK: - Country shape built from TopoJSON

struct CountryShape: Identifiable {
    let id: String        // ISO numeric id (as string)
    let rings: [[[Double]]]  // [[lon, lat], ...]
}

// MARK: - TopoJSON decoder

final class TopoJSONDecoder {
    static func loadCountries() -> [CountryShape] {
        guard let url = Bundle.main.url(forResource: "countries-50m", withExtension: "json"),
              let data = try? Data(contentsOf: url),
              let topo = try? JSONDecoder().decode(TopoJSON.self, from: data)
        else { return [] }

        return decode(topo: topo)
    }

    static func decode(topo: TopoJSON) -> [CountryShape] {
        guard let obj = topo.objects.countries else { return [] }
        let transform = topo.transform
        let arcs = topo.arcs

        return obj.geometries.compactMap { geom -> CountryShape? in
            guard let topoArcs = geom.arcs else { return nil }
            let id = geom.id ?? "unknown"
            var rings: [[[Double]]] = []

            func decodeArcIndexes(_ indexes: [[Int]]) -> [[Double]] {
                var pts: [[Double]] = []
                var x: Double = 0, y: Double = 0
                for idxList in indexes {
                    for rawIdx in idxList {
                        let reversed = rawIdx < 0
                        let idx = reversed ? ~rawIdx : rawIdx
                        guard idx < arcs.count else { continue }
                        let arc = reversed ? arcs[idx].reversed() : arcs[idx]
                        let start = pts.isEmpty ? 0 : 1
                        for (i, delta) in arc.enumerated() {
                            if i < start { if reversed { x = pts.last?[0] ?? 0; y = pts.last?[1] ?? 0 } }
                            if delta.count < 2 { continue }
                            if pts.isEmpty {
                                x = delta[0]; y = delta[1]
                            } else {
                                x += delta[0]; y += delta[1]
                            }
                            var lon = x, lat = y
                            if let t = transform {
                                lon = x * t.scale[0] + t.translate[0]
                                lat = y * t.scale[1] + t.translate[1]
                            }
                            if !pts.isEmpty || i >= start {
                                pts.append([lon, lat])
                            }
                        }
                    }
                }
                return pts
            }

            switch topoArcs {
            case .polygon(let arcSets):
                let ring = decodeArcIndexes(arcSets)
                if ring.count > 2 { rings.append(ring) }
            case .multipolygon(let polys):
                for arcSets in polys {
                    let ring = decodeArcIndexes(arcSets)
                    if ring.count > 2 { rings.append(ring) }
                }
            }

            guard !rings.isEmpty else { return nil }
            return CountryShape(id: id, rings: rings)
        }
    }
}
