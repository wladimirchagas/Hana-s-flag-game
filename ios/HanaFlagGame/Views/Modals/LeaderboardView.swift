import SwiftUI

// MARK: - LeaderboardView

struct LeaderboardView: View {
    @EnvironmentObject var leaderboardVM: LeaderboardViewModel
    @Environment(\.colorScheme) var scheme
    @Environment(\.dismiss) var dismiss

    @State private var sortBy: SortOrder = .score

    private enum SortOrder: String, CaseIterable {
        case score    = "Score"
        case accuracy = "Accuracy"
    }

    private var sortedEntries: [LeaderboardEntry] {
        switch sortBy {
        case .score:
            return leaderboardVM.filteredEntries.sorted { $0.score > $1.score }
        case .accuracy:
            return leaderboardVM.filteredEntries.sorted { $0.accuracy > $1.accuracy }
        }
    }

    var body: some View {
        NavigationStack {
            ZStack {
                Color.flagGameBackground(scheme)
                    .ignoresSafeArea()

                VStack(spacing: 0) {
                    // Sort controls
                    sortPicker
                        .padding(.horizontal, 16)
                        .padding(.top, 10)
                        .padding(.bottom, 8)

                    Divider()
                        .background(Color.flagGameInk(scheme).opacity(0.1))

                    // Content
                    if leaderboardVM.isLoading {
                        loadingView
                    } else if sortedEntries.isEmpty {
                        emptyView
                    } else {
                        leaderboardList
                    }
                }
            }
            .navigationTitle("Leaderboard 🏆")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarBackground(Color.flagGameBackground(scheme), for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") { dismiss() }
                        .fredoka(17, weight: .semibold)
                        .foregroundColor(.mustard)
                }
                ToolbarItem(placement: .cancellationAction) {
                    Button {
                        leaderboardVM.startListening()
                    } label: {
                        Image(systemName: "arrow.clockwise")
                            .font(.system(size: 15, weight: .medium))
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.7))
                    }
                    .accessibilityLabel("Refresh")
                }
            }
            .onAppear {
                leaderboardVM.startListening()
            }
        }
    }

    // MARK: - Sort Picker

    private var sortPicker: some View {
        HStack(spacing: 8) {
            Text("Sort by:")
                .fredoka(14)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))

            ForEach(SortOrder.allCases, id: \.self) { order in
                Button {
                    withAnimation(.spring(response: 0.25, dampingFraction: 0.75)) {
                        sortBy = order
                    }
                } label: {
                    Text(order.rawValue)
                        .fredoka(14, weight: sortBy == order ? .semibold : .regular)
                        .foregroundColor(sortBy == order ? Color.inkFixed : Color.flagGameInk(scheme).opacity(0.65))
                        .padding(.horizontal, 14)
                        .padding(.vertical, 7)
                        .background(sortBy == order ? Color.mustard : Color.flagGamePaper(scheme))
                        .clipShape(Capsule())
                }
                .buttonStyle(.plain)
                .animation(.spring(response: 0.25, dampingFraction: 0.75), value: sortBy)
            }

            Spacer()
        }
    }

    // MARK: - Leaderboard List

    private var leaderboardList: some View {
        ScrollView(showsIndicators: false) {
            LazyVStack(spacing: 10) {
                ForEach(Array(sortedEntries.enumerated()), id: \.element.id) { idx, entry in
                    LeaderboardRowView(
                        rank: idx + 1,
                        entry: entry,
                        scheme: scheme
                    )
                }
            }
            .padding(16)
        }
    }

    // MARK: - Loading

    private var loadingView: some View {
        VStack(spacing: 14) {
            Spacer()
            ProgressView()
                .scaleEffect(1.3)
                .tint(Color.mustard)
            Text("Loading scores…")
                .fredoka(16)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
            Spacer()
        }
    }

    // MARK: - Empty

    private var emptyView: some View {
        VStack(spacing: 16) {
            Spacer()
            Text("🏆")
                .font(.system(size: 56))
            Text("No scores yet!")
                .fredoka(22, weight: .bold)
                .foregroundColor(Color.flagGameInk(scheme))
            Text("Complete a game and save your score to appear here.")
                .fredoka(15)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)
            Spacer()
        }
    }
}

// MARK: - LeaderboardRowView

private struct LeaderboardRowView: View {
    let rank: Int
    let entry: LeaderboardEntry
    let scheme: ColorScheme

    private var rankColor: Color {
        switch rank {
        case 1: return Color(red: 1.0, green: 0.843, blue: 0.0)   // gold
        case 2: return Color(red: 0.75, green: 0.75, blue: 0.75)  // silver
        case 3: return Color(red: 0.804, green: 0.498, blue: 0.196) // bronze
        default: return Color.flagGameInk(scheme).opacity(0.35)
        }
    }

    private var rankEmoji: String {
        switch rank {
        case 1: return "🥇"
        case 2: return "🥈"
        case 3: return "🥉"
        default: return "#\(rank)"
        }
    }

    private var formattedDate: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .none
        return formatter.string(from: entry.createdAt)
    }

    private var modeShortLabel: String {
        let key = entry.gameMode
        if key == "custom" { return "Hana's Game" }
        if key.hasPrefix("quiz-") { return "Quick Quiz" }
        if key == "all195" { return "All 195" }
        if key.hasPrefix("continent-") { return "Continent" }
        if key.hasPrefix("subregion-") { return "Sub-region" }
        if key.hasPrefix("similarity-") { return "Similarity" }
        return key
    }

    var body: some View {
        HStack(spacing: 14) {
            // Rank badge
            Group {
                if rank <= 3 {
                    Text(rankEmoji)
                        .font(.system(size: 24))
                        .frame(width: 36)
                } else {
                    Text("#\(rank)")
                        .fredoka(15, weight: .bold)
                        .foregroundColor(rankColor)
                        .frame(width: 36)
                }
            }

            // Player info
            VStack(alignment: .leading, spacing: 3) {
                Text(entry.playerName)
                    .fredoka(16, weight: .semibold)
                    .foregroundColor(Color.flagGameInk(scheme))
                    .lineLimit(1)

                HStack(spacing: 6) {
                    Text(modeShortLabel)
                        .fredoka(12)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.5))

                    Text("·")
                        .fredoka(12)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.3))

                    Text(formattedDate)
                        .fredoka(12)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.45))
                }
            }

            Spacer()

            // Score + accuracy
            VStack(alignment: .trailing, spacing: 3) {
                HStack(spacing: 3) {
                    Image(systemName: "star.fill")
                        .font(.system(size: 11))
                        .foregroundColor(.mustard)
                    Text("\(entry.score)")
                        .fredoka(22, weight: .bold)
                        .foregroundColor(Color.flagGameInk(scheme))
                }

                Text("\(Int(entry.accuracy.rounded()))% accuracy")
                    .fredoka(12)
                    .foregroundColor(entry.accuracy >= 70 ? Color.lime : Color.coral)
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .cardStyle(scheme: scheme)
    }
}

// MARK: - Preview

#Preview {
    LeaderboardView()
        .environmentObject(LeaderboardViewModel())
}
