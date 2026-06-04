import SwiftUI

// MARK: - LearnView

struct LearnView: View {
    @Binding var path: NavigationPath
    @StateObject var learnVM = LearnViewModel()
    @EnvironmentObject var appVM: AppViewModel
    @Environment(\.colorScheme) var scheme
    @Environment(\.horizontalSizeClass) var hSizeClass

    // TopoJSON shapes loaded in background
    @State private var shapes: [CountryShape] = []
    @State private var shapesLoaded = false

    // Sheet / panel state
    @State private var showDetailSheet = false
    @State private var showFlagGridSheet = false

    // Countries from shared service
    private var allCountries: [Country] { CountryService.shared.countries }

    private var isIpad: Bool { hSizeClass == .regular }

    // MARK: - Body

    var body: some View {
        ZStack(alignment: .top) {
            Color.flagGameBackground(scheme)
                .ignoresSafeArea()

            if isIpad {
                ipadLayout
            } else {
                iphoneLayout
            }
        }
        .navigationBarHidden(true)
        .sheet(isPresented: $showFlagGridSheet) {
            flagGridSheet
        }
        .onAppear {
            loadDataIfNeeded()
        }
    }

    // MARK: - Data loading

    private func loadDataIfNeeded() {
        // Load country data if needed
        Task { await CountryService.shared.loadIfNeeded() }

        // Load TopoJSON shapes if not already loaded
        if !shapesLoaded {
            Task.detached(priority: .userInitiated) {
                let loaded = TopoJSONDecoder.loadCountries()
                await MainActor.run {
                    self.shapes = loaded
                    self.shapesLoaded = true
                }
            }
        }

        // Load historical data for current era if needed
        if learnVM.currentEra.dataFileName != nil && learnVM.historicalFeatures.isEmpty {
            learnVM.loadHistoricalData(era: learnVM.currentEra)
        }
    }

    // MARK: - iPhone Layout

    private var iphoneLayout: some View {
        ZStack(alignment: .bottom) {
            // Map fills the screen
            mapOrGridContent
                .ignoresSafeArea(edges: .bottom)

            // Top bar overlay
            VStack(spacing: 0) {
                topBar
                if !learnVM.searchText.isEmpty {
                    searchResultsOverlay
                }
                Spacer()
            }

            // Bottom controls row
            bottomControlBar
                .padding(.horizontal, 12)
                .padding(.bottom, 16)
        }
        // Bottom sheet for detail panel
        .sheet(isPresented: $showDetailSheet) {
            detailSheet
                .presentationDetents([.medium, .large])
                .presentationDragIndicator(.visible)
        }
        .onChange(of: learnVM.selectedCountry) { c in
            if c != nil { showDetailSheet = true }
        }
        .onChange(of: learnVM.selectedHistoricalPolity) { p in
            if p != nil { showDetailSheet = true }
        }
    }

    // MARK: - iPad Layout

    private var ipadLayout: some View {
        HStack(spacing: 0) {
            // Left: map (60%)
            ZStack(alignment: .top) {
                mapOrGridContent

                topBar
            }
            .frame(maxWidth: .infinity)

            // Right: detail panel (40%)
            VStack(spacing: 0) {
                // Era slider when in historical mode
                if learnVM.isHistoricalMode {
                    EraSliderPanelView(learnVM: learnVM)
                        .padding(12)
                }

                CountryDetailPanel(
                    country: learnVM.selectedCountry,
                    polity: learnVM.selectedHistoricalPolity
                )
                .environmentObject(appVM)
                .background(Color.flagGamePaper(scheme))
            }
            .frame(width: UIScreen.main.bounds.width * 0.38)
            .background(Color.flagGamePaper(scheme))
        }
    }

    // MARK: - Map or grid content

    @ViewBuilder
    private var mapOrGridContent: some View {
        if learnVM.showFlagGrid {
            FlagGridView(
                countries: learnVM.filteredCountries(allCountries: allCountries),
                selectedContinent: $learnVM.flagGridContinent,
                onSelect: { country in
                    learnVM.selectedCountry = country
                    learnVM.selectedHistoricalPolity = nil
                    if !isIpad { showDetailSheet = true }
                }
            )
        } else {
            if learnVM.isHistoricalMode {
                HistoricalMapView(
                    learnVM: learnVM,
                    shapes: shapes,
                    onPolitySelected: { polity in
                        if !isIpad { showDetailSheet = true }
                        _ = polity
                    }
                )
            } else {
                WorldMapView(
                    learnVM: learnVM,
                    shapes: shapes,
                    countries: allCountries,
                    onCountrySelected: { _ in
                        if !isIpad { showDetailSheet = true }
                    }
                )
            }
        }
    }

    // MARK: - Top bar

