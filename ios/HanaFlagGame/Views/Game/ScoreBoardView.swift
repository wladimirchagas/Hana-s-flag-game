import SwiftUI

// MARK: - ScoreBoardView

/// Compact score summary panel shown at the bottom of the game screen.
/// Displays: overall score, correct/wrong tallies, and a per-continent
/// accuracy breakdown.
struct ScoreBoardView: View {
    let score: Int
    let correctCount: Int
    let wrongCount: Int
    let continentBreakdown: [ContinentStats]

    @Environment(\.colorScheme) var scheme

    /// Only show continents that have at least one answered question.
    private var activeStats: [ContinentStats] {
        continentBreakdown.filter { $0.total > 0 }
    }

    var body: some View {
        VStack(spacing: 10) {
            // ── Score + tallies row ────────────────────────────────────────
            scoreSummaryRow

            // ── Continent breakdown ────────────────────────────────────────
            if !activeStats.isEmpty {
                continentBreakdownRow
            }
        }
        .padding(.horizontal, 16)
    }

    // MARK: - Score summary

    private var scoreSummaryRow: some View {
        HStack(spacing: 0) {
            // Total score
            VStack(spacing: 0) {
                Text("\(score)")
                    .fredoka(28, weight: .bold)
                    .foregroundColor(score >= 0 ? .lime : .coral)
                    .contentTransition(.numericText())
                    .animation(.spring(duration: 0.4), value: score)
                Text("score")
                    .fredoka(11)
                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.5))
            }
            .frame(maxWidth: .infinity)

            Divider()
                .frame(height: 36)
                .background(Color.flagGameInk(scheme).opacity(0.15))

            // Correct count
            HStack(spacing: 4) {
                Image(systemName: "checkmark")
                    .font(.system(size: 12, weight: .bold))
                    .foregroundColor(.lime)
                Text("\(correctCount)")
                    .fredoka(20, weight: .bold)
                    .foregroundColor(.lime)
                    .contentTransition(.numericText())
                    .animation(.spring(duration: 0.3), value: correctCount)
            }
            .frame(maxWidth: .infinity)

            Divider()
                .frame(height: 36)
                .background(Color.flagGameInk(scheme).opacity(0.15))

            // Wrong count
            HStack(spacing: 4) {
                Image(systemName: "xmark")
                    .font(.system(size: 12, weight: .bold))
                    .foregroundColor(.coral)
                Text("\(wrongCount)")
                    .fredoka(20, weight: .bold)
                    .foregroundColor(.coral)
                    .contentTransition(.numericText())
                    .animation(.spring(duration: 0.3), value: wrongCount)
            }
            .frame(maxWidth: .infinity)
        }
        .padding(.vertical, 10)
        .background(Color.flagGamePaper(scheme))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .stickerShadow()
    }

    // MARK: - Continent breakdown

    private var continentBreakdownRow: some View {
        VStack(spacing: 6) {
            ForEach(activeStats, id: \.continent) { stat in
                ContinentBarRow(stat: stat, scheme: scheme)
            }
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)
        .background(Color.flagGamePaper(scheme))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .stickerShadow()
    }
}

// MARK: - ContinentBarRow

private struct ContinentBarRow: View {
    let stat: ContinentStats
    let scheme: ColorScheme

    private var color: Color {
        switch stat.continent {
        case .africa:   return .coral
        case .americas: return .sky
        case .asia:     return .mustard
        case .europe:   return .lime
        case .oceania:  return .pink
        }
    }

    var body: some View {
        HStack(spacing: 8) {
            // Continent emoji + name (narrow)
            Text(stat.continent.emoji)
                .font(.system(size: 13))

            Text(stat.continent.rawValue)
                .fredoka(12, weight: .medium)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.75))
                .frame(width: 62, alignment: .leading)
                .lineLimit(1)
                .minimumScaleFactor(0.7)

            // Progress bar
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color.flagGameBackground(scheme))
                        .frame(height: 7)

                    RoundedRectangle(cornerRadius: 4)
                        .fill(color)
                        .frame(
                            width: stat.total > 0
                                ? geo.size.width * CGFloat(stat.correctPct / 100.0)
                                : 0,
                            height: 7
                        )
                        .animation(.easeOut(duration: 0.35), value: stat.correct)
                }
            }
            .frame(height: 7)

            // Fraction
            Text("\(stat.correct)/\(stat.total)")
                .fredoka(11)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.5))
                .frame(width: 30, alignment: .trailing)
                .monospacedDigit()
        }
    }
}

// MARK: - Preview

// MARK: - Preview

struct ScoreBoardView_Previews: PreviewProvider {
    static var previews: some View {
        let breakdown: [ContinentStats] = {
            var s1 = ContinentStats(continent: .europe)
            s1.correct = 7; s1.wrong = 2
            var s2 = ContinentStats(continent: .asia)
            s2.correct = 3; s2.wrong = 4
            var s3 = ContinentStats(continent: .americas)
            s3.correct = 5; s3.wrong = 1
            return [s1, s2, s3]
        }()
        return VStack {
            Spacer()
            ScoreBoardView(
                score: 12,
                correctCount: 15,
                wrongCount: 7,
                continentBreakdown: breakdown
            )
        }
        .background(Color.flagGameBackground(.light))
        .environmentObject(AppViewModel())
    }
}
