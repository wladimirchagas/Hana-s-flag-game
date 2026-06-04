import SwiftUI

struct RootView: View {
    @EnvironmentObject var appVM: AppViewModel
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            LandingView(path: $path)
                .navigationDestination(for: GameRoute.self) { route in
                    GameView(config: route.config, path: $path)
                }
                .navigationDestination(for: LearnRoute.self) { _ in
                    LearnView(path: $path)
                }
        }
        .tint(Color.mustard)
    }
}

struct GameRoute: Hashable {
    let config: GameConfig
}

struct LearnRoute: Hashable {}
