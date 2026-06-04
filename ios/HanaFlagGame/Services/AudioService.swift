import AVFoundation

final class AudioService: ObservableObject {
    static let shared = AudioService()

    @Published var isMuted: Bool {
        didSet { UserDefaults.standard.set(isMuted, forKey: "sfx-muted") }
    }

    private var audioEngine = AVAudioEngine()
    private var bgMixerNode = AVAudioMixerNode()
    private var bgScheduler: Timer?

    private init() {
        isMuted = UserDefaults.standard.bool(forKey: "sfx-muted")
        setupAudioSession()
        setupBgEngine()
    }

    private func setupAudioSession() {
        try? AVAudioSession.sharedInstance().setCategory(.ambient, options: .mixWithOthers)
        try? AVAudioSession.sharedInstance().setActive(true)
    }

    private func setupBgEngine() {
        audioEngine.attach(bgMixerNode)
        audioEngine.connect(bgMixerNode, to: audioEngine.mainMixerNode, format: nil)
        try? audioEngine.start()
    }

    // MARK: - Sound Effects

    func playCorrect() {
        guard !isMuted else { return }
        playTones([
            (frequency: 523.25, duration: 0.12, startTime: 0.0),
            (frequency: 783.99, duration: 0.18, startTime: 0.10)
        ], waveform: .triangle)
    }

    func playWrong() {
        guard !isMuted else { return }
        playTones([
            (frequency: 330.0, duration: 0.08, startTime: 0.0),
            (frequency: 220.0, duration: 0.14, startTime: 0.06)
        ], waveform: .sine)
    }

    func playCelebration() {
        guard !isMuted else { return }
        let notes: [(Double, Double)] = [
            (523.25, 0.0), (659.25, 0.12), (783.99, 0.24), (1046.5, 0.36),
            (783.99, 0.52), (1046.5, 0.60)
        ]
        let tones = notes.map { (f, t) in (frequency: f, duration: 0.15, startTime: t) }
        playTones(tones, waveform: .triangle)
    }

    func playUnlock() {
        guard !isMuted else { return }
        let scale: [Double] = [392, 440, 493.88, 523.25, 587.33, 659.25, 783.99]
        let tones = scale.enumerated().map { (i, f) in
            (frequency: f, duration: 0.09, startTime: Double(i) * 0.08)
        }
        playTones(tones, waveform: .triangle)
    }

    // MARK: - Background Music

    func startBackgroundMusic() {
        guard !isMuted else { return }
        stopBackgroundMusic()
        var step = 0
        let melody: [Double] = [523.25, 587.33, 659.25, 783.99, 659.25, 523.25,
                                 392.0, 440.0, 523.25, 440.0, 392.0, 329.63,
                                 392.0, 440.0, 493.88, 523.25]
        bgScheduler = Timer.scheduledTimer(withTimeInterval: 0.55, repeats: true) { [weak self] _ in
            guard let self, !self.isMuted else { return }
            self.playTones([(frequency: melody[step % melody.count], duration: 0.45, startTime: 0.0)],
                           waveform: .triangle, volume: 0.12)
            step += 1
        }
    }

    func stopBackgroundMusic() {
        bgScheduler?.invalidate()
        bgScheduler = nil
    }

    // MARK: - Private Synthesis

    private struct ToneParams {
        let frequency: Double
        let duration: Double
        let startTime: Double
    }

    private func playTones(_ tones: [(frequency: Double, duration: Double, startTime: Double)],
                           waveform: Waveform = .sine, volume: Float = 0.5) {
        let sampleRate: Double = 44100
        let format = AVAudioFormat(standardFormatWithSampleRate: sampleRate, channels: 1)!

        for tone in tones {
            let totalFrames = AVAudioFrameCount(tone.duration * sampleRate)
            guard let buffer = AVAudioPCMBuffer(pcmFormat: format, frameCapacity: totalFrames) else { continue }
            buffer.frameLength = totalFrames

            let frames = UnsafeMutableBufferPointer(start: buffer.floatChannelData![0], count: Int(totalFrames))
            for i in 0..<Int(totalFrames) {
                let t = Double(i) / sampleRate
                let phase = 2.0 * .pi * tone.frequency * t
                var sample: Float
                switch waveform {
                case .sine:     sample = Float(sin(phase))
                case .triangle: sample = Float(2.0 / .pi * asin(sin(phase)))
                case .square:   sample = Float(sin(phase) > 0 ? 1.0 : -1.0)
                }
                // Envelope: 5ms attack, 5ms release
                let attack = min(t / 0.005, 1.0)
                let release = min((tone.duration - t) / 0.005, 1.0)
                sample *= Float(min(attack, release)) * volume
                frames[i] = sample
            }

            let playerNode = AVAudioPlayerNode()
            audioEngine.attach(playerNode)
            audioEngine.connect(playerNode, to: audioEngine.mainMixerNode, format: format)

            let startDelay = tone.startTime + 0.01
            playerNode.scheduleBuffer(buffer, completionHandler: { [weak self] in
                self?.audioEngine.detach(playerNode)
            })

            DispatchQueue.main.asyncAfter(deadline: .now() + startDelay) {
                if !self.audioEngine.isRunning { try? self.audioEngine.start() }
                playerNode.play()
            }
        }
    }

    enum Waveform { case sine, triangle, square }
}