    private var topBar: some View {
        HStack(spacing: 8) {
            // Back button
            Button {
                path = NavigationPath()
            } label: {
                Image(systemName: "chevron.left.circle.fill")
                    .font(.system(size: 28, weight: .semibold))
                    .foregroundColor(Color.flagGameInk(scheme))
            }
            .accessibilityLabel("Back")

            // Search bar
            HStack(spacing: 8) {
                Image(systemName: "magnifyingglass")
                    .font(.system(size: 14))
                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.5))
                TextField("Search countries…", text: $learnVM.searchText)
                    .fredoka(15)
                    .foregroundColor(Color.flagGameInk(scheme))
                    .autocorrectionDisabled()
                if !learnVM.searchText.isEmpty {
                    Button {
                        learnVM.searchText = ""
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .font(.system(size: 14))
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.45))
                    }
                }
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 8)
            .background(Color.flagGamePaper(scheme).opacity(0.92))
            .clipShape(Capsule())
            .stickerShadow()

            // Theme toggle
            ThemeToggleView()
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)
        .background(
            learnVM.showFlagGrid
                ? Color.flagGameBackground(scheme).opacity(0.97)
                : Color.clear
        )
    }

    // MARK: - Search results overlay (iPhone, when search text non-empty)

    private var searchResultsOverlay: some View {
        let results = learnVM.filteredCountries(allCountries: allCountries)
        return ScrollView(showsIndicators: false) {
            VStack(spacing: 0) {
                ForEach(results.prefix(12)) { country in
                    Button {
                        learnVM.selectedCountry = country
                        learnVM.selectedHistoricalPolity = nil
                        learnVM.searchText = ""
                        if !isIpad { showDetailSheet = true }
                    } label: {
                        HStack(spacing: 10) {
                            FlagImageView(code: country.code, size: 28)
                            Text(country.name)
                                .fredoka(15)
                                .foregroundColor(Color.flagGameInk(scheme))
                            Spacer()
                            if let cap = country.capital {
                                Text(cap)
                                    .fredoka(12)
                                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.45))
                            }
                        }
                        .padding(.horizontal, 14)
                        .padding(.vertical, 10)
                        .contentShape(Rectangle())
                    }
                    Divider()
                        .padding(.leading, 52)
                        .background(Color.flagGameInk(scheme).opacity(0.08))
                }
            }
        }
        .frame(maxHeight: 280)
        .background(Color.flagGamePaper(scheme))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .stickerShadow()
        .padding(.horizontal, 12)
        .padding(.top, 4)
    }

    // MARK: - Bottom control bar (iPhone)

    private var bottomControlBar: some View {
        HStack(spacing: 10) {
            // Map/Grid toggle
            Button {
                withAnimation(.easeInOut(duration: 0.2)) {
                    learnVM.showFlagGrid.toggle()
                }
            } label: {
                HStack(spacing: 6) {
                    Image(systemName: learnVM.showFlagGrid ? "globe.americas.fill" : "flag.2.crossed.fill")
                        .font(.system(size: 15, weight: .semibold))
                    Text(learnVM.showFlagGrid ? "Map" : "Flags")
                        .fredoka(14, weight: .semibold)
                }
                .foregroundColor(Color.inkFixed)
                .padding(.horizontal, 14)
                .padding(.vertical, 9)
                .background(learnVM.showFlagGrid ? Color.sky : Color.mustard)
                .clipShape(Capsule())
                .stickerShadow()
            }
            .accessibilityLabel(learnVM.showFlagGrid ? "Switch to map view" : "Switch to flag grid view")

            // Historical mode toggle
            if !learnVM.showFlagGrid {
                Button {
                    let nextEra: HistoricalEra
                    if learnVM.isHistoricalMode {
                        nextEra = HISTORICAL_ERAS.last!
                    } else {
                        nextEra = HISTORICAL_ERAS.first(where: { $0.id != "today" }) ?? HISTORICAL_ERAS[0]
                    }
                    learnVM.setEra(nextEra)
                } label: {
                    HStack(spacing: 6) {
                        Image(systemName: learnVM.isHistoricalMode ? "clock.arrow.circlepath" : "clock")
                            .font(.system(size: 14, weight: .semibold))
                        Text(learnVM.isHistoricalMode ? "Modern" : "History")
                            .fredoka(14, weight: .semibold)
                    }
                    .foregroundColor(Color.inkFixed)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 9)
                    .background(learnVM.isHistoricalMode ? Color.coral : Color.lime)
                    .clipShape(Capsule())
                    .stickerShadow()
                }
                .accessibilityLabel(learnVM.isHistoricalMode ? "Switch to modern map" : "Switch to historical map")
            }

            Spacer()

            // Selected country mini badge (iPhone only)
            if let country = learnVM.selectedCountry, !isIpad {
                Button {
                    showDetailSheet = true
                } label: {
                    HStack(spacing: 6) {
                        FlagImageView(code: country.code, size: 22)
                        Text(country.name)
                            .fredoka(13, weight: .semibold)
                            .foregroundColor(Color.flagGameInk(scheme))
                            .lineLimit(1)
                        Image(systemName: "chevron.up")
                            .font(.system(size: 10, weight: .semibold))
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.5))
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(Color.flagGamePaper(scheme).opacity(0.95))
                    .clipShape(Capsule())
                    .stickerShadow()
                }
            } else if let polity = learnVM.selectedHistoricalPolity, !isIpad {
                Button {
                    showDetailSheet = true
                } label: {
                    HStack(spacing: 6) {
                        Image(systemName: "crown.fill")
                            .font(.system(size: 13))
                            .foregroundColor(Color.mustard)
                        Text(polity.name)
                            .fredoka(13, weight: .semibold)
                            .foregroundColor(Color.flagGameInk(scheme))
                            .lineLimit(1)
                        Image(systemName: "chevron.up")
                            .font(.system(size: 10, weight: .semibold))
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.5))
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(Color.flagGamePaper(scheme).opacity(0.95))
                    .clipShape(Capsule())
                    .stickerShadow()
                }
            }
        }
    }

    // MARK: - Detail sheet (iPhone bottom sheet)

    private var detailSheet: some View {
        NavigationStack {
            CountryDetailPanel(
                country: learnVM.selectedCountry,
                polity: learnVM.selectedHistoricalPolity
            )
            .environmentObject(appVM)
            .background(Color.flagGamePaper(scheme))
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        showDetailSheet = false
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .font(.system(size: 22))
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.5))
                    }
                }
            }
        }
        .environmentObject(appVM)
    }

    // MARK: - Flag grid sheet

    private var flagGridSheet: some View {
        NavigationStack {
            FlagGridView(
                countries: learnVM.filteredCountries(allCountries: allCountries),
                selectedContinent: $learnVM.flagGridContinent,
                onSelect: { country in
                    learnVM.selectedCountry = country
                    learnVM.selectedHistoricalPolity = nil
                    showFlagGridSheet = false
                    if !isIpad { showDetailSheet = true }
                }
            )
            .background(Color.flagGameBackground(scheme))
            .navigationTitle("World Flags")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        showFlagGridSheet = false
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .font(.system(size: 22))
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.5))
                    }
                }
            }
        }
        .environmentObject(appVM)
    }
}

