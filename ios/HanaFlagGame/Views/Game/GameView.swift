import SwiftUI

// MARK: - GameView

struct GameView: View {
    let config: GameConfig
    @Binding var path: NavigationPath

    @StateObject private var gameVM: GameViewModel
    @EnvironmentObject var appVM: AppViewModel
    @EnvironmentObject var leaderboardVM: LeaderboardViewModel
    @Environment(\.colorScheme) var scheme

    @State private var showEndEarlyAlert = false
    @State private var showFinish = false
    @State private var scoreBoardExpanded = false
    @State private var showBurst = false
    @State private var burstWasCorrect = false
    @State private var progressShapes: [CountryShape] = []

    init(config: GameConfig, path: Binding<NavigationPath>) {
        self.config = config
        self._path = path
        _gameVM = StateObject(wrappedValue: GameViewModel(config: config))
    }

    var body: some View {
        ZStack(alignment: .bottom) {
            Color.flagGameBackground(scheme)
                .ignoresSafeArea()

            VStack(spacing: 0) {
                // Custom topbar
                gameTopbar

                // Clock row
                if gameVM.gameStartedAt != nil {
                    GameClockView(
                        gameStartedAt: gameVM.gameStartedAt,
                        totalAnswered: gameVM.totalAnswered,
                        totalFlags: gameVM.totalFlags,
                        meanAnswerMs: gameVM.meanAnswerMs
                    )
                    .padding(.horizontal, 16)
                    .padding(.top, 6)
                }

                // Main content
                mainContent
                    .frame(maxWidth: .infinity, maxHeight: .infinity)

                // Score board at bottom
                VStack(spacing: 6) {
                    if !progressShapes.isEmpty && (!gameVM.answeredCorrect.isEmpty || !gameVM.answeredWrong.isEmpty) {
                        GameProgressMapView(
                            answeredCorrect: gameVM.answeredCorrect,
                            answeredWrong: gameVM.answeredWrong,
                            shapes: progressShapes,
                            allCountries: CountryService.shared.countries
                        )
                        .padding(.horizontal, 16)
                    }
                    ScoreBoardView(
                        score: gameVM.score,
                        correctCount: gameVM.correctCount,
                        wrongCount: gameVM.wrongCount,
                        continentBreakdown: gameVM.continentBreakdown
                    )
                }
                .padding(.bottom, 8)
            }
        }
        .overlay {
            if showBurst {
                AnswerBurstView(wasCorrect: burstWasCorrect)
                    .transition(.opacity)
            }
        }
        .navigationBarHidden(true)
        .onAppear {
            gameVM.load()
            if progressShapes.isEmpty {
                Task.detached(priority: .background) {
                    let loaded = TopoJSONDecoder.loadCountries()
                    await MainActor.run { self.progressShapes = loaded }
                }
            }
        }
        .onChange(of: gameVM.phase) { phase in
            if case .revealed(let wasCorrect) = phase {
                burstWasCorrect = wasCorrect
                showBurst = true
                Task {
                    try? await Task.sleep(nanoseconds: 900_000_000)
                    showBurst = false
                }
            }
            if case .finished = phase {
                showFinish = true
            }
        }
        .fullScreenCover(isPresented: $showFinish) {
            GameFinishView(
                gameVM: gameVM,
                onPlayAgain: {
                    showFinish = false
                    gameVM.load()
                },
                onHome: {
                    showFinish = false
                    path = NavigationPath()
                }
            )
            .environmentObject(appVM)
            .environmentObject(leaderboardVM)
        }
        .alert("End Game?", isPresented: $showEndEarlyAlert) {
            Button("End Game", role: .destructive) {
                gameVM.endEarly()
            }
            Button("Keep Playing", role: .cancel) {}
        } message: {
            Text("Your current progress will be saved.")
        }
    }

    // MARK: - Topbar

