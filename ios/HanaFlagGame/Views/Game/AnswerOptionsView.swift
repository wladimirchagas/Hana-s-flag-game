import SwiftUI

// MARK: - AnswerOptionsView

/// Renders answer choices either as a 2-column button grid (≤ 10 options) or
/// as a searchable text-field + filtered list (> 10 options).
struct AnswerOptionsView: View {
    let alternatives: [Country]
    @Binding var selected: Country?
    let phase: GamePhase
    let currentCountry: Country?

    @Environment(\.colorScheme) var scheme

    var body: some View {
        if alternatives.count <= 10 {
            buttonGrid
        } else {
            searchDropdown
        }
    }

    // MARK: - Button grid

    private let columns = [
        GridItem(.flexible(), spacing: 10),
        GridItem(.flexible(), spacing: 10)
    ]

    private var buttonGrid: some View {
        LazyVGrid(columns: columns, spacing: 10) {
            ForEach(alternatives) { country in
                AnswerButton(
                    country: country,
                    isSelected: selected?.code == country.code,
                    phase: phase,
                    correctCode: currentCountry?.code
                ) {
                    if case .guessing = phase {
                        selected = country
                    }
                }
            }
        }
    }

    // MARK: - Search dropdown

    @State private var query: String = ""
    @State private var isExpanded: Bool = false

    private var filtered: [Country] {
        if query.isEmpty { return Array(alternatives.prefix(40)) }
        let q = query.lowercased()
        return alternatives.filter { $0.name.lowercased().contains(q) }
    }

    private var searchDropdown: some View {
        VStack(spacing: 0) {
            // Text field
            HStack(spacing: 10) {
                Image(systemName: "magnifyingglass")
                    .foregroundColor(Color.flagGameInk(scheme).opacity(0.45))

                if let sel = selected, query.isEmpty {
                    Text(sel.name)
                        .fredoka(16)
                        .foregroundColor(Color.flagGameInk(scheme))
                } else {
                    TextField("Type a country name…", text: $query)
                        .fredoka(16)
                        .foregroundColor(Color.flagGameInk(scheme))
                        .onTapGesture { isExpanded = true }
                        .onChange(of: query) { _ in isExpanded = !query.isEmpty }
                        .disabled(phase != .guessing)
                }

                if selected != nil || !query.isEmpty {
                    Button {
                        selected = nil
                        query = ""
                        isExpanded = false
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.4))
                    }
                }
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 12)
            .background(Color.flagGamePaper(scheme))
            .clipShape(RoundedRectangle(cornerRadius: 14))
            .overlay(
                RoundedRectangle(cornerRadius: 14)
                    .stroke(
                        selected != nil ? buttonStroke(for: selected!) : Color.flagGameInk(scheme).opacity(0.15),
                        lineWidth: selected != nil ? 2 : 1
                    )
            )

            // Dropdown list
            if isExpanded && !filtered.isEmpty && phase == .guessing {
                ScrollView(showsIndicators: true) {
                    VStack(spacing: 0) {
                        ForEach(filtered.prefix(30)) { country in
                            Button {
                                selected = country
                                query = ""
                                isExpanded = false
                            } label: {
                                HStack(spacing: 10) {
                                    FlagImageView(code: country.code, size: 28, cornerRadius: 4)
                                    Text(country.name)
                                        .fredoka(15)
                                        .foregroundColor(Color.flagGameInk(scheme))
                                    Spacer()
                                }
                                .padding(.horizontal, 14)
                                .padding(.vertical, 9)
                            }
                            .buttonStyle(.plain)

                            Divider()
                                .background(Color.flagGameInk(scheme).opacity(0.08))
                                .padding(.horizontal, 14)
                        }
                    }
                }
                .frame(maxHeight: 240)
                .background(Color.flagGamePaper(scheme))
                .clipShape(RoundedRectangle(cornerRadius: 14))
                .stickerShadow()
                .padding(.top, 4)
            }
        }
    }

    // MARK: - Helpers

    private func buttonStroke(for country: Country) -> Color {
        switch phase {
        case .revealed(let wasCorrect):
            if country.code == currentCountry?.code { return .lime }
            if !wasCorrect && country.code == selected?.code { return .coral }
            return Color.flagGameInk(scheme).opacity(0.15)
        default:
            return .mustard
        }
    }
}

// MARK: - AnswerButton

private struct AnswerButton: View {
    let country: Country
    let isSelected: Bool
    let phase: GamePhase
    let correctCode: String?
    let action: () -> Void

    @Environment(\.colorScheme) var scheme

    private var backgroundColor: Color {
        switch phase {
        case .revealed(let wasCorrect):
            if country.code == correctCode {
                return .lime
            }
            if !wasCorrect && isSelected {
                return .coral
            }
            return Color.flagGamePaper(scheme)
        default:
            return isSelected ? .mustard : Color.flagGamePaper(scheme)
        }
    }

    private var textColor: Color {
        switch phase {
        case .revealed(let wasCorrect):
            if country.code == correctCode || (!wasCorrect && isSelected) {
                return Color.inkFixed
            }
            return Color.flagGameInk(scheme)
        default:
            return isSelected ? Color.inkFixed : Color.flagGameInk(scheme)
        }
    }

    private var isDisabled: Bool {
        if case .guessing = phase { return false }
        return true
    }

    var body: some View {
        Button(action: action) {
            Text(country.name)
                .fredoka(14, weight: .medium)
                .foregroundColor(textColor)
                .multilineTextAlignment(.center)
                .lineLimit(2)
                .minimumScaleFactor(0.8)
                .padding(.horizontal, 8)
                .padding(.vertical, 12)
                .frame(maxWidth: .infinity, minHeight: 52)
                .background(backgroundColor)
                .clipShape(RoundedRectangle(cornerRadius: 14))
                .overlay(
                    RoundedRectangle(cornerRadius: 14)
                        .stroke(
                            isSelected ? Color.inkFixed.opacity(0.25) : Color.flagGameInk(scheme).opacity(0.12),
                            lineWidth: 1.5
                        )
                )
        }
        .buttonStyle(.plain)
        .disabled(isDisabled)
        .animation(.easeInOut(duration: 0.15), value: isSelected)
    }
}

// MARK: - Preview

#Preview {
    let countries = Array(STATIC_COUNTRIES.prefix(6))
    VStack(spacing: 20) {
        AnswerOptionsView(
            alternatives: countries,
            selected: .constant(countries[0]),
            phase: .guessing,
            currentCountry: countries[0]
        )
        AnswerOptionsView(
            alternatives: countries,
            selected: .constant(countries[1]),
            phase: .revealed(wasCorrect: false),
            currentCountry: countries[0]
        )
    }
    .padding()
    .background(Color.flagGameBackground(.light))
    .environmentObject(AppViewModel())
}
