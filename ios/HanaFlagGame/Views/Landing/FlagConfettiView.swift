import SwiftUI

// MARK: - FlagConfettiView

/// Background decoration showing ~15 small flag tiles scattered at
/// deterministic pseudo-random positions with a gentle scale-pulse animation.
struct FlagConfettiView: View {
    @State private var pulsing = false

    // Deterministic sample of 15 country codes drawn from STATIC_COUNTRIES
    private let sampleCodes: [String] = {
        let all = STATIC_COUNTRIES.map { $0.code }
        // Use a fixed stride to spread picks across the full list
        let stride = max(1, all.count / 15)
        var picked: [String] = []
        for i in 0..<15 {
            let idx = (i * stride + 3) % all.count
            picked.append(all[idx])
        }
        return picked
    }()

    // Deterministic layout positions (normalized 0–1 for x and y)
    // Seeded by a simple LCG so they never change between renders.
    private let positions: [(x: CGFloat, y: CGFloat, rotation: Double, scale: CGFloat)] = {
        var seed: UInt64 = 42
        func next() -> CGFloat {
            seed = seed &* 6364136223846793005 &+ 1442695040888963407
            return CGFloat(seed >> 33) / CGFloat(UInt32.max)
        }
        return (0..<15).map { _ in
            let x = 0.04 + next() * 0.92
            let y = 0.02 + next() * 0.96
            let rot = (next() - 0.5) * 40          // ±20°
            let sc  = 0.85 + next() * 0.30          // 0.85 – 1.15
            return (x, y, Double(rot), sc)
        }
    }()

    var body: some View {
        GeometryReader { geo in
            ZStack {
                ForEach(Array(sampleCodes.enumerated()), id: \.offset) { i, code in
                    let pos = positions[i]
                    FlagImageView(code: code, size: 36, cornerRadius: 5)
                        .rotationEffect(.degrees(pos.rotation))
                        .scaleEffect(pos.scale * (pulsing ? 1.06 : 0.96))
                        .opacity(0.55)
                        .position(
                            x: pos.x * geo.size.width,
                            y: pos.y * geo.size.height
                        )
                        .animation(
                            .easeInOut(duration: 2.4 + Double(i) * 0.18)
                                .repeatForever(autoreverses: true)
                                .delay(Double(i) * 0.22),
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
