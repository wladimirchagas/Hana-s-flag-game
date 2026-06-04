import SwiftUI

// MARK: - LandingView

struct LandingView: View {
    @Binding var path: NavigationPath

    @EnvironmentObject var appVM: AppViewModel
    @EnvironmentObject var leaderboardVM: LeaderboardViewModel
    @Environment(\.colorScheme) var scheme

    @State private var showCountryPicker = false
    @State private var showQuizSetup = false
    @State private var showFlagMaster = false

    // MARK: - Computed

    private var selectedCount: Int { appVM.selectedCountryCodes.count }

    private var hanaSubtitle: String {
        selectedCount == 0
            ? "No countries selected yet"
            : "\(selectedCount) countr\(selectedCount == 1 ? "y" : "ies") selected"
    }

    // MARK: - Body

    var body: some View {
        ZStack {
            // Background colour
            Color.flagGameBackground(scheme)
                .ignoresSafeArea()

            // Confetti decoration (non-interactive)
            FlagConfettiView()
                .ignoresSafeArea()

            ScrollView(showsIndicators: false) {
                VStack(spacing: 24) {

                    // ── Title ──────────────────────────────────────────────
                    titleSection
                        .padding(.top, 52)

                    // ── Hana's Game card ───────────────────────────────────
                    GameModeCard(
                        title: "Hana's Game",
                        subtitle: hanaSubtitle,
                        iconName: "heart.fill",
                        accentColor: .coral,
                        buttonLabel: selectedCount == 0 ? "Pick Countries" : "Play",
                        action: {
                            if selectedCount == 0 {
                                showCountryPicker = true
                            } else {
                                let config = GameConfig(
                                    mode: .hana,
                                    selectedCodes: appVM.selectedCountryCodes
                                )
                                path.append(GameRoute(config: config))
                            }
                        },
                        isLarge: true
                    )
                    .padding(.horizontal, 20)

                    // ── Three mode cards ───────────────────────────────────
                    modeGrid
                        .padding(.horizontal, 20)

                    // ── Daily flag section ─────────────────────────────────
                    dailySection
                        .padding(.horizontal, 20)

                    // ── Leaderboard button ─────────────────────────────────
                    Button {
                        leaderboardVM.openLeaderboard()
                    } label: {
                        HStack(spacing: 8) {
                            Image(systemName: "trophy.fill")
                                .foregroundColor(.mustard)
                            Text("Leaderboard")
                                .fredoka(17, weight: .semibold)
                                .foregroundColor(Color.flagGameInk(scheme))
                        }
                        .padding(.vertical, 14)
                        .padding(.horizontal, 28)
                        .background(Color.flagGamePaper(scheme))
                        .clipShape(Capsule())
                        .stickerShadow()
                    }
                    .padding(.bottom, 40)
                }
            }
        }
        .navigationBarHidden(true)
        // ── Sheets ────────────────────────────────────────────────────────
        .sheet(isPresented: $showCountryPicker) {
            CountryPickerView { _ in
                showCountryPicker = false
                if appVM.selectedCountryCodes.count > 0 {
                    let config = GameConfig(
                        mode: .hana,
                        selectedCodes: appVM.selectedCountryCodes
                    )
                    path.append(GameRoute(config: config))
                }
            }
            .environmentObject(appVM)
        }
        .sheet(isPresented: $showQuizSetup) {
            QuickQuizSetupView { flagCount in
                showQuizSetup = false
                let config = GameConfig(mode: .quickQuiz(flagCount: flagCount))
                path.append(GameRoute(config: config))
            }
            .environmentObject(appVM)
        }
        .sheet(isPresented: $showFlagMaster) {
            AllFlagsSetupView { mode in
                showFlagMaster = false
                path.append(GameRoute(config: GameConfig(mode: mode)))
            }
            .environmentObject(appVM)
        }
        .sheet(isPresented: $leaderboardVM.showLeaderboard) {
            LeaderboardView()
                .environmentObject(leaderboardVM)
                .environmentObject(appVM)
        }
    }

