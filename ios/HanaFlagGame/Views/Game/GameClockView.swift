import SwiftUI

// MARK: - GameClockView

/// Compact timer + progress row that updates every second using TimelineView.
struct GameClockView: View {
    let gameStartedAt: Date?
    let totalAnswered: Int
    let totalFlags: Int
    let meanAnswerMs: Double?

    @Environment(\.colorScheme) var scheme

    var body: some View {
        TimelineView(.animation(minimumInterval: 1, paused: false)) { context in
            content(at: context.date)
        }
    }

    // MARK: - Content

    private func content(at now: Date) -> some View {
        HStack(spacing: 0) {
            // Clock icon + elapsed time
            HStack(spacing: 5) {
                Image(systemName: "clock")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                Text(elapsedString(at: now))
                    .fredoka(15, weight: .semibold)
                    .foregroundColor(Color.flagGameInk(scheme))
                    .monospacedDigit()
            }
            .frame(maxWidth: .infinity, alignment: .leading)

            // Progress (answered / total)
            HStack(spacing: 4) {
                Text("\(totalAnswered)")
                    .fredoka(15, weight: .bold)
                    .foregroundColor(.mustard)
                Text("/")
                    .fredoka(15)
                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.45))
                Text("\(totalFlags)")
                    .fredoka(15)
                    .foregroundColor(Color.flagGameInk(scheme))
            }
            .frame(maxWidth: .infinity, alignment: .center)

            // Avg answer time
            if let ms = meanAnswerMs {
                HStack(spacing: 4) {
                    Image(systemName: "bolt.fill")
                        .font(.system(size: 11))
                        .foregroundColor(.sky)
                    Text(avgString(ms: ms))
                        .fredoka(13)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.7))
                        .monospacedDigit()
                }
                .frame(maxWidth: .infinity, alignment: .trailing)
            } else {
                Spacer()
                    .frame(maxWidth: .infinity)
            }
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 8)
        .background(Color.flagGamePaper(scheme))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .stickerShadow()
    }

    // MARK: - Helpers

    private func elapsedString(at now: Date) -> String {
        guard let start = gameStartedAt else { return "0:00" }
        let total = Int(now.timeIntervalSince(start))
        let minutes = total / 60
        let seconds = total % 60
        return String(format: "%d:%02d", minutes, seconds)
    }

    private func avgString(ms: Double) -> String {
        let secs = ms / 1000.0
        if secs < 10 {
            return String(format: "%.1fs avg", secs)
        }
        return String(format: "%.0fs avg", secs)
    }
}

// MARK: - Preview

#Preview {
    VStack(spacing: 12) {
        GameClockView(
            gameStartedAt: Date().addingTimeInterval(-154),
            totalAnswered: 12,
            totalFlags: 30,
            meanAnswerMs: 4_230
        )
        GameClockView(
            gameStartedAt: nil,
            totalAnswered: 0,
            totalFlags: 20,
            meanAnswerMs: nil
        )
    }
    .padding()
    .background(Color.flagGameBackground(.light))
    .environmentObject(AppViewModel())
}
