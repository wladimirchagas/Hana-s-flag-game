import SwiftUI

// MARK: - QuickQuizSetupView

struct QuickQuizSetupView: View {
    let onStart: (Int) -> Void

    @Environment(\.colorScheme) var scheme
    @Environment(\.dismiss) var dismiss

    @State private var selectedCount: Int = 10

    private let flagCounts: [Int] = [5, 10, 20, 30]

    var body: some View {
        NavigationStack {
            ZStack {
                Color.flagGameBackground(scheme)
                    .ignoresSafeArea()

                VStack(spacing: 28) {
                    // Header icon + description
                    VStack(spacing: 12) {
                        ZStack {
                            Circle()
                                .fill(Color.mustard.opacity(0.18))
                                .frame(width: 72, height: 72)
                            Image(systemName: "bolt.fill")
                                .font(.system(size: 34, weight: .bold))
                                .foregroundColor(.mustard)
                        }

                        Text("Quick Quiz")
                            .fredoka(28, weight: .bold)
                            .foregroundColor(Color.flagGameInk(scheme))

                        Text("Test yourself on a random selection of flags. Pick your flag count and go!")
                            .fredoka(15)
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.65))
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 24)
                    }
                    .padding(.top, 8)

                    // Flag count picker
                    VStack(spacing: 14) {
                        Text("How many flags?")
                            .fredoka(17, weight: .semibold)
                            .foregroundColor(Color.flagGameInk(scheme))

                        HStack(spacing: 12) {
                            ForEach(flagCounts, id: \.self) { count in
                                FlagCountButton(
                                    count: count,
                                    isSelected: selectedCount == count,
                                    scheme: scheme
                                ) {
                                    selectedCount = count
                                }
                            }
                        }
                        .padding(.horizontal, 20)
                    }
                    .padding(.vertical, 20)
                    .cardStyle(scheme: scheme)
                    .padding(.horizontal, 24)

                    // Estimated time hint
                    HStack(spacing: 6) {
                        Image(systemName: "clock")
                            .font(.system(size: 13))
                        Text("About \(estimatedMinutes) min")
                            .fredoka(14)
                    }
                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.5))

                    Spacer()

                    // Start button
                    Button {
                        onStart(selectedCount)
                        dismiss()
                    } label: {
                        Text("Start \(selectedCount) flags  →")
                            .frame(maxWidth: .infinity)
                    }
                    .pillButton(color: .mustard, scheme: scheme)
                    .padding(.horizontal, 32)
                    .padding(.bottom, 32)
                }
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbarBackground(Color.flagGameBackground(scheme), for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                        .fredoka(16)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.7))
                }
            }
        }
    }

    private var estimatedMinutes: String {
        // ~8 seconds per flag on average
        let secs = selectedCount * 8
        let mins = secs / 60
        let rem  = secs % 60
        if mins == 0 { return "< 1" }
        if rem == 0  { return "\(mins)" }
        return "\(mins)–\(mins + 1)"
    }
}

// MARK: - FlagCountButton

private struct FlagCountButton: View {
    let count: Int
    let isSelected: Bool
    let scheme: ColorScheme
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                Text("\(count)")
                    .fredoka(26, weight: .bold)
                    .foregroundColor(isSelected ? Color.inkFixed : Color.flagGameInk(scheme))

                Text("flags")
                    .fredoka(12)
                    .foregroundColor(isSelected ? Color.inkFixed.opacity(0.75) : Color.flagGameInk(scheme).opacity(0.55))
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 14)
            .background(isSelected ? Color.mustard : Color.flagGameBackground(scheme))
            .clipShape(RoundedRectangle(cornerRadius: 14))
            .overlay(
                RoundedRectangle(cornerRadius: 14)
                    .stroke(
                        isSelected ? Color.clear : Color.flagGameInk(scheme).opacity(0.12),
                        lineWidth: 1.5
                    )
            )
            .animation(.spring(response: 0.25, dampingFraction: 0.7), value: isSelected)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Preview

#Preview {
    QuickQuizSetupView { count in
        print("Starting quiz with \(count) flags")
    }
}
