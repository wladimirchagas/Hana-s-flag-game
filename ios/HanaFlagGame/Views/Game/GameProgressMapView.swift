import SwiftUI

// MARK: - GameProgressMapView

/// A compact, non-interactive world map that highlights answered countries.
/// Correct answers are shown in lime, wrong answers in coral.
struct GameProgressMapView: View {
    let answeredCorrect: Set<String>
    let answeredWrong: Set<String>
    let shapes: [CountryShape]
    let allCountries: [Country]

    @Environment(\.colorScheme) var scheme

    var body: some View {
        GeometryReader { geo in
            let size = geo.size
            let proj = OrthographicProjection(
                centerLon: 0,
                centerLat: 20,
                scale: size.width * 0.28,
                translateX: size.width / 2,
                translateY: size.height / 2,
                isSouthUp: false
            )
            let radius = min(size.width, size.height) / 2 * 0.98

            ZStack {
                // Ocean background circle
                Circle()
                    .fill(
                        LinearGradient(
                            colors: [
                                scheme == .dark
                                    ? Color(red: 0.05, green: 0.12, blue: 0.28)
                                    : Color(red: 0.56, green: 0.80, blue: 0.95),
                                scheme == .dark
                                    ? Color(red: 0.03, green: 0.07, blue: 0.18)
                                    : Color(red: 0.35, green: 0.65, blue: 0.88)
                            ],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: size.width, height: size.height)

                // Country shapes
                Canvas { context, _ in
                    for shape in shapes {
                        let alpha2 = NUMERIC_TO_ALPHA2[shape.id]

                        let fillColor: Color
                        if let a2 = alpha2 {
                            if answeredCorrect.contains(a2) {
                                fillColor = Color.lime.opacity(0.75)
                            } else if answeredWrong.contains(a2) {
                                fillColor = Color.coral.opacity(0.75)
                            } else {
                                fillColor = Color.flagGameInk(scheme).opacity(0.12)
                            }
                        } else {
                            fillColor = Color.flagGameInk(scheme).opacity(0.08)
                        }

                        let strokeColor = Color.flagGameInk(scheme).opacity(0.18)

                        for ring in shape.rings {
                            guard let cgPath = buildPath(ring: ring, projection: proj) else { continue }
                            let path = Path(cgPath)
                            context.fill(path, with: .color(fillColor))
                            context.stroke(path, with: .color(strokeColor), lineWidth: 0.4)
                        }
                    }
                }
                .frame(width: size.width, height: size.height)
                .clipShape(Circle().scale(radius * 2 / min(size.width, size.height)))

                // Sphere border ring
                Circle()
                    .strokeBorder(
                        Color.flagGameInk(scheme).opacity(0.20),
                        lineWidth: 0.8
                    )
                    .frame(width: radius * 2, height: radius * 2)
                    .position(x: size.width / 2, y: size.height / 2)
            }
        }
        .frame(height: 118)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .background(Color.flagGamePaper(scheme).clipShape(RoundedRectangle(cornerRadius: 12)))
    }
}

// MARK: - Preview

struct GameProgressMapView_Previews: PreviewProvider {
    static var previews: some View {
        GameProgressMapView(
            answeredCorrect: ["US", "GB", "FR", "DE", "JP"],
            answeredWrong: ["CN", "RU", "BR"],
            shapes: [],
            allCountries: []
        )
        .padding()
    }
}
