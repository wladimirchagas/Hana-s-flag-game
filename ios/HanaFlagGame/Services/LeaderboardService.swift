import Foundation
import FirebaseFirestore

final class LeaderboardService: ObservableObject {
    static let shared = LeaderboardService()
    private let db = Firestore.firestore()
    private let collection = "leaderboard"
    private init() {}

    func fetchTopScores(limit: Int = 50) async throws -> [LeaderboardEntry] {
        let query = db.collection(collection)
            .order(by: "score", descending: true)
            .limit(to: limit)
        let snapshot = try await query.getDocuments()
        return snapshot.documents.compactMap { decode(doc: $0) }
    }

    func saveScore(entry: LeaderboardEntry) async throws {
        var data: [String: Any] = [
            "playerName": entry.playerName,
            "score": entry.score,
            "correctCount": entry.correctCount,
            "wrongCount": entry.wrongCount,
            "totalAnswered": entry.totalAnswered,
            "totalFlags": entry.totalFlags,
            "gameMode": entry.gameMode,
            "createdAt": Timestamp(date: entry.createdAt)
        ]
        if let ms = entry.elapsedMs { data["elapsedMs"] = ms }
        if let ms = entry.meanAnswerMs { data["meanAnswerMs"] = ms }
        try await db.collection(collection).document(entry.id).setData(data)
    }

    func subscribeToLeaderboard(limit: Int = 50, onChange: @escaping ([LeaderboardEntry]) -> Void) -> ListenerRegistration {
        db.collection(collection)
            .order(by: "score", descending: true)
            .limit(to: limit)
            .addSnapshotListener { snapshot, _ in
                guard let snapshot else { return }
                let entries = snapshot.documents.compactMap { self.decode(doc: $0) }
                onChange(entries)
            }
    }

    private func decode(doc: QueryDocumentSnapshot) -> LeaderboardEntry? {
        let d = doc.data()
        guard let name = d["playerName"] as? String,
              let score = d["score"] as? Int
        else { return nil }
        let created = (d["createdAt"] as? Timestamp)?.dateValue() ?? Date()
        return LeaderboardEntry(
            id: doc.documentID,
            playerName: name,
            score: score,
            correctCount: (d["correctCount"] as? Int) ?? 0,
            wrongCount: (d["wrongCount"] as? Int) ?? 0,
            totalAnswered: (d["totalAnswered"] as? Int) ?? 0,
            totalFlags: (d["totalFlags"] as? Int) ?? 0,
            gameMode: (d["gameMode"] as? String) ?? "",
            createdAt: created,
            elapsedMs: d["elapsedMs"] as? Int,
            meanAnswerMs: d["meanAnswerMs"] as? Int
        )
    }
}
