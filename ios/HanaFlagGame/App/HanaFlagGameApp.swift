import SwiftUI
import FirebaseCore

@main
struct HanaFlagGameApp: App {
    @StateObject private var appVM = AppViewModel()
    @StateObject private var leaderboardVM = LeaderboardViewModel()

    init() {
        FirebaseApp.configure()
    }

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(appVM)
                .environmentObject(leaderboardVM)
                .preferredColorScheme(appVM.colorScheme)
        }
    }
}
