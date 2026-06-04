import UIKit
import CoreHaptics

final class HapticService {
    static let shared = HapticService()
    private var engine: CHHapticEngine?
    private init() { prepareEngine() }

    private func prepareEngine() {
        guard CHHapticEngine.capabilitiesForHardware().supportsHaptics else { return }
        engine = try? CHHapticEngine()
        try? engine?.start()
        engine?.resetHandler = { [weak self] in
            try? self?.engine?.start()
        }
        engine?.stoppedHandler = { [weak self] _ in
            try? self?.engine?.start()
        }
    }

    func correct() {
        UIImpactFeedbackGenerator(style: .medium).impactOccurred()
    }

    func wrong() {
        let gen = UINotificationFeedbackGenerator()
        gen.notificationOccurred(.error)
    }

    func celebrate() {
        guard let engine, CHHapticEngine.capabilitiesForHardware().supportsHaptics else {
            UINotificationFeedbackGenerator().notificationOccurred(.success)
            return
        }
        let events: [(Double, Float, Double)] = [
            (0.0, 0.5, 0.08),
            (0.12, 0.8, 0.04),
            (0.22, 1.0, 0.16)
        ]
        do {
            let hapticEvents = events.map { (time, intensity, duration) in
                CHHapticEvent(
                    eventType: .hapticContinuous,
                    parameters: [
                        CHHapticEventParameter(parameterID: .hapticIntensity, value: intensity),
                        CHHapticEventParameter(parameterID: .hapticSharpness, value: 0.5)
                    ],
                    relativeTime: time,
                    duration: duration
                )
            }
            let pattern = try CHHapticPattern(events: hapticEvents, parameters: [])
            let player = try engine.makePlayer(with: pattern)
            try player.start(atTime: CHHapticTimeImmediate)
        } catch {}
    }

    func unlock() {
        guard CHHapticEngine.capabilitiesForHardware().supportsHaptics else {
            UIImpactFeedbackGenerator(style: .heavy).impactOccurred()
            return
        }
        UIImpactFeedbackGenerator(style: .heavy).impactOccurred()
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.08) {
            UIImpactFeedbackGenerator(style: .medium).impactOccurred()
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.18) {
            UIImpactFeedbackGenerator(style: .heavy).impactOccurred()
        }
    }
}
