# Hana's Flag Game — iOS App

Native SwiftUI app (iPhone + iPad) built from the existing web app. Full feature parity: all game modes, interactive world map, historical era maps, national anthems, subnational flags, and leaderboard.

## Requirements

- macOS 14 (Sonoma) or later
- Xcode 15.2 or later
- iOS 16.0+ deployment target (already set)
- Apple Developer account (free account works for personal device; paid account needed for TestFlight)
- Firebase project (same one as the web app)

---

## Setup Steps

### 1. Open the project in Xcode

```
open ios/HanaFlagGame.xcodeproj
```

Wait for Swift Package Manager to resolve the Firebase iOS SDK (~150 MB download on first open).

### 2. Add GoogleService-Info.plist

1. In the Firebase Console, go to **Project settings → Your apps**
2. If there is no iOS app registered, click **Add app → Apple (iOS)**
   - Bundle ID: `com.hanaflaggame.app`
3. Download **GoogleService-Info.plist**
4. In Xcode, drag it into the **HanaFlagGame** group (next to `Info.plist`)
   - Check **"Copy items if needed"**
   - Target membership: **HanaFlagGame** ✓

Without this file the app will crash at launch.

### 3. Set your Development Team

1. Click the **HanaFlagGame** project in the navigator
2. Select the **HanaFlagGame** target → **Signing & Capabilities**
3. Set **Team** to your Apple Developer account
4. The bundle ID `com.hanaflaggame.app` will be provisioned automatically

### 4. (Optional) Add the Fredoka font

The app uses Fredoka One / Fredoka for headings.

1. Download **Fredoka** from [Google Fonts](https://fonts.google.com/specimen/Fredoka)
2. Unzip and copy the `.ttf` files into `ios/HanaFlagGame/Fonts/`
3. In Xcode, add the files to the target (File → Add Files to "HanaFlagGame")
4. In **Info.plist**, add a `UIAppFonts` array key with entries for each font file, e.g.:
   ```
   Fredoka-Regular.ttf
   Fredoka-Medium.ttf
   Fredoka-SemiBold.ttf
   Fredoka-Bold.ttf
   ```
5. In `View+Modifiers.swift`, the `.fredoka()` modifier already uses `Font.custom("Fredoka", size:)` — it will fall back to the system rounded font if the files are absent.

### 5. Build and run

- **Simulator**: select any iPhone 15 or iPad Pro simulator and press **⌘R**
- **Device**: connect your iPhone/iPad, select it as the run destination, press **⌘R** (Xcode will install automatically)

### 6. Distribute via TestFlight

1. Select **Any iOS Device (arm64)** as the build destination
2. **Product → Archive** — this builds a release archive
3. In the **Organizer** window, click **Distribute App → App Store Connect**
4. Follow the upload wizard; the build appears in App Store Connect under **TestFlight** within ~5–15 minutes
5. Add internal testers and send them an invitation link

---

## Firebase Rules

The iOS app reads/writes the same `leaderboard` Firestore collection as the web app. Make sure the Firestore security rules allow reads and writes from authenticated or unauthenticated clients as appropriate:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leaderboard/{entry} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasAll(['name','score','mode','correct','total','ms'])
                    && request.resource.data.name is string
                    && request.resource.data.name.size() <= 20;
    }
  }
}
```

---

## Architecture Overview

```
ios/HanaFlagGame/
├── App/                  Entry point + root navigation
├── Models/               Country, GameConfig, LeaderboardEntry
├── Data/                 Static data arrays (countries, difficulty, similarity, anthems, historical eras)
├── ViewModels/           AppViewModel, GameViewModel, LearnViewModel, LeaderboardViewModel
├── Services/             CountryService (API), AudioService, AnthemService, HapticService, LeaderboardService (Firebase)
├── Map/                  OrthographicProjection, GeoJSON/TopoJSON types, WorldMapRenderer (Canvas)
├── Extensions/           Color+Theme, View+Modifiers (design system)
├── Views/
│   ├── Components/       FlagImageView, TopbarView
│   ├── Landing/          LandingView, FlagConfettiView, GameModeCard
│   ├── Game/             GameView, GameFinishView, FlagCardView, AnswerOptionsView, FeedbackView, ScoreBoardView, GameClockView
│   ├── Learn/            LearnView, WorldMapView, HistoricalMapView, CountryDetailPanel, FlagGridView, AnthemPlayerView
│   └── Modals/           CountryPickerView, QuickQuizSetupView, AllFlagsSetupView, LeaderboardView, FlagUnlockView
├── Assets.xcassets/      Color sets (ink, cream, coral, mustard, sky, lime, appPink, paper), AppIcon
├── countries-50m.json    TopoJSON world map (50m resolution)
├── historical-maps/      GeoJSON polity maps for 13 historical eras
└── subdivisions/         Per-country subnational division metadata (240 JSON files)
```

### Key design decisions

| Topic | Approach |
|---|---|
| Navigation | `NavigationStack` with typed `NavigationPath`; `GameRoute` and `LearnRoute` are `Hashable` structs |
| State | `@StateObject` / `@EnvironmentObject`; no Combine chains — `async/await` + `@MainActor` |
| Map rendering | SwiftUI `Canvas` with custom orthographic projection (matches D3-geo output) |
| Flag images | `AsyncImage` from `flagcdn.com` CDN; no local copies needed |
| National anthems | Wikimedia Commons REST API → MP3 derivative URL → `AVPlayer` stream |
| Sound effects | `AVAudioEngine` triangle/sine wave synthesis — no audio assets needed |
| Offline country data | `STATIC_COUNTRIES` (195 entries) provides instant offline fallback; REST Countries API enriches at runtime and caches in UserDefaults |
| Theme | Light/dark mode with named color assets; user toggle persisted to UserDefaults |

---

## Known Limitations

- **OGG fallback**: If Wikimedia hasn't yet generated an MP3 transcode for a given anthem, playback will fail (iOS cannot decode OGG Vorbis natively). This affects a small number of less-common anthems.
- **Map tap accuracy**: The orthographic projection tap hit-test uses centroid nearest-neighbor for very small island nations; it may occasionally select a neighbouring country. Zoom in using pinch before tapping small islands.
- **Subnational game mode**: The subdivisions directory contains metadata only (names and types). Subnational flag images are served from `flagcdn.com` using ISO 3166-2 codes.