    private var gameTopbar: some View {
        HStack(spacing: 4) {
            // Back / end early
            Button {
                showEndEarlyAlert = true
            } label: {
                Image(systemName: "chevron.left.circle.fill")
                    .font(.system(size: 28, weight: .semibold))
                    .foregroundColor(Color.flagGameInk(scheme))
            }
            .accessibilityLabel("Back")

            Spacer()

            // Mode label in center
            VStack(spacing: 1) {
                Text(config.mode.displayLabel)
                    .fredoka(16, weight: .bold)
                    .foregroundColor(Color.flagGameInk(scheme))
                    .lineLimit(1)
                    .minimumScaleFactor(0.7)
                Text(config.mode.tagline)
                    .fredoka(11)
                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
            }

            Spacer()

            // Score badge
            HStack(spacing: 2) {
                Image(systemName: "star.fill")
                    .font(.system(size: 13))
                    .foregroundColor(.mustard)
                Text("\(gameVM.score)")
                    .fredoka(18, weight: .bold)
                    .foregroundColor(Color.flagGameInk(scheme))
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 4)
            .background(Color.flagGamePaper(scheme))
            .clipShape(Capsule())
            .stickerShadow()

            // Mute toggle
            MuteToggleView()

            // Theme toggle
            ThemeToggleView()
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
        .background(Color.flagGameBackground(scheme).opacity(0.97))
    }

    // MARK: - Main content

    @ViewBuilder
    private var mainContent: some View {
        switch gameVM.phase {
        case .loading:
            loadingView

        case .error(let msg):
            errorView(message: msg)

        case .guessing:
            guessingView

        case .revealed(let wasCorrect):
            revealedView(wasCorrect: wasCorrect)

        case .finished:
            // Shown via fullScreenCover; show a brief loading state here
            Color.flagGameBackground(scheme)
        }
    }

    // MARK: - Loading

    private var loadingView: some View {
        VStack(spacing: 16) {
            ProgressView()
                .scaleEffect(1.4)
                .tint(Color.mustard)
            Text("Loading flags…")
                .fredoka(16)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.6))
        }
    }

    // MARK: - Error

    private func errorView(message: String) -> some View {
        VStack(spacing: 20) {
            Text("😵")
                .font(.system(size: 60))
            Text(message)
                .fredoka(17)
                .foregroundColor(Color.flagGameInk(scheme))
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)
            Button("Try Again") {
                gameVM.load()
            }
            .pillButton(color: .mustard, scheme: scheme)
        }
    }

    // MARK: - Auto-confirm helper

    private var autoConfirms: Bool {
        if case .hana = config.mode { return false }
        return true
    }

    // MARK: - Guessing phase

    private var guessingView: some View {
        GeometryReader { geo in
            ScrollView(showsIndicators: false) {
                VStack(spacing: 16) {
                    Spacer(minLength: 0)
                    if let country = gameVM.current {
                        FlagCardView(country: country)
                            .padding(.horizontal, 20)

                        AnswerOptionsView(
                            alternatives: gameVM.questionAlternatives,
                            selected: $gameVM.selected,
                            phase: gameVM.phase,
                            currentCountry: country
                        )
                        .padding(.horizontal, 20)

                        if !autoConfirms {
                            // nothing — auto-confirm fires via onChange below
                        } else {
                            Button("Confirm") {
                                gameVM.confirm()
                            }
                            .pillButton(color: .lime, scheme: scheme)
                            .opacity(gameVM.selected == nil ? 0.45 : 1.0)
                            .disabled(gameVM.selected == nil)
                            .padding(.top, 4)
                        }
                    }
                    Spacer(minLength: 24)
                }
                .frame(minHeight: geo.size.height)
            }
            .onChange(of: gameVM.selected) { newSel in
                guard newSel != nil, autoConfirms else { return }
                Task {
                    try? await Task.sleep(nanoseconds: 320_000_000)
                    if case .guessing = gameVM.phase, gameVM.selected != nil {
                        gameVM.confirm()
                    }
                }
            }
        }
    }

    // MARK: - Revealed phase

    private func revealedView(wasCorrect: Bool) -> some View {
        GeometryReader { geo in
            ScrollView(showsIndicators: false) {
                VStack(spacing: 16) {
                    Spacer(minLength: 0)
                    if let country = gameVM.current {
                        FeedbackView(
                            wasCorrect: wasCorrect,
                            country: country,
                            onNext: { gameVM.next() }
                        )
                        .padding(.horizontal, 20)
                    }
                    Spacer(minLength: 24)
                }
                .frame(minHeight: geo.size.height)
            }
        }
    }
}

// MARK: - Preview

#Preview {
    NavigationStack {
        GameView(
            config: GameConfig(mode: .quickQuiz(flagCount: 10)),
            path: .constant(NavigationPath())
        )
        .environmentObject(AppViewModel())
        .environmentObject(LeaderboardViewModel())
    }
}
