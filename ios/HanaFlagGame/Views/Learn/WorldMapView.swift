import SwiftUI

struct WorldMapView: View {
    @ObservedObject var learnVM: LearnViewModel
    let shapes: [CountryShape]
    let countries: [Country]
    var countryResults: [String: Bool]? = nil   // alpha-2 → correct/wrong
    var onCountrySelected: ((Country) -> Void)? = nil

    @Environment(\.colorScheme) var scheme

    // Local projection state
    @State private var scale: Double = 150.0
    @State private var dragStartLon: Double = 0
    @State private var isDragging: Bool = false

    // Auto-rotation timer
    @State private var rotationTimer: Timer? = nil

    // Build alpha2 → numeric lookup once
    private var alpha2ToNumeric: [String: String] {
        var d: [String: String] = [:]
        for (num, a2) in NUMERIC_TO_ALPHA2 { d[a2] = num }
        return d
    }

    private var selectedNumericId: String? {
        guard let c = learnVM.selectedCountry else { return nil }
        return alpha2ToNumeric[c.code]
    }

    private func countryColors(viewSize: CGSize) -> [String: Color] {
        var colors: [String: Color] = [:]
        if let results = countryResults {
            for (code, correct) in results {
                colors[code] = correct ? Color.lime : Color.coral
            }
        } else {
            for country in countries {
                switch country.continent {
                case .africa:   colors[country.code] = Color.coral.opacity(0.45)
                case .americas: colors[country.code] = Color.sky.opacity(0.45)
                case .asia:     colors[country.code] = Color.mustard.opacity(0.45)
                case .europe:   colors[country.code] = Color.lime.opacity(0.45)
                case .oceania:  colors[country.code] = Color.pink.opacity(0.45)
                }
            }
        }
        return colors
    }

    private func projection(in size: CGSize) -> OrthographicProjection {
        OrthographicProjection(
            centerLon: learnVM.mapRotationLon,
            centerLat: 20,
            scale: scale * min(size.width, size.height) / 300,
            translateX: size.width / 2,
            translateY: size.height / 2,
            isSouthUp: false
        )
    }

    private func startAutoRotation() {
        stopAutoRotation()
        rotationTimer = Timer.scheduledTimer(withTimeInterval: 0.033, repeats: true) { _ in
            learnVM.rotateMap(by: -0.3)
        }
    }

    private func stopAutoRotation() {
        rotationTimer?.invalidate()
        rotationTimer = nil
    }

    var body: some View {
        GeometryReader { geo in
            let size = geo.size
            let proj = projection(in: size)

            ZStack(alignment: .bottomTrailing) {
                WorldMapRenderer(
                    shapes: shapes,
                    projection: proj,
                    countryColors: countryColors(viewSize: size),
                    selectedNumericId: selectedNumericId,
                    onTap: { numericId in
                        if let a2 = NUMERIC_TO_ALPHA2[numericId],
                           let country = countries.first(where: { $0.code == a2 }) {
                            learnVM.selectedCountry = country
                            learnVM.selectedHistoricalPolity = nil
                            onCountrySelected?(country)
                        } else {
                            learnVM.selectedCountry = nil
                        }
                    }
                )
                .frame(width: size.width, height: size.height)
                // Drag to rotate
                .gesture(
                    DragGesture(minimumDistance: 3)
                        .onChanged { value in
                            if !isDragging {
                                isDragging = true
                                dragStartLon = learnVM.mapRotationLon
                                if learnVM.isMapRotating { stopAutoRotation() }
                            }
                            let deltaLon = -value.translation.width / size.width * 180
                            learnVM.mapRotationLon = (dragStartLon + deltaLon)
                                .truncatingRemainder(dividingBy: 360)
                        }
                        .onEnded { _ in
                            isDragging = false
                            if learnVM.isMapRotating { startAutoRotation() }
                        }
                )
                // Pinch to zoom
                .gesture(
                    MagnificationGesture()
                        .onChanged { value in
                            scale = max(80, min(600, scale * value))
                        }
                )

                // Rotate play/pause button
                Button {
                    learnVM.isMapRotating.toggle()
                    if learnVM.isMapRotating {
                        startAutoRotation()
                    } else {
                        stopAutoRotation()
                    }
                } label: {
                    Image(systemName: learnVM.isMapRotating ? "pause.circle.fill" : "play.circle.fill")
                        .font(.system(size: 32))
                        .foregroundColor(.white.opacity(0.85))
                        .shadow(color: .black.opacity(0.3), radius: 4, x: 0, y: 2)
                }
                .padding(16)
                .accessibilityLabel(learnVM.isMapRotating ? "Pause rotation" : "Start rotation")
            }
        }
        .onAppear {
            if learnVM.isMapRotating { startAutoRotation() }
        }
        .onDisappear {
            stopAutoRotation()
        }
        .onChange(of: learnVM.isMapRotating) { rotating in
            if rotating { startAutoRotation() } else { stopAutoRotation() }
        }
    }
}
