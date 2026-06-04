import SwiftUI

// MARK: - FlagGridView

struct FlagGridView: View {
    let countries: [Country]
    @Binding var selectedContinent: Continent?
    var onSelect: (Country) -> Void

    @Environment(\.colorScheme) var scheme

    private let columns = [
        GridItem(.flexible(), spacing: 10),
        GridItem(.flexible(), spacing: 10),
        GridItem(.flexible(), spacing: 10),
        GridItem(.flexible(), spacing: 10)
    ]

    private var filtered: [Country] {
        guard let c = selectedContinent else { return countries }
        return countries.filter { $0.continent == c }
    }

    var body: some View {
        VStack(spacing: 0) {
            // Continent filter pills
            ContinentFilterBar(selected: $selectedContinent)
                .padding(.horizontal, 12)
                .padding(.vertical, 10)

            Divider()
                .background(Color.flagGameInk(scheme).opacity(0.1))

            // Flag grid
            ScrollView(showsIndicators: false) {
                LazyVGrid(columns: columns, spacing: 12) {
                    ForEach(filtered) { country in
                        FlagGridCell(country: country, onTap: { onSelect(country) })
                    }
                }
                .padding(12)
            }
        }
    }
}

// MARK: - ContinentFilterBar

private struct ContinentFilterBar: View {
    @Binding var selected: Continent?
    @Environment(\.colorScheme) var scheme

    private struct FilterOption: Identifiable {
        let id: String
        let label: String
        let continent: Continent?
        let color: Color
    }

    private let options: [FilterOption] = [
        FilterOption(id: "all",      label: "All",      continent: nil,          color: Color.mustard),
        FilterOption(id: "africa",   label: "Africa",   continent: .africa,      color: Color.coral),
        FilterOption(id: "americas", label: "Americas", continent: .americas,    color: Color.sky),
        FilterOption(id: "asia",     label: "Asia",     continent: .asia,        color: Color.mustard),
        FilterOption(id: "europe",   label: "Europe",   continent: .europe,      color: Color.lime),
        FilterOption(id: "oceania",  label: "Oceania",  continent: .oceania,     color: Color.pink),
    ]

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(options) { option in
                    let isActive = option.continent == selected
                    Button {
                        withAnimation(.easeInOut(duration: 0.18)) {
                            selected = option.continent
                        }
                    } label: {
                        Text(option.label)
                            .fredoka(14, weight: isActive ? .bold : .regular)
                            .foregroundColor(isActive ? Color.inkFixed : Color.flagGameInk(scheme))
                            .padding(.horizontal, 14)
                            .padding(.vertical, 7)
                            .background(
                                isActive
                                    ? option.color
                                    : Color.flagGamePaper(scheme)
                            )
                            .clipShape(Capsule())
                            .overlay(
                                Capsule()
                                    .strokeBorder(
                                        isActive ? Color.clear : Color.flagGameInk(scheme).opacity(0.15),
                                        lineWidth: 1
                                    )
                            )
                            .stickerShadow()
                    }
                    .accessibilityLabel("\(option.label) filter")
                    .accessibilityAddTraits(isActive ? [.isSelected] : [])
                }
            }
        }
    }
}

// MARK: - FlagGridCell

private struct FlagGridCell: View {
    let country: Country
    var onTap: () -> Void

    @Environment(\.colorScheme) var scheme

    var body: some View {
        Button(action: onTap) {
            VStack(spacing: 5) {
                FlagImageView(code: country.code, size: 44)

                Text(country.name)
                    .fredoka(10)
                    .foregroundColor(Color.flagGameInk(scheme))
                    .lineLimit(2)
                    .multilineTextAlignment(.center)
                    .minimumScaleFactor(0.7)
                    .frame(maxWidth: .infinity)
            }
            .padding(.horizontal, 2)
            .padding(.vertical, 6)
            .contentShape(Rectangle())
        }
        .accessibilityLabel(country.name)
    }
}

#Preview {
    FlagGridView(
        countries: [
            Country(code: "US", name: "United States",  continent: .americas),
            Country(code: "GB", name: "United Kingdom", continent: .europe),
            Country(code: "JP", name: "Japan",          continent: .asia),
            Country(code: "BR", name: "Brazil",         continent: .americas),
        ],
        selectedContinent: .constant(nil),
        onSelect: { _ in }
    )
}
