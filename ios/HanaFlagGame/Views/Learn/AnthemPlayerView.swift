import SwiftUI

// MARK: - AnthemPlayerView

/// Compact national anthem playback control.
struct AnthemPlayerView: View {
    let countryCode: String

    @ObservedObject private var anthem = AnthemService.shared
    @Environment(\.colorScheme) var scheme

    private var isThisCountryPlaying: Bool {
        anthem.isPlaying && anthem.currentCountryCode?.uppercased() == countryCode.uppercased()
    }

    private var isThisCountryLoading: Bool {
        anthem.isLoading && anthem.currentCountryCode?.uppercased() == countryCode.uppercased()
    }

    var body: some View {
        HStack(spacing: 10) {
            // Musical note icon
            Image(systemName: "music.note")
                .font(.system(size: 15, weight: .semibold))
                .foregroundColor(Color.mustard)
                .frame(width: 22)

            // Label
            VStack(alignment: .leading, spacing: 1) {
                Text("National Anthem")
                    .fredoka(14, weight: .semibold)
                    .foregroundColor(Color.flagGameInk(scheme))

                if let error = anthem.error,
                   anthem.currentCountryCode?.uppercased() == countryCode.uppercased() {
                    Text(error)
                        .fredoka(11)
                        .foregroundColor(Color.coral)
                        .lineLimit(1)
                }
            }

            Spacer()

            // Play / pause / loading control
            Group {
                if isThisCountryLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: Color.mustard))
                        .scaleEffect(0.9)
                        .frame(width: 36, height: 36)
                } else {
                    Button {
                        if isThisCountryPlaying {
                            anthem.stop()
                        } else {
                            // Stop any currently playing anthem first
                            if anthem.isPlaying { anthem.stop() }
                            Task {
                                await AnthemService.shared.play(countryCode: countryCode)
                            }
                        }
                    } label: {
                        ZStack {
                            Circle()
                                .fill(Color.mustard)
                                .frame(width: 36, height: 36)
                            Image(systemName: isThisCountryPlaying ? "pause.fill" : "play.fill")
                                .font(.system(size: 14, weight: .semibold))
                                .foregroundColor(Color.inkFixed)
                                .offset(x: isThisCountryPlaying ? 0 : 1)
                        }
                    }
                    .stickerShadow()
                    .accessibilityLabel(isThisCountryPlaying ? "Pause anthem" : "Play anthem")
                }
            }
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 10)
        .background(Color.flagGameBackground(scheme).opacity(0.6))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .strokeBorder(Color.mustard.opacity(0.3), lineWidth: 1)
        )
    }
}

#Preview {
    VStack(spacing: 16) {
        AnthemPlayerView(countryCode: "US")
        AnthemPlayerView(countryCode: "JP")
        AnthemPlayerView(countryCode: "FR")
    }
    .padding()
    .background(Color.flagGameBackground(.light))
}
