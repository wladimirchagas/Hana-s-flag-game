import SwiftUI

extension View {
    func cardStyle(scheme: ColorScheme, radius: CGFloat = 22) -> some View {
        self
            .background(Color.flagGamePaper(scheme))
            .clipShape(RoundedRectangle(cornerRadius: radius))
            .stickerShadow()
    }

    @ViewBuilder
    func `if`<Content: View>(_ condition: Bool, transform: (Self) -> Content) -> some View {
        if condition {
            transform(self)
        } else {
            self
        }
    }
}

struct FredokaFont: ViewModifier {
    var weight: Font.Weight
    var size: CGFloat

    func body(content: Content) -> some View {
        content.font(.custom("Fredoka", size: size).weight(weight))
    }
}

extension View {
    func fredoka(_ size: CGFloat, weight: Font.Weight = .regular) -> some View {
        modifier(FredokaFont(weight: weight, size: size))
    }
}

struct PillButton: ViewModifier {
    var color: Color
    var scheme: ColorScheme

    func body(content: Content) -> some View {
        content
            .fredoka(18, weight: .semibold)
            .foregroundColor(Color.inkFixed)
            .padding(.vertical, 14)
            .padding(.horizontal, 28)
            .background(color)
            .clipShape(Capsule())
            .stickerShadow()
    }
}

extension View {
    func pillButton(color: Color, scheme: ColorScheme) -> some View {
        modifier(PillButton(color: color, scheme: scheme))
    }
}
