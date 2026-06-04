import SwiftUI

// MARK: - AllFlagsSetupView

struct AllFlagsSetupView: View {
    let onStart: (GameMode) -> Void

    @Environment(\.colorScheme) var scheme
    @Environment(\.dismiss) var dismiss

    @State private var selectedTab: SetupTab = .all195
    @State private var selectedContinent: Continent? = nil
    @State private var selectedSubregion: String? = nil
    @State private var selectedGroup: SimilarityGroup? = nil
    @State private var hardcoreMode: Bool = false

    private enum SetupTab: String, CaseIterable {
        case all195     = "All 195"
        case continent  = "Continent"
        case subregion  = "Sub-region"
        case similarity = "Similarity"
    }

    // MARK: - Computed helpers

    private var allSubregions: [String] {
        let regions = STATIC_COUNTRIES.compactMap { $0.subregion }
        return Array(Set(regions)).sorted()
    }

    private func codesForContinent(_ continent: Continent) -> [String] {
        STATIC_COUNTRIES.filter { $0.continent == continent }.map { $0.code }
    }

    private func codesForSubregion(_ subregion: String) -> [String] {
        STATIC_COUNTRIES.filter { $0.subregion == subregion }.map { $0.code }
    }

    // MARK: - Body

    var body: some View {
        NavigationStack {
            ZStack {
                Color.flagGameBackground(scheme)
                    .ignoresSafeArea()

                VStack(spacing: 0) {
                    // Tab picker
                    tabPicker
                        .padding(.horizontal, 16)
                        .padding(.top, 12)
                        .padding(.bottom, 8)

                    Divider()
                        .background(Color.flagGameInk(scheme).opacity(0.1))

                    // Tab content
                    ScrollView(showsIndicators: false) {
                        VStack(spacing: 20) {
                            tabContent
                        }
                        .padding(20)
                    }

                    Divider()
                        .background(Color.flagGameInk(scheme).opacity(0.1))

                    // Start button
                    startButton
                        .padding(.horizontal, 24)
                        .padding(.vertical, 16)
                }
            }
            .navigationTitle("Flag Master")
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

    // MARK: - Tab Picker

    private var tabPicker: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(SetupTab.allCases, id: \.self) { tab in
                    Button {
                        withAnimation(.spring(response: 0.3, dampingFraction: 0.75)) {
                            selectedTab = tab
                        }
                    } label: {
                        Text(tab.rawValue)
                            .fredoka(15, weight: selectedTab == tab ? .semibold : .regular)
                            .foregroundColor(selectedTab == tab ? Color.inkFixed : Color.flagGameInk(scheme).opacity(0.65))
                            .padding(.horizontal, 16)
                            .padding(.vertical, 8)
                            .background(selectedTab == tab ? Color.sky : Color.flagGamePaper(scheme))
                            .clipShape(Capsule())
                            .overlay(
                                Capsule().stroke(
                                    selectedTab == tab ? Color.clear : Color.flagGameInk(scheme).opacity(0.12),
                                    lineWidth: 1
                                )
                            )
                    }
                    .buttonStyle(.plain)
                    .animation(.spring(response: 0.25, dampingFraction: 0.7), value: selectedTab)
                }
            }
        }
    }

    // MARK: - Tab Content

    @ViewBuilder
    private var tabContent: some View {
        switch selectedTab {
        case .all195:
            all195Tab
        case .continent:
            continentTab
        case .subregion:
            subregionTab
        case .similarity:
            similarityTab
        }
    }

    // MARK: - All 195 Tab

    private var all195Tab: some View {
        VStack(spacing: 16) {
            ZStack {
                Circle()
                    .fill(Color.sky.opacity(0.18))
                    .frame(width: 72, height: 72)
                Text("🌍")
                    .font(.system(size: 38))
            }

            Text("All 195 Countries")
                .fredoka(22, weight: .bold)
                .foregroundColor(Color.flagGameInk(scheme))

            Text("The full global challenge — every UN member state and observer. 195 flags, no mercy.")
                .fredoka(15)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.65))
                .multilineTextAlignment(.center)

            HStack(spacing: 20) {
                statBadge(value: "195", label: "Flags", color: .sky)
                statBadge(value: "5", label: "Continents", color: .lime)
                statBadge(value: "All", label: "Difficulties", color: .coral)
            }
        }
        .padding(.vertical, 8)
    }

    // MARK: - Continent Tab

    private var continentTab: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Choose a continent")
                .fredoka(17, weight: .semibold)
                .foregroundColor(Color.flagGameInk(scheme))

            ForEach(Continent.allCases, id: \.self) { continent in
                let codes = codesForContinent(continent)
                ContinentOptionRow(
                    continent: continent,
                    countryCount: codes.count,
                    isSelected: selectedContinent == continent,
                    scheme: scheme
                ) {
                    selectedContinent = continent
                }
            }
        }
    }

    // MARK: - Sub-region Tab

    private var subregionTab: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Choose a sub-region")
                .fredoka(17, weight: .semibold)
                .foregroundColor(Color.flagGameInk(scheme))

            ForEach(allSubregions, id: \.self) { subregion in
                let codes = codesForSubregion(subregion)
                SubregionOptionRow(
                    subregion: subregion,
                    countryCount: codes.count,
                    isSelected: selectedSubregion == subregion,
                    scheme: scheme
                ) {
                    selectedSubregion = subregion
                }
            }
        }
    }

    // MARK: - Similarity Tab

    private var similarityTab: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Choose a similarity group")
                .fredoka(17, weight: .semibold)
                .foregroundColor(Color.flagGameInk(scheme))

            // Hardcore toggle
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Hardcore mode")
                        .fredoka(15, weight: .semibold)
                        .foregroundColor(Color.flagGameInk(scheme))
                    Text("All 195 flags as alternatives")
                        .fredoka(13)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                }
                Spacer()
                Toggle("", isOn: $hardcoreMode)
                    .tint(.coral)
            }
            .padding(14)
            .background(Color.flagGamePaper(scheme))
            .clipShape(RoundedRectangle(cornerRadius: 14))

            ForEach(FLAG_SIMILARITY_GROUPS) { group in
                SimilarityGroupRow(
                    group: group,
                    isSelected: selectedGroup?.id == group.id,
                    scheme: scheme
                ) {
                    selectedGroup = group
                }
            }
        }
    }

    // MARK: - Start Button

    private var startButton: some View {
        Button {
            if let mode = buildGameMode() {
                onStart(mode)
                dismiss()
            }
        } label: {
            Text(startButtonLabel)
                .frame(maxWidth: .infinity)
        }
        .pillButton(color: .lime, scheme: scheme)
        .opacity(canStart ? 1.0 : 0.4)
        .disabled(!canStart)
    }

    private var startButtonLabel: String {
        switch selectedTab {
        case .all195:
            return "Start — All 195 Flags"
        case .continent:
            if let c = selectedContinent {
                let n = codesForContinent(c).count
                return "Start — \(c.rawValue) (\(n))"
            }
            return "Select a continent"
        case .subregion:
            if let s = selectedSubregion {
                let n = codesForSubregion(s).count
                return "Start — \(s) (\(n))"
            }
            return "Select a sub-region"
        case .similarity:
            if let g = selectedGroup {
                return "Start — \(g.label)\(hardcoreMode ? " · HC" : "")"
            }
            return "Select a group"
        }
    }

    private var canStart: Bool {
        switch selectedTab {
        case .all195:    return true
        case .continent: return selectedContinent != nil
        case .subregion: return selectedSubregion != nil
        case .similarity: return selectedGroup != nil
        }
    }

    private func buildGameMode() -> GameMode? {
        switch selectedTab {
        case .all195:
            return .all195
        case .continent:
            guard let c = selectedContinent else { return nil }
            return .continent(codes: codesForContinent(c), label: c.rawValue)
        case .subregion:
            guard let s = selectedSubregion else { return nil }
            return .subregion(codes: codesForSubregion(s), label: s)
        case .similarity:
            guard let g = selectedGroup else { return nil }
            return .similarity(codes: g.codes, label: g.label, hardcore: hardcoreMode)
        }
    }

    // MARK: - Helpers

    private func statBadge(value: String, label: String, color: Color) -> some View {
        VStack(spacing: 3) {
            Text(value)
                .fredoka(20, weight: .bold)
                .foregroundColor(color)
            Text(label)
                .fredoka(12)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 10)
        .background(color.opacity(0.1))
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

// MARK: - ContinentOptionRow

private struct ContinentOptionRow: View {
    let continent: Continent
    let countryCount: Int
    let isSelected: Bool
    let scheme: ColorScheme
    let action: () -> Void

    private var accentColor: Color {
        switch continent {
        case .africa:   return .coral
        case .americas: return .sky
        case .asia:     return .mustard
        case .europe:   return .lime
        case .oceania:  return .pink
        }
    }

    var body: some View {
        Button(action: action) {
            HStack(spacing: 14) {
                ZStack {
                    Circle()
                        .fill(accentColor.opacity(isSelected ? 0.25 : 0.12))
                        .frame(width: 40, height: 40)
                    Text(continent.emoji)
                        .font(.system(size: 20))
                }

                VStack(alignment: .leading, spacing: 2) {
                    Text(continent.rawValue)
                        .fredoka(16, weight: .semibold)
                        .foregroundColor(Color.flagGameInk(scheme))
                    Text("\(countryCount) countries")
                        .fredoka(13)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                }

                Spacer()

                if isSelected {
                    Image(systemName: "checkmark.circle.fill")
                        .font(.system(size: 22))
                        .foregroundColor(accentColor)
                } else {
                    Circle()
                        .stroke(Color.flagGameInk(scheme).opacity(0.2), lineWidth: 1.5)
                        .frame(width: 22, height: 22)
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .background(isSelected ? accentColor.opacity(0.08) : Color.flagGamePaper(scheme))
            .clipShape(RoundedRectangle(cornerRadius: 14))
            .overlay(
                RoundedRectangle(cornerRadius: 14)
                    .stroke(isSelected ? accentColor.opacity(0.5) : Color.clear, lineWidth: 1.5)
            )
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .animation(.spring(response: 0.25, dampingFraction: 0.75), value: isSelected)
    }
}

// MARK: - SubregionOptionRow

private struct SubregionOptionRow: View {
    let subregion: String
    let countryCount: Int
    let isSelected: Bool
    let scheme: ColorScheme
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                Text(subregion)
                    .fredoka(15, weight: isSelected ? .semibold : .regular)
                    .foregroundColor(Color.flagGameInk(scheme))

                Spacer()

                Text("\(countryCount)")
                    .fredoka(13)
                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.5))

                if isSelected {
                    Image(systemName: "checkmark.circle.fill")
                        .font(.system(size: 20))
                        .foregroundColor(.sky)
                } else {
                    Circle()
                        .stroke(Color.flagGameInk(scheme).opacity(0.2), lineWidth: 1.5)
                        .frame(width: 20, height: 20)
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 11)
            .background(isSelected ? Color.sky.opacity(0.1) : Color.flagGamePaper(scheme))
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(isSelected ? Color.sky.opacity(0.5) : Color.clear, lineWidth: 1.5)
            )
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .animation(.spring(response: 0.25, dampingFraction: 0.75), value: isSelected)
    }
}

