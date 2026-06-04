import SwiftUI

struct FinishConfettiView: View {
    private struct Piece: Identifiable {
        let id: Int
        let xFraction: CGFloat   // 0–1 normalized
        let delay: Double
        let color: Color
        let rotationDeg: Double
        let width: CGFloat
        let height: CGFloat
        let drift: CGFloat       // slight horizontal drift during fall
    }

    private let pieces: [Piece] = {
        let palette: [Color] = [.coral, .mustard, .sky, .lime, .pink,
                                .coral, .mustard, .sky, .lime]
        var rng = SystemRandomNumberGenerator()
        return (0..<44).map { i in
            Piece(
                id: i,
                xFraction: CGFloat(i) / 44.0 + CGFloat.random(in: -0.02...0.02, using: &rng),
                delay: Double(i) * 0.048,
                color: palette[i % palette.count],
                rotationDeg: Double.random(in: -60...60, using: &rng),
                width: CGFloat.random(in: 7...15, using: &rng),
                height: CGFloat.random(in: 5...10, using: &rng),
                drift: CGFloat.random(in: -30...30, using: &rng)
            )
        }
    }()

    @State private var fallen = false

    var body: some View {
        GeometryReader { geo in
            ZStack {
                ForEach(pieces) { p in
                    RoundedRectangle(cornerRadius: 2)
                        .fill(p.color)
                        .frame(width: p.width, height: p.height)
                        .rotationEffect(.degrees(p.rotationDeg))
                        .position(
                            x: p.xFraction * geo.size.width + (fallen ? p.drift : 0),
                            y: fallen ? geo.size.height + 30 : -16
                        )
                        .animation(
                            .easeIn(duration: 1.1 + p.delay * 0.25)
                                .delay(p.delay),
                            value: fallen
                        )
                }
            }
        }
        .ignoresSafeArea()
        .allowsHitTesting(false)
        .onAppear { fallen = true }
    }
}
