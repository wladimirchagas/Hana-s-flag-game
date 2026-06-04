import Foundation
import Combine

enum GamePhase: Equatable {
    case loading
    case error(String)
    case guessing
    case revealed(wasCorrect: Bool)
    case finished
}

struct ContinentStats {
    let continent: Continent
    var countriesInGame: Int = 0
    var correct: Int = 0
    var wrong: Int = 0
    var total: Int { correct + wrong }
    var correctPct: Double { total > 0 ? Double(correct) / Double(total) * 100.0 : 0 }
    var wrongPct: Double { total > 0 ? Double(wrong) / Double(total) * 100.0 : 0 }
}

@MainActor
final class GameViewModel: ObservableObject {
    // MARK: - Published state
    @Published private(set) var phase: GamePhase = .loading
    @Published private(set) var countries: [Country] = []
    @Published private(set) var current: Country? = nil
    @Published var selected: Country? = nil
    @Published private(set) var score: Int = 0
    @Published private(set) var correctCount: Int = 0
    @Published private(set) var wrongCount: Int = 0
    @Published private(set) var countryResults: [String: Bool] = [:]  // true = correct
    @Published private(set) var questionAlternatives: [Country] = []
    @Published private(set) var retryAttempts: Int = 0
    @Published private(set) var attemptNonce: Int = 0
    @Published private(set) var gameStartedAt: Date? = nil
    @Published private(set) var gameEndedAt: Date? = nil
    @Published private(set) var meanAnswerMs: Double? = nil
    @Published private(set) var continentBreakdown: [ContinentStats] = []

    // MARK: - Config
    let config: GameConfig
    private let maxAttemptsPerFlag: Int
    private var allCountries: [Country] = []

    // MARK: - Private state
    private var asked: Set<String> = []
    private var usedDistractors: Set<String> = []
    private var roundStartedAt: Date = Date()
    private var answerDurations: [Double] = []
    private var loadTask: Task<Void, Never>?

    init(config: GameConfig) {
        self.config = config
        self.maxAttemptsPerFlag = config.mode.allowsRetry ? 3 : Int.max
    }

    // MARK: - Lifecycle

    func load() {
        loadTask?.cancel()
        loadTask = Task {
            await performLoad()
        }
    }

    private func performLoad() async {
        phase = .loading
        let service = CountryService.shared
        if service.countries.isEmpty {
            await service.loadIfNeeded()
        }
        let all = service.countries
        guard !all.isEmpty else {
            phase = .error("Failed to load countries. Please check your internet connection.")
            return
        }
        allCountries = all

        var gamePool: [Country]

        switch config.mode {
        case .hana:
            let codes = (config.selectedCodes ?? []).map { $0.uppercased() }
            if codes.isEmpty {
                phase = .error("No countries selected for Hana's Game. Add some countries first!")
                return
            }
            let codeSet = Set(codes)
            // Preserve order from the selected codes list
            let lookup = Dictionary(uniqueKeysWithValues: all.map { ($0.code, $0) })
            gamePool = codes.compactMap { lookup[$0] }
            if gamePool.isEmpty {
                phase = .error("None of the selected countries are available.")
                return
            }

        case .quickQuiz(let flagCount):
            var shuffled = all
            shuffled.shuffle()
            gamePool = Array(shuffled.prefix(min(flagCount, shuffled.count)))

        case .all195:
            gamePool = all

        case .continent(let codes, _), .subregion(let codes, _):
            let codeSet = Set(codes.map { $0.uppercased() })
            gamePool = all.filter { codeSet.contains($0.code) }

        case .similarity(let codes, _, _):
            let codeSet = Set(codes.map { $0.uppercased() })
            gamePool = all.filter { codeSet.contains($0.code) }

        case .subnational:
            phase = .error("Subnational game not yet supported in this mode.")
            return
        }

        if gamePool.isEmpty {
            phase = .error("No countries found for this game mode.")
            return
        }

        countries = gamePool
        asked = []
        score = 0
        correctCount = 0
        wrongCount = 0
        countryResults = [:]
        answerDurations = []
        gameStartedAt = nil
        gameEndedAt = nil
        meanAnswerAt = nil
        resetContinentBreakdown()
        startNextRound()
    }

    // MARK: - Round management

    private func startNextRound() {
        if gameStartedAt == nil { gameStartedAt = Date() }

        if asked.count >= countries.count {
            asked = []
            usedDistractors = []
        }

        let pool = countries.filter { !asked.contains($0.code) }
        let pickFrom = pool.isEmpty ? countries : pool
        guard let next = pickFrom.randomElement() else { return }

        asked.insert(next.code)
        roundStartedAt = Date()
        current = next
        selected = nil
        retryAttempts = 0
        questionAlternatives = buildAlternatives(for: next)
        phase = .guessing
    }

    private func buildAlternatives(for country: Country) -> [Country] {
        let useFullPool = config.mode.useFullAlternatives
        let basePool = useFullPool ? allCountries : countries

        // In quiz mode, use same-difficulty distractors
        if case .quickQuiz = config.mode {
            return buildQuizAlternatives(for: country, pool: basePool)
        }

        return basePool
    }

