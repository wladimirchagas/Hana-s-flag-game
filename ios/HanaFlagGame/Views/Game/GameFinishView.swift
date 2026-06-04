import SwiftUI

// MARK: - GameFinishView

struct GameFinishView: View {
    let gameVM: GameViewModel
    let onPlayAgain: () -> Void
    let onHome: () -> Void

    @EnvironmentObject var appVM: AppViewModel
    @EnvironmentObject var leaderboardVM: LeaderboardViewModel
    @Environment(\.colorScheme) var scheme

    @State private var playerName: String = ""
    @State private var hasSaved: Bool = false
    @State private var showDailyUnlock: Bool = false
    @State private var animatedScore: Int = 0
    @State private var isSaving: Bool = false

    private var accuracy: Double {
        guard gameVM.totalAnswered > 0 else { return 0 }
        return Double(gameVM.correctCount) / Double(gameVM.totalAnswered) * 100.0
    }

    private var elapsedFormatted: String? {
        guard let ms = gameVM.elapsedMs else { return nil }
        let totalSec = ms / 1000
        let min = totalSec / 60
        let sec = totalSec % 60
        if min > 0 { return "\(min)m \(sec)s" }
        return "\(sec)s"
    }

    var body: some View {
        ZStack {
            Color.flagGameBackground(scheme)
                .ignoresSafeArea()

            // Confetti layer (behind content)
            FinishConfettiView()

            ScrollView(showsIndicators: false) {
                VStack(spacing: 24) {
                    // Header
                    VStack(spacing: 6) {
                        Text("🎉 🌟 🎊")
                            .font(.system(size: 32))
                            .padding(.bottom, 4)
                        Text("🎉")
                            .font(.system(size: 64))
                        Text("You Finished!")
                            .fredoka(36, weight: .bold)
                            .foregroundColor(.coral)
                    }
                    .padding(.top, 48)

                    // Animated score
                    VStack(spacing: 4) {
                        Text("\(animatedScore)")
                            .fredoka(72, weight: .bold)
                            .foregroundColor(animatedScore >= 0 ? .lime : .coral)
                            .contentTransition(.numericText())
                            .animation(.spring(duration: 1.2), value: animatedScore)
                        Text("points")
                            .fredoka(18, weight: .medium)
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.6))
                    }
                    .padding(.vertical, 8)
                    .frame(maxWidth: .infinity)
                    .cardStyle(scheme: scheme)
                    .padding(.horizontal, 24)

                    // Stats row
                    statsRow
                        .padding(.horizontal, 24)

                    // Continent breakdown
                    if !gameVM.continentBreakdown.filter({ $0.total > 0 }).isEmpty {
                        continentBreakdownSection
                            .padding(.horizontal, 24)
                    }

                    // Flag results grid
                    flagResultsSection

                    // Elapsed time
                    if let elapsed = elapsedFormatted {
                        HStack {
                            Image(systemName: "clock")
                            Text("Finished in \(elapsed)")
                        }
                        .fredoka(15)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                    }

                    // Save to leaderboard
                    leaderboardSection
                        .padding(.horizontal, 24)

                    // Daily unlock (Hana mode only)
                    if case .hana = gameVM.config.mode {
                        Button {
                            showDailyUnlock = true
                        } label: {
                            Label("Claim today's daily flag!", systemImage: "star.fill")
                                .pillButton(color: .mustard, scheme: scheme)
                        }
                    }

                    // Action buttons
                    VStack(spacing: 14) {
                        Button("Play Again", action: onPlayAgain)
                            .pillButton(color: .lime, scheme: scheme)

                        Button("Home", action: onHome)
                            .fredoka(17, weight: .semibold)
                            .foregroundColor(Color.flagGameInk(scheme))
                            .padding(.vertical, 12)
                            .padding(.horizontal, 28)
                            .background(Color.flagGamePaper(scheme))
                            .clipShape(Capsule())
                            .stickerShadow()
                    }
                    .padding(.bottom, 48)
                }
            }
        }
        .onAppear {
            startScoreAnimation()
        }
        .sheet(isPresented: $showDailyUnlock) {
            let code = appVM.todaysDailyCode
            let country = STATIC_COUNTRIES.first { $0.code == code }
            FlagUnlockView(
                countryCode: code,
                countryName: country?.name ?? code,
                onAdd: {
                    appVM.addCountry(code)
                    appVM.markLearned(code)
                    AudioService.shared.playUnlock()
                    showDailyUnlock = false
                },
                onDismiss: { showDailyUnlock = false }
            )
        }
    }

    // MARK: - Stats row

    private var statsRow: some View {
        HStack(spacing: 0) {
            statCell(
                value: "\(Int(accuracy.rounded()))%",
                label: "Accuracy",
                color: accuracy >= 70 ? .lime : .coral
            )
            Divider().frame(height: 44)
            statCell(
                value: "\(gameVM.correctCount)",
                label: "Correct",
                color: .lime
            )
            Divider().frame(height: 44)
            statCell(
                value: "\(gameVM.wrongCount)",
                label: "Wrong",
                color: .coral
            )
        }
        .padding(.vertical, 12)
        .cardStyle(scheme: scheme)
    }

    private func statCell(value: String, label: String, color: Color) -> some View {
        VStack(spacing: 2) {
            Text(value)
                .fredoka(24, weight: .bold)
                .foregroundColor(color)
            Text(label)
                .fredoka(13)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
        }
        .frame(maxWidth: .infinity)
    }

    // MARK: - Continent breakdown

    private var continentBreakdownSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("By Continent")
                .fredoka(17, weight: .semibold)
                .foregroundColor(Color.flagGameInk(scheme))
                .padding(.horizontal, 16)
                .padding(.top, 12)

            ForEach(gameVM.continentBreakdown.filter { $0.total > 0 }, id: \.continent) { stat in
                ContinentStatRow(stat: stat, scheme: scheme)
                    .padding(.horizontal, 16)
            }
            .padding(.bottom, 12)
        }
        .cardStyle(scheme: scheme)
    }

    // MARK: - Flag results grid

    private var flagResultsSection: some View {
        let results = gameVM.countryResults  // [String: Bool]
        guard !results.isEmpty else { return AnyView(EmptyView()) }
        let sorted = results.keys.sorted()
        let cols = [GridItem(.adaptive(minimum: 52, maximum: 68), spacing: 8)]
        return AnyView(
            VStack(alignment: .leading, spacing: 10) {
                Text("Flags Answered")
                    .fredoka(15, weight: .semibold)
                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.7))
                    .padding(.horizontal, 4)
                LazyVGrid(columns: cols, spacing: 10) {
                    ForEach(sorted, id: \.self) { code in
                        let correct = results[code] ?? false
                        ZStack(alignment: .topTrailing) {
                            FlagImageView(code: code, size: 52, cornerRadius: 8)
                            Image(systemName: correct ? "checkmark.circle.fill" : "xmark.circle.fill")
                                .font(.system(size: 17, weight: .bold))
                                .foregroundColor(correct ? .lime : .coral)
                                .background(Circle().fill(Color.white).frame(width: 15, height: 15))
                                .offset(x: 5, y: -5)
                        }
                    }
                }
            }
            .padding(16)
            .cardStyle(scheme: scheme)
            .padding(.horizontal, 20)
        )
    }

    // MARK: - Leaderboard section

    private var leaderboardSection: some View {
        VStack(spacing: 12) {
            if !hasSaved {
                VStack(spacing: 10) {
                    Text("Save your score")
                        .fredoka(16, weight: .semibold)
                        .foregroundColor(Color.flagGameInk(scheme))

                    TextField("Your name", text: $playerName)
                        .fredoka(16)
                        .padding(.horizontal, 14)
                        .padding(.vertical, 10)
                        .background(Color.flagGameBackground(scheme))
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.flagGameInk(scheme).opacity(0.15), lineWidth: 1)
                        )

                    Button {
                        guard !playerName.trimmingCharacters(in: .whitespaces).isEmpty else { return }
                        isSaving = true
                        Task {
                            await leaderboardVM.save(name: playerName.trimmingCharacters(in: .whitespaces), gameVM: gameVM)
                            isSaving = false
                            hasSaved = true
                        }
                    } label: {
                        if isSaving {
                            ProgressView()
                                .tint(Color.inkFixed)
                                .padding(.vertical, 14)
                                .padding(.horizontal, 28)
                                .background(Color.sky)
                                .clipShape(Capsule())
                        } else {
                            Text("Save to Leaderboard")
                                .pillButton(color: .sky, scheme: scheme)
                        }
                    }
                    .disabled(playerName.trimmingCharacters(in: .whitespaces).isEmpty || isSaving)
                    .opacity(playerName.trimmingCharacters(in: .whitespaces).isEmpty ? 0.45 : 1)
                }
                .padding(16)
                .cardStyle(scheme: scheme)
            } else {
                HStack(spacing: 8) {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundColor(.lime)
                    Text("Score saved! 🏆")
                        .fredoka(16, weight: .semibold)
                        .foregroundColor(Color.flagGameInk(scheme))
                }
                .padding(16)
                .cardStyle(scheme: scheme)
            }
        }
    }

    // MARK: - Score animation

    private func startScoreAnimation() {
        let target = gameVM.score
        let duration: Double = 1.2
        let steps = 30
        let interval = duration / Double(steps)
        var current = 0
        for i in 1...steps {
            DispatchQueue.main.asyncAfter(deadline: .now() + Double(i) * interval) {
                let progress = Double(i) / Double(steps)
                let eased = 1 - pow(1 - progress, 3)
                current = Int(Double(target) * eased)
                animatedScore = current
                if i == steps { animatedScore = target }
            }
        }
    }
}

