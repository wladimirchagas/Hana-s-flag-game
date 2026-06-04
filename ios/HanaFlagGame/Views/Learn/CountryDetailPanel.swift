import SwiftUI

// MARK: - CountryDetailPanel

/// Displays detailed information about a selected modern country or historical polity.
struct CountryDetailPanel: View {
    var country: Country? = nil
    var polity: HistoricalPolity? = nil

    @EnvironmentObject var appVM: AppViewModel
    @Environment(\.colorScheme) var scheme

    var body: some View {
        ScrollView(showsIndicators: false) {
            if let country = country {
                ModernCountryDetail(country: country)
                    .environmentObject(appVM)
            } else if let polity = polity {
                HistoricalPolityDetail(polity: polity)
            } else {
                EmptySelectionView()
            }
        }
    }
}

// MARK: - ModernCountryDetail

private struct ModernCountryDetail: View {
    let country: Country

    @EnvironmentObject var appVM: AppViewModel
    @Environment(\.colorScheme) var scheme

    // MARK: Helpers

    private func formattedPopulation(_ pop: Int) -> String {
        let d = Double(pop)
        switch d {
        case 1_000_000_000...:
            return String(format: "%.1f B", d / 1_000_000_000)
        case 1_000_000...:
            return String(format: "%.1f M", d / 1_000_000)
        case 1_000...:
            return String(format: "%.1f K", d / 1_000)
        default:
            return "\(pop)"
        }
    }

    private var hasAnthem: Bool {
        NATIONAL_ANTHEM_WIKI_FILES[country.code.uppercased()] != nil
    }

    private var officialNameDifferent: Bool {
        guard let official = country.nameOfficial else { return false }
        return official != country.name
    }

    // MARK: Body

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {

            // Flag + name header
            HStack(alignment: .center, spacing: 14) {
                FlagImageView(code: country.code, size: 80)
                    .stickerShadow()

                VStack(alignment: .leading, spacing: 4) {
                    Text(country.name)
                        .fredoka(24, weight: .bold)
                        .foregroundColor(Color.flagGameInk(scheme))
                        .lineLimit(2)
                        .minimumScaleFactor(0.8)

                    if officialNameDifferent, let official = country.nameOfficial {
                        Text(official)
                            .fredoka(13)
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                            .lineLimit(2)
                    }

                    // Learned badge
                    if appVM.isLearned(country.code) {
                        HStack(spacing: 4) {
                            Image(systemName: "checkmark.seal.fill")
                                .font(.system(size: 11, weight: .semibold))
                            Text("Learned")
                                .fredoka(12, weight: .semibold)
                        }
                        .foregroundColor(Color.lime)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3)
                        .background(Color.lime.opacity(0.15))
                        .clipShape(Capsule())
                    }
                }
                Spacer(minLength: 0)
            }

            Divider()
                .background(Color.flagGameInk(scheme).opacity(0.1))

            // Facts grid
            VStack(alignment: .leading, spacing: 10) {
                if let capital = country.capital {
                    factRow(icon: "building.columns.fill", label: "Capital", value: capital)
                }
                if let pop = country.population {
                    factRow(icon: "person.3.fill", label: "Population", value: formattedPopulation(pop))
                }
                if let sub = country.subregion {
                    factRow(icon: "map.fill", label: "Region", value: sub)
                }
            }