    private func buildQuizAlternatives(for country: Country, pool: [Country]) -> [Country] {
        // For quiz modes with small pools, just return the whole pool
        let optionCount = min(countries.count, 30)
        if optionCount <= 0 { return pool }
        if pool.count <= optionCount { return pool.sorted { $0.name < $1.name } }

        let difficulty = difficultyOf(country.code)
        let sameBucket = codesForDifficulty(difficulty)
        var candidates = pool.filter { $0.code != country.code && sameBucket.contains($0.code) }

        if candidates.count < optionCount - 1 {
            let fallback = pool.filter { $0.code != country.code }
            let seen = Set(candidates.map { $0.code })
            for c in fallback where !seen.contains(c.code) {
                candidates.append(c)
            }
        }

        let fresh = candidates.filter { !usedDistractors.contains($0.code) }
        var pickFrom = fresh.count >= optionCount - 1 ? fresh : candidates
        pickFrom.shuffle()
        let distractors = Array(pickFrom.prefix(max(0, optionCount - 1)))
        distractors.forEach { usedDistractors.insert($0.code) }

        var result = [country] + distractors
        result.sort { $0.name < $1.name }
        return result
    }

    // MARK: - Game actions

    func confirm() {
        guard case .guessing = phase, let current, let selected else { return }
        let isCorrect = selected.code == current.code

        attemptNonce += 1
        score += isCorrect ? 1 : -1

        if !isCorrect && config.mode.allowsRetry {
            let next = retryAttempts + 1
            if next < maxAttemptsPerFlag {
                retryAttempts = next
                self.selected = nil
                AudioService.shared.playWrong()
                HapticService.shared.wrong()
                return
            }
        }

        let duration = Date().timeIntervalSince(roundStartedAt) * 1000
        answerDurations.append(duration)
        countryResults[current.code] = isCorrect

        if isCorrect {
            correctCount += 1
            AudioService.shared.playCorrect()
            HapticService.shared.correct()
        } else {
            wrongCount += 1
            AudioService.shared.playWrong()
            HapticService.shared.wrong()
        }

        updateContinentBreakdown(for: current, correct: isCorrect)
        meanAnswerMs = answerDurations.isEmpty ? nil : answerDurations.reduce(0, +) / Double(answerDurations.count)

        let isFinished = asked.count >= countries.count
        if isFinished {
            gameEndedAt = Date()
            phase = .finished
            AudioService.shared.playCelebration()
            HapticService.shared.celebrate()
        } else {
            phase = .revealed(wasCorrect: isCorrect)
            if !config.mode.allowsRetry {
                scheduleAutoAdvance()
            } else {
                scheduleAutoAdvanceHana()
            }
        }
    }

    private var autoAdvanceTask: Task<Void, Never>?

    private func scheduleAutoAdvance() {
        autoAdvanceTask?.cancel()
        autoAdvanceTask = Task {
            try? await Task.sleep(nanoseconds: 1_500_000_000) // 1.5s
            guard !Task.isCancelled else { return }
            if case .revealed = phase { startNextRound() }
        }
    }

    private func scheduleAutoAdvanceHana() {
        autoAdvanceTask?.cancel()
        autoAdvanceTask = Task {
            try? await Task.sleep(nanoseconds: 3_200_000_000) // 3.2s
            guard !Task.isCancelled else { return }
            if case .revealed = phase { startNextRound() }
        }
    }

    func next() {
        guard case .revealed = phase else { return }
        autoAdvanceTask?.cancel()
        startNextRound()
    }

    func endEarly() {
        if case .loading = phase { return }
        if case .error = phase { return }
        if case .finished = phase { return }
        autoAdvanceTask?.cancel()
        if gameEndedAt == nil { gameEndedAt = Date() }
        phase = .finished
    }

    // MARK: - Helpers

    private var meanAnswerAt: Double? {
        get { meanAnswerMs }
        set { meanAnswerMs = newValue }
    }

    private func resetContinentBreakdown() {
        var stats: [ContinentStats] = []
        for continent in Continent.allCases {
            var s = ContinentStats(continent: continent)
            s.countriesInGame = countries.filter { $0.continent == continent }.count
            stats.append(s)
        }
        continentBreakdown = stats
    }

    private func updateContinentBreakdown(for country: Country, correct: Bool) {
        if let idx = continentBreakdown.firstIndex(where: { $0.continent == country.continent }) {
            if correct {
                continentBreakdown[idx].correct += 1
            } else {
                continentBreakdown[idx].wrong += 1
            }
        }
    }

    var totalAnswered: Int { correctCount + wrongCount }
    var totalFlags: Int { countries.count }
    var elapsedMs: Int? {
        guard let start = gameStartedAt else { return nil }
        let end = gameEndedAt ?? Date()
        return Int(end.timeIntervalSince(start) * 1000)
    }
    var remainingCount: Int { max(0, countries.count - asked.count) }
}
