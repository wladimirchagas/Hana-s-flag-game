import SwiftUI

// MARK: - FeedbackView

/// Displayed in the `.revealed` phase. Shows a large check/X, result text,
/// the correct country's flag, and a "Next →" button.
struct FeedbackView: View {
    let wasCorrect: Bool
    let country: Country
    let onNext: () -> Void

    @Environment(\.colorScheme) var scheme
    @State private var symbolScale: CGFloat = 0.4
    @State private var symbolOpacity: Double = 0

    // MARK: - Body

    var body: some View {
        VStack(spacing: 20) {
            // Result symbol
            resultSymbol
                .scaleEffect(symbolScale)
                .opacity(symbolOpacity)
                .onAppear {
                    withAnimation(.spring(response: 0.4, dampingFraction: 0.6)) {
                        symbolScale = 1.0
                        symbolOpacity = 1.0
                    }
                }

            // Result text
            resultText

            // Flag card
            VStack(spacing: 8) {
                FlagImageView(code: country.code, size: 140, cornerRadius: 12)
                    .stickerShadow()

                Text(country.name)
                    .fredoka(20, weight: .bold)
                    .foregroundColor(Color.flagGameInk(scheme))
                    .multilineTextAlignment(.center)

                if let sub = country.subregion {
                    Text(sub)
                        .fredoka(13)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                }
            }
            .padding(20)
            .frame(maxWidth: .infinity)
            .cardStyle(scheme: scheme)

            // Next button
            Button {
                onNext()
            } label: {
                HStack(spacing: 6) {
                    Text("Next")
                    Image(systemName: "arrow.right")
                }
            }
            .pillButton(color: wasCorrect ? .lime : .coral, scheme: scheme)
            .padding(.top, 4)
        }
    }

    // MARK: - Sub-views

    private var resultSymbol: some View {
        ZStack {
            Circle()
                .fill(wasCorrect ? Color.lime.opacity(0.18) : Color.coral.opacity(0.18))
                .frame(width: 88, height: 88)

            Image(systemName: wasCorrect ? "checkmark" : "xmark")
                .font(.system(size: 42, weight: .bold))
                .foregroundColor(wasCorrect ? .lime : .coral)
        }
    }

    private var resultText: some View {
        VStack(spacing: 4) {
            if wasCorrect {
                Text("Correct!")
                    .fredoka(26, weight: .bold)
                    .foregroundColor(.lime)
            } else {
                VStack(spacing: 2) {
                    Text("Wrong!")
                        .fredoka(26, weight: .bold)
                        .foregroundColor(.coral)
                    Text("It was \(country.name)")
                        .fredoka(16)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.75))
                }
            }
        }
        .multilineTextAlignment(.center)
    }
}

// MARK: - Preview

#Preview {
    ScrollView {
        VStack(spacing: 32) {
            FeedbackView(
                wasCorrect: true,
                country: Country(code: "JP", name: "Japan", continent: .asia),
                onNext: {}
            )
            FeedbackView(
                wasCorrect: false,
                country: Country(code: "FR", name: "France", continent: .europe),
                onNext: {}
            )
        }
        .padding(20)
    }
    .background(Color.flagGameBackground(.light))
    .environmentObject(AppViewModel())
}
