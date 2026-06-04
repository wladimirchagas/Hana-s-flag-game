import Foundation

struct HistoricalEra: Identifiable {
    let id: String
    let label: String
    let caption: String
    let year: String
    let summary: String
    let dataFileName: String? // nil for "Today"
}

let HISTORICAL_ERAS: [HistoricalEra] = [
    HistoricalEra(
        id: "bc2000",
        label: "2000 BC",
        caption: "Bronze Age",
        year: "2000 BC",
        summary: "Bronze Age — Egypt's Old Kingdom, Sumerian city-states, Indus Valley civilisation.",
        dataFileName: "world_bc2000.geojson"
    ),
    HistoricalEra(
        id: "bc500",
        label: "500 BC",
        caption: "Classical antiquity",
        year: "500 BC",
        summary: "Achaemenid Persia at its peak, Greek city-states, the Warring States in China, early Maurya in India.",
        dataFileName: "world_bc500.geojson"
    ),
    HistoricalEra(
        id: "ad100",
        label: "100 AD",
        caption: "Roman peak",
        year: "100 AD",
        summary: "The Roman Empire under Trajan, Han China, Parthian Empire, Kushans on the Silk Road.",
        dataFileName: "world_100.geojson"
    ),
    HistoricalEra(
        id: "ad1300",
        label: "1300",
        caption: "Mongol era",
        year: "1300 AD",
        summary: "The Mongol Empire and its successor khanates dominate Asia; Mali Empire in Africa; Byzantine Empire shrinking.",
        dataFileName: "world_1300.geojson"
    ),
    HistoricalEra(
        id: "ad1815",
        label: "1815",
        caption: "Age of Empires",
        year: "1815 AD",
        summary: "Post-Napoleonic Europe, the British Empire expanding, newly independent nations in the Americas.",
        dataFileName: "world_1815.geojson"
    ),
    HistoricalEra(
        id: "ad1914",
        label: "1914",
        caption: "World War I eve",
        year: "1914 AD",
        summary: "European empires at their peak, the Ottoman Empire in decline, the scramble for Africa complete.",
        dataFileName: "world_1914.geojson"
    ),
    HistoricalEra(
        id: "today",
        label: "Today",
        caption: "Modern world",
        year: "Today",
        summary: "The modern world with 195 UN member states.",
        dataFileName: nil
    )
]