            // Languages
            if let langs = country.languages, !langs.isEmpty {
                VStack(alignment: .leading, spacing: 6) {
                    Label {
                        Text("Languages")
                            .fredoka(13, weight: .semibold)
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.65))
                    } icon: {
                        Image(systemName: "character.bubble.fill")
                            .font(.system(size: 12))
                            .foregroundColor(Color.sky)
                    }
                    FlowTagsView(tags: langs, color: Color.sky)
                }
            }

            // Currencies
            if let currencies = country.currencies, !currencies.isEmpty {
                VStack(alignment: .leading, spacing: 6) {
                    Label {
                        Text("Currencies")
                            .fredoka(13, weight: .semibold)
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.65))
                    } icon: {
                        Image(systemName: "dollarsign.circle.fill")
                            .font(.system(size: 12))
                            .foregroundColor(Color.mustard)
                    }
                    FlowTagsView(
                        tags: currencies.map {
                            "\($0.name)" + ($0.symbol.map { " (\($0))" } ?? "") + " [\($0.code)]"
                        },
                        color: Color.mustard
                    )
                }
            }

            // Anthem player
            if hasAnthem {
                AnthemPlayerView(countryCode: country.code)
            }

            Divider()
                .background(Color.flagGameInk(scheme).opacity(0.1))

            // Game controls
            HStack(spacing: 10) {
                // Add/Remove toggle
                let isAdded = appVM.isSelected(country.code)
                Button {
                    if isAdded {
                        appVM.removeCountry(country.code)
                    } else {
                        appVM.addCountry(country.code)
                    }
                } label: {
                    HStack(spacing: 6) {
                        Image(systemName: isAdded ? "minus.circle.fill" : "plus.circle.fill")
                            .font(.system(size: 15, weight: .semibold))
                        Text(isAdded ? "Remove from Game" : "Add to Hana's Game")
                            .fredoka(14, weight: .semibold)
                            .lineLimit(1)
                            .minimumScaleFactor(0.8)
                    }
                    .foregroundColor(Color.inkFixed)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 9)
                    .frame(maxWidth: .infinity)
                    .background(isAdded ? Color.coral : Color.lime)
                    .clipShape(Capsule())
                    .stickerShadow()
                }
                .accessibilityLabel(isAdded ? "Remove \(country.name) from Hana's Game" : "Add \(country.name) to Hana's Game")

                // Mark Learned
                if !appVM.isLearned(country.code) {
                    Button {
                        appVM.markLearned(country.code)
                    } label: {
                        HStack(spacing: 6) {
                            Image(systemName: "checkmark.seal.fill")
                                .font(.system(size: 15, weight: .semibold))
                            Text("Learned")
                                .fredoka(14, weight: .semibold)
                        }
                        .foregroundColor(Color.inkFixed)
                        .padding(.horizontal, 14)
                        .padding(.vertical, 9)
                        .background(Color.sky)
                        .clipShape(Capsule())
                        .stickerShadow()
                    }
                    .accessibilityLabel("Mark \(country.name) as learned")
                }
            }

            Spacer(minLength: 0)
        }
        .padding(16)
    }

    @ViewBuilder
    private func factRow(icon: String, label: String, value: String) -> some View {
        HStack(spacing: 10) {
            Image(systemName: icon)
                .font(.system(size: 13))
                .foregroundColor(Color.mustard)
                .frame(width: 20)
            Text(label)
                .fredoka(13)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                .frame(width: 80, alignment: .leading)
            Text(value)
                .fredoka(14, weight: .semibold)
                .foregroundColor(Color.flagGameInk(scheme))
                .lineLimit(2)
                .minimumScaleFactor(0.8)
        }
    }
}

// MARK: - HistoricalPolityDetail

private struct HistoricalPolityDetail: View {
    let polity: HistoricalPolity
    @Environment(\.colorScheme) var scheme

    private func formattedPopulation(_ pop: Int) -> String {
        let d = Double(pop)
        switch d {
        case 1_000_000_000...:
            return String(format: "%.1f B", d / 1_000_000_000)
        case 1_000_000...:
            return String(format: "%.1f M", d / 1_000_000)
        case 1_000...:
            return String(format: "%.1f K", d / 1_000)
        default:
            return "\(pop)"
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {

            // Header
            HStack(alignment: .top, spacing: 12) {
                ZStack {
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color.mustard.opacity(0.2))
                        .frame(width: 52, height: 52)
                    Image(systemName: "crown.fill")
                        .font(.system(size: 24))
                        .foregroundColor(Color.mustard)
                }

                VStack(alignment: .leading, spacing: 4) {
                    Text(polity.name)
                        .fredoka(22, weight: .bold)
                        .foregroundColor(Color.flagGameInk(scheme))
                        .lineLimit(3)
                        .minimumScaleFactor(0.8)

                    Text("Historical Polity")
                        .fredoka(12)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.5))
                }
                Spacer(minLength: 0)
            }

            Divider()
                .background(Color.flagGameInk(scheme).opacity(0.1))

