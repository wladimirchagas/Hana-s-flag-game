import SwiftUI

// MARK: - CountryPickerView

struct CountryPickerView: View {
    let onDone: ([String]) -> Void

    @EnvironmentObject var appVM: AppViewModel
    @Environment(\.colorScheme) var scheme
    @Environment(\.dismiss) var dismiss

    @State private var searchText: String = ""
    @State private var selectedCodes: Set<String> = []

    // MARK: - Computed data

    private var allCountriesByContinent: [(continent: Continent, countries: [Country])] {
        Continent.allCases.compactMap { continent in
            let countries = STATIC_COUNTRIES
                .filter { $0.continent == continent }
                .sorted { $0.name < $1.name }
            return countries.isEmpty ? nil : (continent: continent, countries: countries)
        }
    }

    private var filteredSections: [(continent: Continent, countries: [Country])] {
        let query = searchText.trimmingCharacters(in: .whitespaces).lowercased()
        if query.isEmpty { return allCountriesByContinent }
        return allCountriesByContinent.compactMap { section in
            let matches = section.countries.filter { $0.name.lowercased().contains(query) }
            return matches.isEmpty ? nil : (continent: section.continent, countries: matches)
        }
    }

    private var totalFiltered: Int {
        filteredSections.reduce(0) { $0 + $1.countries.count }
    }

    // MARK: - Body

    var body: some View {
        NavigationStack {
            ZStack {
                Color.flagGameBackground(scheme)
                    .ignoresSafeArea()

                VStack(spacing: 0) {
                    // Search bar
                    searchBar
                        .padding(.horizontal, 16)
                        .padding(.top, 8)
                        .padding(.bottom, 10)

                    // Select all / Clear all
                    selectAllRow
                        .padding(.horizontal, 16)
                        .padding(.bottom, 8)

                    Divider()
                        .background(Color.flagGameInk(scheme).opacity(0.1))

                    // Country list
                    if filteredSections.isEmpty {
                        emptySearchView
                    } else {
                        countryList
                    }
                }
            }
            .navigationTitle("\(selectedCodes.count) countries selected")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarBackground(Color.flagGameBackground(scheme), for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") {
                        onDone(Array(selectedCodes))
                        dismiss()
                    }
                    .fredoka(17, weight: .semibold)
                    .foregroundColor(.mustard)
                }
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                    .fredoka(16)
                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.7))
                }
            }
        }
        .onAppear {
            selectedCodes = Set(appVM.selectedCountryCodes)
        }
    }

    // MARK: - Search Bar

    private var searchBar: some View {
        HStack(spacing: 8) {
            Image(systemName: "magnifyingglass")
                .font(.system(size: 15, weight: .medium))
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.45))

            TextField("Search countries…", text: $searchText)
                .fredoka(16)
                .foregroundColor(Color.flagGameInk(scheme))
                .autocorrectionDisabled()

            if !searchText.isEmpty {
                Button {
                    searchText = ""
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .font(.system(size: 15))
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.4))
                }
            }
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 9)
        .background(Color.flagGamePaper(scheme))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.flagGameInk(scheme).opacity(0.1), lineWidth: 1)
        )
    }

    // MARK: - Select All / Clear All

    private var selectAllRow: some View {
        HStack(spacing: 10) {
            Button {
                let allCodes = filteredSections.flatMap { $0.countries.map { $0.code } }
                selectedCodes.formUnion(allCodes)
            } label: {
                Text("Select All")
                    .fredoka(14, weight: .semibold)
                    .foregroundColor(Color.inkFixed)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 7)
                    .background(Color.lime)
                    .clipShape(Capsule())
            }

            Button {
                if searchText.trimmingCharacters(in: .whitespaces).isEmpty {
                    selectedCodes = []
                } else {
                    let filteredCodes = Set(filteredSections.flatMap { $0.countries.map { $0.code } })
                    selectedCodes.subtract(filteredCodes)
                }
            } label: {
                Text("Clear All")
                    .fredoka(14, weight: .semibold)
                    .foregroundColor(Color.inkFixed)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 7)
                    .background(Color.coral)
                    .clipShape(Capsule())
            }

            Spacer()

            Text("\(totalFiltered) shown")
                .fredoka(13)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.5))
        }
    }

    // MARK: - Country List

    private var countryList: some View {
        List {
            ForEach(filteredSections, id: \.continent) { section in
                Section {
                    ForEach(section.countries) { country in
                        CountryPickerRow(
                            country: country,
                            isSelected: selectedCodes.contains(country.code),
                            scheme: scheme
                        ) {
                            toggleCountry(country.code)
                        }
                        .listRowBackground(Color.flagGamePaper(scheme))
                        .listRowInsets(EdgeInsets(top: 0, leading: 16, bottom: 0, trailing: 16))
                    }
                } header: {
                    continentHeader(section.continent)
                }
            }
        }
        .listStyle(.plain)
        .scrollContentBackground(.hidden)
        .background(Color.flagGameBackground(scheme))
    }

    private func continentHeader(_ continent: Continent) -> some View {
        HStack(spacing: 6) {
            Text(continent.emoji)
                .font(.system(size: 15))
            Text(continent.rawValue.uppercased())
                .fredoka(13, weight: .semibold)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                .tracking(0.8)
        }
        .padding(.vertical, 4)
        .background(Color.flagGameBackground(scheme))
    }

    // MARK: - Empty state

    private var emptySearchView: some View {
        VStack(spacing: 14) {
            Spacer()
            Text("🔍")
                .font(.system(size: 48))
            Text("No countries match "\(searchText)"")
                .fredoka(17)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.6))
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)
            Spacer()
        }
    }

    // MARK: - Helpers

    private func toggleCountry(_ code: String) {
        if selectedCodes.contains(code) {
            selectedCodes.remove(code)
        } else {
            selectedCodes.insert(code)
        }
    }
}

// MARK: - CountryPickerRow

private struct CountryPickerRow: View {
    let country: Country
    let isSelected: Bool
    let scheme: ColorScheme
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 12) {
                FlagImageView(code: country.code, size: 28, cornerRadius: 4)

                Text(country.name)
                    .fredoka(16)
                    .foregroundColor(Color.flagGameInk(scheme))
                    .lineLimit(1)

                Spacer()

                ZStack {
                    Circle()
                        .fill(isSelected ? Color.lime : Color.flagGameBackground(scheme))
                        .frame(width: 24, height: 24)
                        .overlay(
                            Circle()
                                .stroke(
                                    isSelected ? Color.lime : Color.flagGameInk(scheme).opacity(0.25),
                                    lineWidth: 1.5
                                )
                        )

                    if isSelected {
                        Image(systemName: "checkmark")
                            .font(.system(size: 11, weight: .bold))
                            .foregroundColor(Color.inkFixed)
                    }
                }
            }
            .padding(.vertical, 9)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Preview

#Preview {
    CountryPickerView { codes in
        print("Selected: \(codes.count) countries")
    }
    .environmentObject(AppViewModel())
}
