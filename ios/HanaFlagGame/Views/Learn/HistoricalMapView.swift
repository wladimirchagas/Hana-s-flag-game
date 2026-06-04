import SwiftUI
import CoreGraphics

// MARK: - HistoricalMapView

struct HistoricalMapView: View {
    @ObservedObject var learnVM: LearnViewModel
    let shapes: [CountryShape]          // modern TopoJSON shapes for background
    var onPolitySelected: ((HistoricalPolity) -> Void)? = nil

    @Environment(\.colorScheme) var scheme

    @State private var scale: Double = 150.0
    @State private var dragStartLon: Double = 0
    @State private var isDragging: Bool = false
    @State private var rotationTimer: Timer? = nil

    // MARK: - Projection

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

    // MARK: - Auto-rotation

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

    // MARK: - Color helpers

    /// Deterministic color derived from the polity name hash so every polity
    /// gets a stable, distinct hue.
    private func polityColor(for polity: HistoricalPolity) -> Color {
        let hash = abs(polity.name.hashValue)
        let hue = Double(hash % 360) / 360.0
        let saturation = 0.55 + Double(hash % 100) / 400.0   // 0.55 … 0.80
        let brightness = 0.70 + Double((hash / 360) % 100) / 500.0  // 0.70 … 0.90
        return Color(hue: hue, saturation: saturation, brightness: brightness, opacity: 0.75)
    }

    /// Returns whether a point is inside a projected polygon ring (ray-casting).
    private func pointInRing(_ point: CGPoint, ring: [CGPoint]) -> Bool {
        var inside = false
        var j = ring.count - 1
        for i in 0..<ring.count {
            let xi = ring[i].x, yi = ring[i].y
            let xj = ring[j].x, yj = ring[j].y
            if ((yi > point.y) != (yj > point.y)) &&
               (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi) {
                inside.toggle()
            }
            j = i
        }
        return inside
    }

    /// Find the polity whose polygon contains the tap point, or the nearest centroid.
    private func polityAt(_ tapPoint: CGPoint, proj: OrthographicProjection) -> HistoricalPolity? {
        // First try exact hit
        for polity in learnVM.historicalFeatures {
            for ring in polity.coordinates {
                guard ring.count >= 3 else { continue }
                let projectedRing = ring.compactMap { coord -> CGPoint? in
                    guard coord.count >= 2 else { return nil }
                    return proj.project(lon: coord[0], lat: coord[1])
                }
                guard projectedRing.count >= 3 else { continue }
                if pointInRing(tapPoint, ring: projectedRing) {
                    return polity
                }
            }
        }

        // Fall back to nearest centroid
        var best: HistoricalPolity? = nil
        var bestDist = Double.infinity
        for polity in learnVM.historicalFeatures {
            guard let ring = polity.coordinates.first, !ring.isEmpty else { continue }
            var sumX: Double = 0, sumY: Double = 0, count: Double = 0
            for coord in ring {
                guard coord.count >= 2,
                      let pt = proj.project(lon: coord[0], lat: coord[1]) else { continue }
                sumX += pt.x; sumY += pt.y; count += 1
            }
            guard count > 0 else { continue }
            let cx = sumX / count, cy = sumY / count
            let dx = tapPoint.x - cx, dy = tapPoint.y - cy
            let dist = dx * dx + dy * dy
            if dist < bestDist {
                bestDist = dist
                best = polity
            }
        }
        return best
    }

    // MARK: - Era slider helpers

    private var eraIndex: Int {
        HISTORICAL_ERAS.firstIndex(where: { $0.id == learnVM.currentEra.id }) ?? 0
    }

    // MARK: - Body