    // MARK: - Title section

    private var titleSection: some View {
        HStack(alignment: .center, spacing: 0) {
            // Letter-by-letter coloured title
            VStack(alignment: .leading, spacing: 0) {
                coloredTitle("Guess the")
                coloredTitle("Flag!")
            }

            Spacer()

            // Mascot + decorative stars
            ZStack {
                Text("✦")
                    .font(.system(size: 14))
                    .foregroundColor(.mustard)
                    .offset(x: -18, y: -24)

                Text("✦")
                    .font(.system(size: 9))
                    .foregroundColor(.coral)
                    .offset(x: 20, y: -32)

                Text("✦")
                    .font(.system(size: 11))
                    .foregroundColor(.sky)
                    .offset(x: 30, y: 10)

                Text("🏳️")
                    .font(.system(size: 52))
            }
            .frame(width: 80, height: 80)
        }
        .padding(.horizontal, 24)
    }

    /// Renders a string with each letter in alternating brand colours.
    private func coloredTitle(_ text: String) -> some View {
        let colors: [Color] = [.coral, .mustard, .sky, .lime, .coral]
        return HStack(spacing: 0) {
            ForEach(Array(text.enumerated()), id: \.offset) { i, char in
                Text(String(char))
                    .fredoka(38, weight: .bold)
                    .foregroundColor(char == " " ? .clear : colors[i % colors.count])
            }
        }
    }

    // MARK: - Mode grid

    private var modeGrid: some View {
        VStack(spacing: 14) {
            HStack(spacing: 14) {
                // Learn
                GameModeCard(
                    title: "Learn",
                    subtitle: "Explore the world map",
                    iconName: "book.fill",
                    accentColor: .sky,
                    buttonLabel: "Explore",
                    action: { path.append(LearnRoute()) }
                )

                // Quick Quiz
                GameModeCard(
                    title: "Quick Quiz",
                    subtitle: "Random selection",
                    iconName: "bolt.fill",
                    accentColor: .mustard,
                    buttonLabel: "Start",
                    action: { showQuizSetup = true }
                )
            }

            // Flag Master (full width)
            GameModeCard(
                title: "Flag Master",
                subtitle: "All 195 flags or filter by continent",
                iconName: "trophy.fill",
                accentColor: .coral,
                buttonLabel: "Choose Mode",
                action: { showFlagMaster = true }
            )
        }
    }

    // MARK: - Daily flag section

    @ViewBuilder
    private var dailySection: some View {
        let dailyCode = appVM.todaysDailyCode
        let alreadyLearned = appVM.isLearned(dailyCode)

        if !alreadyLearned,
           let country = STATIC_COUNTRIES.first(where: { $0.code == dailyCode }) {
            HStack(spacing: 14) {
                FlagImageView(code: dailyCode, size: 44, cornerRadius: 8)

                VStack(alignment: .leading, spacing: 2) {
                    Text("Daily Flag")
                        .fredoka(12, weight: .semibold)
                        .foregroundColor(.mustard)
                    Text(country.name)
                        .fredoka(16, weight: .bold)
                        .foregroundColor(Color.flagGameInk(scheme))
                }

                Spacer()

                Button {
                    appVM.addCountry(dailyCode)
                    appVM.markLearned(dailyCode)
                    AudioService.shared.playUnlock()
                } label: {
                    Text("Add")
                        .fredoka(14, weight: .semibold)
                        .foregroundColor(Color.inkFixed)
                        .padding(.vertical, 8)
                        .padding(.horizontal, 16)
                        .background(Color.mustard)
                        .clipShape(Capsule())
                }
            }
            .padding(14)
            .cardStyle(scheme: scheme)
        }
    }
}

// MARK: - Preview

#Preview {
    NavigationStack {
        LandingView(path: .constant(NavigationPath()))
            .environmentObject(AppViewModel())
            .environmentObject(LeaderboardViewModel())
    }
}
