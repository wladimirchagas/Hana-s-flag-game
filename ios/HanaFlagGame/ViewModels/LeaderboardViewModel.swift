import Foundation

@MainActor
final class LeaderboardViewModel: ObservableObject {
    @Published private(set) var entries: [LeaderboardEntry] = []
    @Published private(set) var isLoading = false
    @Published var filterMode: String? = nil
    @Published var showLeaderboard = false

    private var listener: (any Sendable)?

    func openLeaderboard() {
        showLeaderboard = true
        if entries.isEmpty { startListening() }
    }

    func startListening() {
        isLoading = true
        Task {
            do {
                let fetched = try await LeaderboardService.shared.fetchTopScores()
                self.entries = fetched
                self.isLoading = false
            } catch {
                self.isLoading = false
            }
        }
    }

    func save(name: String, gameVM: GameViewModel) async {
        let entry = LeaderboardEntry(
            id: UUID().uuidString,
            playerName: name,
            score: gameVM.score,
            correctCount: gameVM.correctCount,
            wrongCount: gameVM.wrongCount,
            totalAnswered: gameVM.totalAnswered,
            totalFlags: gameVM.totalFlags,
            gameMode: gameVM.config.mode.leaderboardKey,
            createdAt: Date(),
            elapsedMs: gameVM.elapsedMs,
            meanAnswerMs: gameVM.meanAnswerMs.map { Int($0) }
        )
        do {
            try await LeaderboardService.shared.saveScore(entry: entry)
            entries = [entry] + entries
            entries = Array(entries.prefix(50))
        } catch {}
    }

    var filteredEntries: [LeaderboardEntry] {
        guard let mode = filterMode else { return entries }
        return entries.filter { $0.gameMode.hasPrefix(mode) }
    }
}