    var body: some View {
        GeometryReader { geo in
            let size = geo.size
            let proj = projection(in: size)
            let radius = min(size.width, size.height) / 2 * 0.98

            ZStack(alignment: .bottom) {
                // Map layer
                ZStack {
                    // Ocean
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
                        .frame(width: radius * 2, height: radius * 2)
                        .position(x: size.width / 2, y: size.height / 2)

                    // Modern country outlines as faint background
                    Canvas { context, _ in
                        for shape in shapes {
                            for ring in shape.rings {
                                guard let cgPath = buildPath(ring: ring, projection: proj) else { continue }
                                let path = Path(cgPath)
                                context.fill(path, with: .color(
                                    Color.flagGameBackground(scheme).opacity(0.15)
                                ))
                                context.stroke(path, with: .color(
                                    Color.flagGameInk(scheme).opacity(0.15)
                                ), lineWidth: 0.3)
                            }
                        }
                    }
                    .frame(width: size.width, height: size.height)
                    .clipShape(Circle().scale(radius * 2 / min(size.width, size.height)))

                    // Historical polity shapes
                    Canvas { context, _ in
                        for polity in learnVM.historicalFeatures {
                            let isSelected = polity.id == learnVM.selectedHistoricalPolity?.id
                            let fillColor = isSelected
                                ? Color.mustard.opacity(0.85)
                                : polityColor(for: polity).opacity(isSelected ? 0.85 : 0.65)
                            let strokeColor = isSelected
                                ? Color.inkFixed
                                : Color.flagGameInk(scheme).opacity(0.6)

                            for ring in polity.coordinates {
                                guard ring.count >= 3 else { continue }
                                let cgPath = CGMutablePath()
                                var first = true
                                for coord in ring {
                                    guard coord.count >= 2,
                                          let pt = proj.project(lon: coord[0], lat: coord[1])
                                    else {
                                        first = true
                                        continue
                                    }
                                    if first {
                                        cgPath.move(to: pt)
                                        first = false
                                    } else {
                                        cgPath.addLine(to: pt)
                                    }
                                }
                                cgPath.closeSubpath()
                                let path = Path(cgPath)
                                context.fill(path, with: .color(fillColor))
                                context.stroke(path, with: .color(strokeColor),
                                               lineWidth: isSelected ? 1.2 : 0.6)
                            }
                        }
                    }
                    .frame(width: size.width, height: size.height)
                    .clipShape(Circle().scale(radius * 2 / min(size.width, size.height)))

                    // Sphere border
                    Circle()
                        .strokeBorder(Color.flagGameInk(scheme).opacity(0.25), lineWidth: 1)
                        .frame(width: radius * 2, height: radius * 2)
                        .position(x: size.width / 2, y: size.height / 2)
                }
                .contentShape(Circle().scale(radius * 2 / min(size.width, size.height)))
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
                .gesture(
                    MagnificationGesture()
                        .onChanged { value in
                            scale = max(80, min(600, scale * value))
                        }
                )
                .onTapGesture { location in
                    if let polity = polityAt(location, proj: proj) {
                        learnVM.selectedHistoricalPolity = polity
                        learnVM.selectedCountry = nil
                        onPolitySelected?(polity)
                    }
                }

                // Loading overlay
                if learnVM.isLoadingHistorical {
                    VStack(spacing: 8) {
                        ProgressView()
                            .tint(Color.mustard)
                            .scaleEffect(1.2)
                        Text("Loading historical data…")
                            .fredoka(13)
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.7))
                    }
                    .padding(16)
                    .background(Color.flagGamePaper(scheme).opacity(0.9))
                    .clipShape(RoundedRectangle(cornerRadius: 14))
                    .padding(.bottom, 100)
                }

                // Era slider panel
                EraSliderView(learnVM: learnVM)
                    .padding(.horizontal, 12)
                    .padding(.bottom, 12)
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

// MARK: - EraSliderView

private struct EraSliderView: View {
    @ObservedObject var learnVM: LearnViewModel
    @Environment(\.colorScheme) var scheme

    private var eraIndex: Double {
        get {
            Double(HISTORICAL_ERAS.firstIndex(where: { $0.id == learnVM.currentEra.id }) ?? 0)
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            // Era label row
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text(learnVM.currentEra.label)
                        .fredoka(17, weight: .bold)
                        .foregroundColor(Color.flagGameInk(scheme))
                    Text(learnVM.currentEra.caption)
                        .fredoka(12)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.6))
                }
                Spacer()
                if learnVM.isHistoricalMode {
                    Text("HISTORICAL")
                        .fredoka(11, weight: .semibold)
                        .foregroundColor(Color.mustard)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3)
                        .background(Color.mustard.opacity(0.15))
                        .clipShape(Capsule())
                }
            }

            // Slider
            Slider(
                value: Binding(
                    get: { eraIndex },
                    set: { newVal in
                        let idx = Int(newVal.rounded())
                        let clamped = max(0, min(HISTORICAL_ERAS.count - 1, idx))
                        let era = HISTORICAL_ERAS[clamped]
                        if era.id != learnVM.currentEra.id {
                            learnVM.setEra(era)
                        }
                    }
                ),
                in: 0...Double(HISTORICAL_ERAS.count - 1),
                step: 1
            )
            .tint(Color.mustard)

            // Era tick labels
            HStack(spacing: 0) {
                ForEach(HISTORICAL_ERAS) { era in
                    Text(era.label)
                        .fredoka(9)
                        .foregroundColor(
                            era.id == learnVM.currentEra.id
                                ? Color.mustard
                                : Color.flagGameInk(scheme).opacity(0.5)
                        )
                        .frame(maxWidth: .infinity)
                        .lineLimit(1)
                        .minimumScaleFactor(0.6)
                }
            }
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 10)
        .background(Color.flagGamePaper(scheme).opacity(0.92))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .stickerShadow()
    }
}
