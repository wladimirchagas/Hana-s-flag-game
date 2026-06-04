import SwiftUI

extension Color {
    static let ink = Color("ink")
    static let cream = Color("cream")
    static let inkFixed = Color(red: 0.102, green: 0.133, blue: 0.220)
    static let coral = Color("coral")
    static let mustard = Color("mustard")
    static let sky = Color("sky")
    static let lime = Color("lime")
    static let pink = Color("appPink")
    static let paper = Color("paper")

    // Fallbacks when assets aren't found
    static let coralFallback = Color(red: 1.0, green: 0.42, blue: 0.42)
    static let mustardFallback = Color(red: 1.0, green: 0.784, blue: 0.341)
    static let skyFallback = Color(red: 0.306, green: 0.804, blue: 0.769)
    static let limeFallback = Color(red: 0.494, green: 0.851, blue: 0.341)
}

extension Color {
    static func flagGameBackground(_ scheme: ColorScheme) -> Color {
        scheme == .dark
            ? Color(red: 0.067, green: 0.086, blue: 0.165)
            : Color(red: 1.0, green: 0.973, blue: 0.933)
    }

    static func flagGamePaper(_ scheme: ColorScheme) -> Color {
        scheme == .dark
            ? Color(red: 0.110, green: 0.141, blue: 0.251)
            : Color.white
    }

    static func flagGameInk(_ scheme: ColorScheme) -> Color {
        scheme == .dark
            ? Color(red: 0.957, green: 0.925, blue: 0.847)
            : Color(red: 0.102, green: 0.133, blue: 0.220)
    }
}

struct StickerShadow: ViewModifier {
    @Environment(\.colorScheme) var scheme

    func body(content: Content) -> some View {
        content
            .shadow(
                color: scheme == .dark
                    ? Color(red: 0.039, green: 0.055, blue: 0.114).opacity(0.9)
                    : Color(red: 0.102, green: 0.133, blue: 0.220),
                radius: 0, x: 0, y: 6
            )
            .shadow(
                color: (scheme == .dark ? Color.black : Color(red: 0.102, green: 0.133, blue: 0.220)).opacity(scheme == .dark ? 0.55 : 0.18),
                radius: 12, x: 0, y: 10
            )
    }
}

extension View {
    func stickerShadow() -> some View {
        modifier(StickerShadow())
    }
}