            // Region
            if let continent = polity.continent {
                HStack(spacing: 10) {
                    Image(systemName: "map.fill")
                        .font(.system(size: 13))
                        .foregroundColor(Color.coral)
                        .frame(width: 20)
                    Text("Region")
                        .fredoka(13)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                        .frame(width: 80, alignment: .leading)
                    Text(continent)
                        .fredoka(14, weight: .semibold)
                        .foregroundColor(Color.flagGameInk(scheme))
                }
            }

            // Population estimate
            if let pop = polity.population {
                HStack(spacing: 10) {
                    Image(systemName: "person.3.fill")
                        .font(.system(size: 13))
                        .foregroundColor(Color.sky)
                        .frame(width: 20)
                    Text("Population")
                        .fredoka(13)
                        .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                        .frame(width: 80, alignment: .leading)
                    Text("~\(formattedPopulation(pop))")
                        .fredoka(14, weight: .semibold)
                        .foregroundColor(Color.flagGameInk(scheme))
                }
            }

            // Note / description
            if let note = polity.note, !note.isEmpty {
                VStack(alignment: .leading, spacing: 5) {
                    HStack(spacing: 6) {
                        Image(systemName: "text.quote")
                            .font(.system(size: 12))
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.45))
                        Text("Note")
                            .fredoka(13, weight: .semibold)
                            .foregroundColor(Color.flagGameInk(scheme).opacity(0.55))
                    }
                    Text(note)
                        .fredoka(13)
                        .foregroundColor(Color.flagGameInk(scheme))
                        .lineLimit(nil)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .padding(12)
                .background(Color.flagGameBackground(scheme).opacity(0.6))
                .clipShape(RoundedRectangle(cornerRadius: 10))
            }

            Spacer(minLength: 0)
        }
        .padding(16)
    }
}

// MARK: - EmptySelectionView

private struct EmptySelectionView: View {
    @Environment(\.colorScheme) var scheme

    var body: some View {
        VStack(spacing: 14) {
            Image(systemName: "globe.americas.fill")
                .font(.system(size: 48))
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.2))
            Text("Tap a country\nto learn about it")
                .fredoka(16)
                .foregroundColor(Color.flagGameInk(scheme).opacity(0.4))
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 48)
    }
}

// MARK: - FlowTagsView

/// Horizontally wrapping tag chips.
private struct FlowTagsView: View {
    let tags: [String]
    var color: Color = .mustard
    @Environment(\.colorScheme) var scheme

    var body: some View {
        // Simple wrapping layout using a fixed-width container isn't trivial in
        // pure SwiftUI without Layout protocol (iOS 16+). We use a custom approach.
        _FlowLayout(spacing: 6) {
            ForEach(tags, id: \.self) { tag in
                Text(tag)
                    .fredoka(12)
                    .foregroundColor(Color.flagGameInk(scheme))
                    .padding(.horizontal, 9)
                    .padding(.vertical, 4)
                    .background(color.opacity(0.18))
                    .clipShape(Capsule())
            }
        }
    }
}

/// A simple left-to-right, top-to-bottom wrapping layout (iOS 16+).
private struct _FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout Void) -> CGSize {
        let maxWidth = proposal.width ?? .infinity
        var x: CGFloat = 0
        var y: CGFloat = 0
        var rowHeight: CGFloat = 0

        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if x + size.width > maxWidth, x > 0 {
                x = 0
                y += rowHeight + spacing
                rowHeight = 0
            }
            x += size.width + spacing
            rowHeight = max(rowHeight, size.height)
        }
        y += rowHeight
        return CGSize(width: maxWidth, height: y)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout Void) {
        let maxWidth = bounds.width
        var x: CGFloat = bounds.minX
        var y: CGFloat = bounds.minY
        var rowHeight: CGFloat = 0

        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if x + size.width > bounds.minX + maxWidth, x > bounds.minX {
                x = bounds.minX
                y += rowHeight + spacing
                rowHeight = 0
            }
            subview.place(at: CGPoint(x: x, y: y), proposal: ProposedViewSize(size))
            x += size.width + spacing
            rowHeight = max(rowHeight, size.height)
        }
    }
}