// MARK: - EraSliderPanelView (iPad sidebar)

private struct EraSliderPanelView: View {
    @ObservedObject var learnVM: LearnViewModel
    @Environment(\.colorScheme) var scheme

    private var eraIndex: Double {
        Double(HISTORICAL_ERAS.firstIndex(where: { $0.id == learnVM.currentEra.id }) ?? 0)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text(learnVM.currentEra.label)
                    .fredoka(16, weight: .bold)
                    .foregroundColor(Color.flagGameInk(scheme))
                Text("·")
                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.3))
                Text(learnVM.currentEra.caption)
                    .fredoka(13)
                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                Spacer()
            }

            Slider(
                value: Binding(
                    get: { eraIndex },
                    set: { newVal in
                        let idx = max(0, min(HISTORICAL_ERAS.count - 1, Int(newVal.rounded())))
                        let era = HISTORICAL_ERAS[idx]
                        if era.id != learnVM.currentEra.id {
                            learnVM.setEra(era)
                        }
                    }
                ),
                in: 0...Double(HISTORICAL_ERAS.count - 1),
                step: 1
            )
            .tint(Color.mustard)

            HStack(spacing: 0) {
                ForEach(HISTORICAL_ERAS) { era in
                    Text(era.label)
                        .fredoka(9)
                        .foregroundColor(
                            era.id == learnVM.currentEra.id
                                ? Color.mustard
                                : Color.flagGameInk(scheme).opacity(0.45)
                        )
                        .frame(maxWidth: .infinity)
                        .lineLimit(1)
                        .minimumScaleFactor(0.5)
                }
            }

            // Era summary
            Text(learnVM.currentEra.summary)
                .fredoka(12)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.6))
                .lineLimit(3)
                .fixedSize(horizontal: false, vertical: true)
        }
        .padding(14)
        .background(Color.flagGameBackground(scheme).opacity(0.6))
        .clipShape(RoundedRectangle(cornerRadius: 14))
    }
}

// MARK: - Preview

struct LearnView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            LearnView(path: .constant(NavigationPath()))
                .environmentObject(AppViewModel())
        }
    }
}
