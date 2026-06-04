import SwiftUI

// MARK: - FlagCardView

/// Shows the current flag to guess in a white card, with a zoom button that
/// opens a full-screen enlarged view.
struct FlagCardView: View {
    let country: Country

    @Environment(\.colorScheme) var scheme
    @State private var showFullScreen = false

    var body: some View {
        ZStack(alignment: .topTrailing) {
            // Card background + flag
            VStack(spacing: 0) {
                FlagImageView(code: country.code, size: 220, cornerRadius: 12)
                    .padding(20)
            }
            .frame(maxWidth: .infinity)
            .cardStyle(scheme: scheme)

            // Zoom button
            Button {
                showFullScreen = true
            } label: {
                Image(systemName: "arrow.up.left.and.arrow.down.right")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(Color.flagGameInk(scheme))
                    .frame(width: 34, height: 34)
                    .background(Color.flagGameBackground(scheme).opacity(0.90))
                    .clipShape(Circle())
                    .stickerShadow()
            }
            .padding(12)
            .accessibilityLabel("Zoom flag")
        }
        .fullScreenCover(isPresented: $showFullScreen) {
            FlagZoomView(country: country, onDismiss: { showFullScreen = false })
        }
    }
}

// MARK: - FlagZoomView

private struct FlagZoomView: View {
    let country: Country
    let onDismiss: () -> Void

    @Environment(\.colorScheme) var scheme

    var body: some View {
        ZStack {
            Color.black.opacity(0.92)
                .ignoresSafeArea()

            VStack(spacing: 28) {
                Spacer()

                // Enlarged flag
                FlagImageView(code: country.code, size: 200, cornerRadius: 16)
                    .scaleEffect(1.6)
                    .stickerShadow()

                Spacer()

                // Country name
                Text(country.name)
                    .fredoka(24, weight: .bold)
                    .foregroundColor(.white)
            }
            .padding(.horizontal, 32)

            // Dismiss button
            VStack {
                HStack {
                    Spacer()
                    Button(action: onDismiss) {
                        Image(systemName: "xmark.circle.fill")
                            .font(.system(size: 32))
                            .foregroundColor(.white.opacity(0.85))
                    }
                    .accessibilityLabel("Close")
                    .padding(20)
                }
                Spacer()
            }
        }
        .onTapGesture { onDismiss() }
    }
}

// MARK: - Preview

#Preview {
    FlagCardView(country: Country(code: "JP", name: "Japan", continent: .asia))
        .padding(20)
        .background(Color.flagGameBackground(.light))
        .environmentObject(AppViewModel())
}
