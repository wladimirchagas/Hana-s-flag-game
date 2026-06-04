import SwiftUI

// MARK: - ThemeToggleView

struct ThemeToggleView: View {
    @EnvironmentObject var appVM: AppViewModel
    @Environment(\.colorScheme) var scheme

    var body: some View {
        Button {
            appVM.toggleTheme()
        } label: {
            Image(systemName: scheme == .dark ? "sun.max.fill" : "moon.fill")
                .font(.system(size: 18, weight: .semibold))
                .foregroundColor(Color.flagGameInk(scheme))
                .frame(width: 36, height: 36)
        }
        .accessibilityLabel(scheme == .dark ? "Switch to light mode" : "Switch to dark mode")
    }
}

// MARK: - MuteToggleView

struct MuteToggleView: View {
    @ObservedObject private var audio = AudioService.shared
    @Environment(\.colorScheme) var scheme

    var body: some View {
        Button {
            audio.isMuted.toggle()
        } label: {
            Image(systemName: audio.isMuted ? "speaker.slash.fill" : "speaker.wave.2.fill")
                .font(.system(size: 18, weight: .semibold))
                .foregroundColor(Color.flagGameInk(scheme))
                .frame(width: 36, height: 36)
        }
        .accessibilityLabel(audio.isMuted ? "Unmute sounds" : "Mute sounds")
    }
}

// MARK: - TopbarView

struct TopbarView: View {
    let label: String
    let onBack: () -> Void

    @Environment(\.colorScheme) var scheme

    var body: some View {
        HStack(spacing: 4) {
            // Back button
            Button(action: onBack) {
                Image(systemName: "chevron.left.circle.fill")
                    .font(.system(size: 28, weight: .semibold))
                    .foregroundColor(Color.flagGameInk(scheme))
            }
            .accessibilityLabel("Back")

            Spacer()

            // Center label
            Text(label)
                .fredoka(17, weight: .bold)
                .foregroundColor(Color.flagGameInk(scheme))

            Spacer()

            // Right controls
            HStack(spacing: 0) {
                ThemeToggleView()
                MuteToggleView()
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
        .background(Color.flagGameBackground(scheme).opacity(0.95))
    }
}

#Preview {
    TopbarView(label: "Flag Game", onBack: {})
        .environmentObject(AppViewModel())
}