// MARK: - SimilarityGroupRow

private struct SimilarityGroupRow: View {
    let group: SimilarityGroup
    let isSelected: Bool
    let scheme: ColorScheme
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                // Mini flag strip
                HStack(spacing: 2) {
                    ForEach(group.codes.prefix(3), id: \.self) { code in
                        FlagImageView(code: code, size: 18, cornerRadius: 3)
                    }
                    if group.codes.count > 3 {
                        Text("+\(group.codes.count - 3)")
                            .fredoka(11)
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                    }
                }
                .frame(minWidth: 78, alignment: .leading)

                VStack(alignment: .leading, spacing: 2) {
                    Text(group.label)
                        .fredoka(15, weight: isSelected ? .semibold : .regular)
                        .foregroundColor(Color.flagGameInk(scheme))
                        .lineLimit(1)
                    Text("\(group.codes.count) flags")
                        .fredoka(12)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.5))
                }

                Spacer()

                if isSelected {
                    Image(systemName: "checkmark.circle.fill")
                        .font(.system(size: 20))
                        .foregroundColor(.mustard)
                } else {
                    Circle()
                        .stroke(Color.flagGameInk(scheme).opacity(0.2), lineWidth: 1.5)
                        .frame(width: 20, height: 20)
                }
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 10)
            .background(isSelected ? Color.mustard.opacity(0.1) : Color.flagGamePaper(scheme))
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(isSelected ? Color.mustard.opacity(0.5) : Color.clear, lineWidth: 1.5)
            )
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .animation(.spring(response: 0.25, dampingFraction: 0.75), value: isSelected)
    }
}

// MARK: - Preview

#Preview {
    AllFlagsSetupView { mode in
        print("Starting: \(mode.displayLabel)")
    }
}
