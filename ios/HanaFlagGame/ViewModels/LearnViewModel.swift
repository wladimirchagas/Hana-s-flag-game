import Foundation
import Combine

@MainActor
final class LearnViewModel: ObservableObject {
    @Published var selectedCountry: Country? = nil
    @Published var selectedHistoricalPolity: HistoricalPolity? = nil
    @Published var currentEra: HistoricalEra = HISTORICAL_ERAS.last! // "Today"
    @Published var mapRotationLon: Double = 0.0  // center longitude
    @Published var isSouthUp: Bool = false
    @Published var showFlagGrid: Bool = false
    @Published var flagGridContinent: Continent? = nil
    @Published var searchText: String = ""
    @Published var isMapRotating: Bool = false
    @Published var historicalFeatures: [HistoricalPolity] = []
    @Published var isLoadingHistorical: Bool = false

    var isHistoricalMode: Bool { currentEra.id != "today" }

    func setEra(_ era: HistoricalEra) {
        currentEra = era
        selectedCountry = nil
        selectedHistoricalPolity = nil
        if era.dataFileName != nil {
            loadHistoricalData(era: era)
        }
    }

    func loadHistoricalData(era: HistoricalEra) {
        guard let fileName = era.dataFileName else { return }
        isLoadingHistorical = true
        Task {
            let polities = await GeoJSONLoader.loadHistoricalPolities(fileName: fileName)
            await MainActor.run {
                self.historicalFeatures = polities
                self.isLoadingHistorical = false
            }
        }
    }

    func rotateMap(by delta: Double) {
        mapRotationLon = (mapRotationLon + delta).truncatingRemainder(dividingBy: 360)
    }

    func filteredCountries(allCountries: [Country]) -> [Country] {
        guard !searchText.isEmpty else { return allCountries }
        let q = searchText.lowercased()
        return allCountries.filter {
            $0.name.lowercased().contains(q) ||
            $0.code.lowercased().contains(q) ||
            ($0.capital?.lowercased().contains(q) ?? false)
        }
    }

    func continentCountries(_ continent: Continent?, allCountries: [Country]) -> [Country] {
        guard let c = continent else { return allCountries }
        return allCountries.filter { $0.continent == c }
    }
}

struct HistoricalPolity: Identifiable {
    let id: String
    let name: String
    var note: String?
    var continent: String?
    var population: Int?
    let coordinates: [[[Double]]]  // MultiPolygon coordinates
    let geometryType: String       // "Polygon" or "MultiPolygon"
}

class GeoJSONLoader {
    static func loadHistoricalPolities(fileName: String) async -> [HistoricalPolity] {
        guard let url = Bundle.main.url(forResource: fileName, withExtension: nil, subdirectory: "historical-maps")
               ?? Bundle.main.url(forResource: fileName.replacingOccurrences(of: ".geojson", with: ""), withExtension: "geojson", subdirectory: "historical-maps")
        else { return [] }

        guard let data = try? Data(contentsOf: url),
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let features = json["features"] as? [[String: Any]]
        else { return [] }

        return features.compactMap { feature -> HistoricalPolity? in
            guard let geometry = feature["geometry"] as? [String: Any],
                  let geoType = geometry["type"] as? String,
                  let props = feature["properties"] as? [String: Any]
            else { return nil }

            let name = (props["NAME"] as? String) ?? (props["name"] as? String) ?? "Unknown"
            let id = "\(name)-\(UUID().uuidString.prefix(6))"

            var coords: [[[Double]]] = []
            if geoType == "Polygon" {
                if let raw = geometry["coordinates"] as? [[[Double]]] {
                    coords = raw
                }
            } else if geoType == "MultiPolygon" {
                if let raw = geometry["coordinates"] as? [[[[Double]]]] {
                    coords = raw.flatMap { $0 }
                }
            }

            return HistoricalPolity(
                id: id,
                name: name,
                coordinates: coords,
                geometryType: geoType
            )
        }
    }
}
