import SwiftUI
import FirebaseCore

@main
struct HanaFlagGameApp: App {
    @StateObject private var appVM = AppViewModel()
    @StateObject private var leaderboardVM = LeaderboardViewModel()

    init() {
        if Bundle.main.path(forResource: "GoogleService-Info", ofType: "plist") != nil {
            FirebaseApp.configure()
        }
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
