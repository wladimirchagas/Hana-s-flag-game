import SwiftUI

// MARK: - FlagUnlockView

struct FlagUnlockView: View {
    let countryCode: String
    let countryName: String
    let onAdd: () -> Void
    let onDismiss: () -> Void

    @Environment(\.colorScheme) var scheme

    @State private var scaleFlag: CGFloat = 0.6
    @State private var opacityFlag: CGFloat = 0
    @State private var showSparkles: Bool = false

    var body: some View {
        ZStack {
            Color.flagGameBackground(scheme)
                .ignoresSafeArea()

            VStack(spacing: 28) {
                Spacer()

                // Header
                VStack(spacing: 6) {
                    Text("🌟")
                        .font(.system(size: 52))
                        .scaleEffect(showSparkles ? 1.15 : 1.0)
                        .animation(
                            .spring(response: 0.4, dampingFraction: 0.5)
                            .repeatCount(2, autoreverses: true),
                            value: showSparkles
                        )

                    Text("Daily Flag Unlocked!")
                        .fredoka(30, weight: .bold)
                        .foregroundColor(.mustard)
                        .multilineTextAlignment(.center)
                }

                // Flag card
                VStack(spacing: 14) {
                    FlagImageView(code: countryCode, size: 110, cornerRadius: 16)
                        .scaleEffect(scaleFlag)
                        .opacity(opacityFlag)
                        .stickerShadow()

                    Text(countryName)
                        .fredoka(24, weight: .semibold)
                        .foregroundColor(Color.flagGameInk(scheme))
                        .multilineTextAlignment(.center)
                }
                .padding(.vertical, 24)
                .padding(.horizontal, 32)
                .cardStyle(scheme: scheme)
                .padding(.horizontal, 28)

                // Description
                Text("Add \(countryName) to Hana's Game and start learning its flag today!")
                    .fredoka(15)
                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.65))
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 32)

                // Action buttons
                VStack(spacing: 14) {
                    Button(action: onAdd) {
                        Label("Add to Hana's Game", systemImage: "plus.circle.fill")
                            .frame(maxWidth: .infinity)
                    }
                    .pillButton(color: .mustard, scheme: scheme)
                    .padding(.horizontal, 28)

                    Button(action: onDismiss) {
                        Text("Not now")
                            .fredoka(16, weight: .medium)
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                            .padding(.vertical, 12)
                    }
                }

                Spacer()
            }
        }
        .onAppear {
            withAnimation(.spring(response: 0.5, dampingFraction: 0.65).delay(0.15)) {
                scaleFlag = 1.0
                opacityFlag = 1.0
            }
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
                showSparkles = true
            }
        }
    }
}

// MARK: - Preview

#Preview {
    FlagUnlockView(
        countryCode: "JP",
        countryName: "Japan",
        onAdd: { print("Added!") },
        onDismiss: { print("Dismissed") }
    )
}
