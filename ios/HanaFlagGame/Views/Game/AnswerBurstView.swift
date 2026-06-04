import SwiftUI

struct AnswerBurstView: View {
    let wasCorrect: Bool
    @State private var scale: CGFloat = 0.2
    @State private var opacity: Double = 1.0

    var body: some View {
        ZStack {
            Circle()
                .fill(wasCorrect ? Color.lime.opacity(0.25) : Color.coral.opacity(0.25))
                .frame(width: 130, height: 130)
            Image(systemName: wasCorrect ? "checkmark" : "xmark")
                .font(.system(size: 64, weight: .bold))
                .foregroundColor(wasCorrect ? .lime : .coral)
        }
        .scaleEffect(scale)
        .opacity(opacity)
        .onAppear {
            withAnimation(.spring(response: 0.28, dampingFraction: 0.55)) {
                scale = 1.0
            }
            withAnimation(.easeOut(duration: 0.25).delay(0.55)) {
                opacity = 0.0
            }
        }
        .allowsHitTesting(false)
    }
}
