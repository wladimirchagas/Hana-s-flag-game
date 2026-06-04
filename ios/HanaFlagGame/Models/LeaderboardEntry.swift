import Foundation

struct LeaderboardEntry: Identifiable, Codable {
    let id: String
    let playerName: String
    let score: Int
    let correctCount: Int
    let wrongCount: Int
    let totalAnswered: Int
    let totalFlags: Int
    let gameMode: String
    let createdAt: Date
    var elapsedMs: Int?
    var meanAnswerMs: Int?

    var accuracy: Double {
        guard totalAnswered > 0 else { return 0 }
        return Double(correctCount) / Double(totalAnswered) * 100.0
    }
}
