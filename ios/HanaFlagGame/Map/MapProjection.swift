import CoreGraphics
import Foundation

/// Orthographic projection matching the web app's D3-geo rendering
struct OrthographicProjection {
    var centerLon: Double = 0.0  // degrees
    var centerLat: Double = 0.0  // degrees
    var scale: Double = 150.0
    var translateX: Double = 0.0
    var translateY: Double = 0.0

    func project(lon: Double, lat: Double) -> CGPoint? {
        let λ = lon * .pi / 180.0
        let φ = lat * .pi / 180.0
        let λ0 = centerLon * .pi / 180.0
        let φ0 = centerLat * .pi / 180.0

        let cosC = sin(φ0) * sin(φ) + cos(φ0) * cos(φ) * cos(λ - λ0)
        guard cosC > 0 else { return nil }  // behind the sphere

        let x = scale * cos(φ) * sin(λ - λ0) + translateX
        let y = scale * (cos(φ0) * sin(φ) - sin(φ0) * cos(φ) * cos(λ - λ0)) * (isSouthUp ? 1 : -1) + translateY
        return CGPoint(x: x, y: y)
    }

    var isSouthUp: Bool = false

    func unproject(point: CGPoint) -> (lon: Double, lat: Double)? {
        let x = (point.x - translateX) / scale
        let y = (point.y - translateY) / scale * (isSouthUp ? 1 : -1)

        let ρ = sqrt(x * x + y * y)
        guard ρ <= 1.0 else { return nil }

        let c = asin(ρ)
        let φ0 = centerLat * .pi / 180.0
        let λ0 = centerLon * .pi / 180.0

        let lat = asin(cos(c) * sin(φ0) + (ρ == 0 ? 0 : y * sin(c) * cos(φ0) / ρ))
        let lon = λ0 + atan2(x * sin(c), ρ * cos(φ0) * cos(c) - y * sin(φ0) * sin(c))

        return (lon: lon * 180.0 / .pi, lat: lat * 180.0 / .pi)
    }
}

/// Builds a CGPath for a polygon's exterior ring using a given projection.
/// Returns nil if fewer than 2 visible points.
func buildPath(
    ring: [[Double]],
    projection: OrthographicProjection
) -> CGPath? {
    var path: CGMutablePath? = nil
    var first = true

    for coord in ring {
        guard coord.count >= 2 else { continue }
        guard let pt = projection.project(lon: coord[0], lat: coord[1]) else {
            first = true  // reset path continuity after going behind the sphere
            continue
        }
        if first {
            path = CGMutablePath()
            path?.move(to: pt)
            first = false
        } else {
            path?.addLine(to: pt)
        }
    }
    path?.closeSubpath()
    return path
}