// MARK: - ContinentStatRow

private struct ContinentStatRow: View {
    let stat: ContinentStats
    let scheme: ColorScheme

    private var continentColor: Color {
        switch stat.continent {
        case .africa:   return .coral
        case .americas: return .sky
        case .asia:     return .mustard
        case .europe:   return .lime
        case .oceania:  return .pink
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(stat.continent.emoji + " " + stat.continent.rawValue)
                    .fredoka(14, weight: .medium)
                    .foregroundColor(Color.flagGameInk(scheme))
                Spacer()
                Text("\(stat.correct)/\(stat.total)")
                    .fredoka(13)
                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
            }

            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color.flagGamePaper(scheme).opacity(0.5))
                        .frame(height: 8)

                    RoundedRectangle(cornerRadius: 4)
                        .fill(continentColor)
                        .frame(
                            width: geo.size.width * CGFloat(stat.correctPct / 100.0),
                            height: 8
                        )
                }
            }
            .frame(height: 8)
        }
    }
}

// MARK: - Preview

#Preview {
    GameFinishView(
        gameVM: GameViewModel(config: GameConfig(mode: .quickQuiz(flagCount: 10))),
        onPlayAgain: {},
        onHome: {}
    )
    .environmentObject(AppViewModel())
    .environmentObject(LeaderboardViewModel())
}
