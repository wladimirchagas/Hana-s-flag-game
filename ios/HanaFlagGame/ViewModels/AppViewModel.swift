import SwiftUI
import Combine

final class AppViewModel: ObservableObject {
    @Published var colorScheme: ColorScheme? = nil

    private let themeKey = "flagGame.theme"
    private let selectedKey = "flagGame.selectedCountryOrder"
    private let learnedKey = "flagGame.learnedCodes"

    init() {
        loadTheme()
    }

    // MARK: - Theme

    func toggleTheme() {
        switch colorScheme {
        case .none:  colorScheme = .dark
        case .light: colorScheme = .dark
        case .dark:  colorScheme = .light
        @unknown default: colorScheme = .dark
        }
        saveTheme()
    }

    private func saveTheme() {
        switch colorScheme {
        case .dark:  UserDefaults.standard.set("dark", forKey: themeKey)
        case .light: UserDefaults.standard.set("light", forKey: themeKey)
        default:     UserDefaults.standard.removeObject(forKey: themeKey)
        }
    }

    private func loadTheme() {
        switch UserDefaults.standard.string(forKey: themeKey) {
        case "dark":  colorScheme = .dark
        case "light": colorScheme = .light
        default:      colorScheme = nil
        }
    }

    // MARK: - Country selection (Hana's Game)

    var selectedCountryCodes: [String] {
        get {
            (UserDefaults.standard.array(forKey: selectedKey) as? [String]) ?? []
        }
        set {
            UserDefaults.standard.set(newValue, forKey: selectedKey)
        }
    }

    func addCountry(_ code: String) {
        var codes = selectedCountryCodes
        if !codes.contains(code) { codes.append(code) }
        selectedCountryCodes = codes
    }

    func removeCountry(_ code: String) {
        selectedCountryCodes = selectedCountryCodes.filter { $0 != code }
    }

    func isSelected(_ code: String) -> Bool {
        selectedCountryCodes.contains(code)
    }

    // MARK: - Learned flags (daily unlock)

    var learnedCodes: [String] {
        get { (UserDefaults.standard.array(forKey: learnedKey) as? [String]) ?? [] }
        set { UserDefaults.standard.set(newValue, forKey: learnedKey) }
    }

    func markLearned(_ code: String) {
        var codes = learnedCodes
        if !codes.contains(code) { codes.append(code) }
        learnedCodes = codes
    }

    func isLearned(_ code: String) -> Bool {
        learnedCodes.contains(code)
    }

    // MARK: - Daily unlock

    var todaysDailyCode: String {
        let allCodes = Array(UN_MEMBER_CODES).sorted()
        let day = Calendar.current.ordinality(of: .day, in: .era, for: Date()) ?? 0
        return allCodes[day % allCodes.count]
    }
}
