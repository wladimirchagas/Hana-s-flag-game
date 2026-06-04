import SwiftUI

struct GameModeCard: View {
    let title: String
    let subtitle: String
    let iconName: String
    let accentColor: Color
    let buttonLabel: String
    let action: () -> Void
    var isLarge: Bool = false

    @Environment(\.colorScheme) var scheme

    var body: some View {
        VStack(alignment: .leading, spacing: isLarge ? 14 : 10) {
            // Icon + title row
            HStack(spacing: 10) {
                ZStack {
                    RoundedRectangle(cornerRadius: isLarge ? 14 : 10)
                        .fill(accentColor.opacity(0.18))
                        .frame(width: isLarge ? 52 : 42, height: isLarge ? 52 : 42)
                    Image(systemName: iconName)
                        .font(.system(size: isLarge ? 26 : 20, weight: .bold))
                        .foregroundColor(accentColor)
                }

                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .fredoka(isLarge ? 22 : 18, weight: .bold)
                        .foregroundColor(Color.flagGameInk(scheme))
                        .lineLimit(1)

                    Text(subtitle)
                        .fredoka(isLarge ? 15 : 13)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.65))
                        .lineLimit(2)
                        .fixedSize(horizontal: false, vertical: true)
                }

                Spacer(minLength: 0)

                if isLarge {
                    VStack(spacing: 2) {
                        Text("✦").font(.system(size: 10)).foregroundColor(.mustard)
                        Text("✦").font(.system(size: 7)).foregroundColor(.coral)
                    }
                }
            }

            // Action button
            Button(action: action) {
                Text(buttonLabel)
                    .frame(maxWidth: .infinity)
            }
            .pillButton(color: accentColor, scheme: scheme)
            .frame(maxWidth: .infinity)
        }
        .padding(isLarge ? 20 : 16)
        .cardStyle(scheme: scheme)
    }
}

struct GameModeCard_Previews: PreviewProvider {
    static var previews: some View {
        VStack(spacing: 16) {
            GameModeCard(
                title: "Hana's Game",
                subtitle: "32 countries selected",
                iconName: "heart.fill",
                accentColor: .coral,
                buttonLabel: "Play",
                action: {},
                isLarge: true
            )
            GameModeCard(
                title: "Quick Quiz",
                subtitle: "Random 20 flags",
                iconName: "bolt.fill",
                accentColor: .mustard,
                buttonLabel: "Start",
                action: {}
            )
        }
        .padding()
        .background(Color.flagGameBackground(.light))
    }
}
