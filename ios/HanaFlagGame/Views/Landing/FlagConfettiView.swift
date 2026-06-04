import SwiftUI

// MARK: - FlagConfettiView

/// Background decoration showing ~15 small flag tiles scattered at
/// deterministic pseudo-random positions with a gentle scale-pulse animation.
struct FlagConfettiView: View {
    @State private var pulsing = false

    // 8 flags spread evenly across the full country list
    private let sampleCodes: [String] = {
        let all = STATIC_COUNTRIES.map { $0.code }
        let stride = max(1, all.count / 8)
        return (0..<8).map { i in all[(i * stride + 7) % all.count] }
    }()

    // Positions constrained to top 38% of screen so flags don't overlap cards
    private let positions: [(x: CGFloat, y: CGFloat, rotation: Double, scale: CGFloat)] = {
        var seed: UInt64 = 137
        func next() -> CGFloat {
            seed = seed &* 6364136223846793005 &+ 1442695040888963407
            return CGFloat(seed >> 33) / CGFloat(UInt32.max)
        }
        return (0..<8).map { _ in
            let x = 0.04 + next() * 0.92
            let y = 0.02 + next() * 0.36           // top 38% only
            let rot = (next() - 0.5) * 30           // ±15°
            let sc  = 0.80 + next() * 0.25
            return (x, y, Double(rot), sc)
        }
    }()

    var body: some View {
        GeometryReader { geo in
            ZStack {
                ForEach(Array(sampleCodes.enumerated()), id: \.offset) { i, code in
                    let pos = positions[i]
                    FlagImageView(code: code, size: 32, cornerRadius: 4)
                        .rotationEffect(.degrees(pos.rotation))
                        .scaleEffect(pos.scale * (pulsing ? 1.08 : 0.93))
                        .opacity(0.30)
                        .position(
                            x: pos.x * geo.size.width,
                            y: pos.y * geo.size.height
                        )
                        .animation(
                            .easeInOut(duration: 2.8 + Double(i) * 0.22)
                                .repeatForever(autoreverses: true)
                                .delay(Double(i) * 0.45),
                            value: pulsing
                        )
                }
            }
        }
        .onAppear { pulsing = true }
        .allowsHitTesting(false)
    }
}

#Preview {
    FlagConfettiView()
        .frame(width: 390, height: 600)
        .background(Color.flagGameBackground(.light))
}
