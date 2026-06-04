import AVFoundation
import Foundation

final class AnthemService: ObservableObject {
    static let shared = AnthemService()

    @Published var isPlaying = false
    @Published var isLoading = false
    @Published var error: String?
    @Published var currentCountryCode: String?

    private var player: AVPlayer?
    private var playerObserver: Any?

    private init() {}

    func play(countryCode: String) async {
        await MainActor.run {
            isLoading = true
            error = nil
            currentCountryCode = countryCode
        }

        guard let wikiFile = NATIONAL_ANTHEM_WIKI_FILES[countryCode.uppercased()] else {
            await MainActor.run {
                error = "No anthem available"
                isLoading = false
            }
            return
        }

        do {
            let url = try await resolveAudioURL(wikiFile: wikiFile)
            await MainActor.run {
                self.stop()
                try? AVAudioSession.sharedInstance().setCategory(.playback)
                try? AVAudioSession.sharedInstance().setActive(true)
                let item = AVPlayerItem(url: url)
                self.player = AVPlayer(playerItem: item)
                self.playerObserver = NotificationCenter.default.addObserver(
                    forName: .AVPlayerItemDidPlayToEndTime,
                    object: item,
                    queue: .main
                ) { [weak self] _ in
                    self?.isPlaying = false
                    self?.currentCountryCode = nil
                }
                self.player?.play()
                self.isPlaying = true
                self.isLoading = false
            }
        } catch {
            await MainActor.run {
                self.error = "Failed to load anthem"
                self.isLoading = false
            }
        }
    }

    func stop() {
        player?.pause()
        player = nil
        if let obs = playerObserver {
            NotificationCenter.default.removeObserver(obs)
            playerObserver = nil
        }
        isPlaying = false
        currentCountryCode = nil
    }

    private func resolveAudioURL(wikiFile: String) async throws -> URL {
        let encodedFile = wikiFile.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? wikiFile
        let apiURLStr = "https://commons.wikimedia.org/w/api.php?action=query&prop=videoinfo&format=json&viprop=url,derivatives&titles=File:\(encodedFile)&origin=*"
        guard let apiURL = URL(string: apiURLStr) else { throw URLError(.badURL) }

        let (data, _) = try await URLSession.shared.data(from: apiURL)
        let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
        let query = json?["query"] as? [String: Any]
        let pages = query?["pages"] as? [String: Any]
        let page = pages?.values.first as? [String: Any]
        let videoinfo = (page?["videoinfo"] as? [[String: Any]])?.first

        // Prefer MP3 derivative (playable on iOS natively)
        if let derivatives = videoinfo?["derivatives"] as? [[String: Any]] {
            for d in derivatives {
                if let type_ = d["type"] as? String,
                   type_.contains("mpeg") || type_.contains("mp3"),
                   let src = d["src"] as? String,
                   let url = URL(string: src) {
                    return url
                }
            }
        }

        // Fall back to original file URL (OGG - may not play on older iOS)
        if let urlStr = videoinfo?["url"] as? String, let url = URL(string: urlStr) {
            return url
        }

        throw URLError(.fileDoesNotExist)
    }
}
