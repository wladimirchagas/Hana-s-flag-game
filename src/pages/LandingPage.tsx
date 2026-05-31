import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLeaderboard } from '../context/LeaderboardContext'
import { FlagConfetti } from '../components/FlagConfetti'
import { Mascot } from '../components/Mascot'
import { CountryPickerModal } from '../components/CountryPickerModal'
import { QuickQuizSetupModal, type QuickQuizConfig } from '../components/QuickQuizSetupModal'
import { AllFlagsSetupModal, type AllFlagsStart } from '../components/AllFlagsSetupModal'
import { HeroCarousel } from '../components/HeroCharacters'
import { InstallAppButton } from '../components/InstallAppButton'
import { loadStoredSelection } from '../lib/countrySelection'
import './LandingPage.css'

const TITLE_LETTERS: { ch: string; color: string }[] = [
  { ch: 'G', color: 'c1' },
  { ch: 'u', color: 'c2' },
  { ch: 'e', color: 'c3' },
  { ch: 's', color: 'c4' },
  { ch: 's', color: 'c1' },
]

export default function LandingPage() {
  const { openLeaderboard } = useLeaderboard()
  const navigate = useNavigate()
  const [pickerOpen, setPickerOpen] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [flagMasterOpen, setFlagMasterOpen] = useState(false)

  const playWith = (codes: string[]) => {
    setPickerOpen(false)
    navigate('/game', { state: { codes } })
  }

  const playQuiz = (config: QuickQuizConfig) => {
    setQuizOpen(false)
    navigate('/game', { state: { quiz: { flagCount: config.flagCount } } })
  }

  const playFlagMaster = (start: AllFlagsStart) => {
    setFlagMasterOpen(false)
    if (start.type === 'all195') {
      navigate('/game')
    } else if (start.type === 'similarity') {
      navigate('/game', {
        state: {
          groupGame: {
            groupCodes: start.groupCodes,
            groupLabel: start.groupLabel,
            hardcore: start.hardcore,
            modeLabel: 'By Similarity',
          },
        },
      })
    } else if (start.type === 'continent') {
      navigate('/game', {
        state: {
          groupGame: {
            groupCodes: start.groupCodes,
            groupLabel: start.groupLabel,
            hardcore: false,
            modeLabel: 'By Continent',
          },
        },
      })
    } else if (start.type === 'subregion') {
      navigate('/game', {
        state: {
          groupGame: {
            groupCodes: start.groupCodes,
            groupLabel: start.groupLabel,
            hardcore: false,
            modeLabel: 'By Sub-Continent',
          },
        },
      })
    }
  }

  return (
    <div className="sticker">
      <FlagConfetti />

      <main className="sticker__main">
        <div className="sticker__titlewrap">
          <h1 className="sticker__title">
            {TITLE_LETTERS.map((l, i) => (
              <span key={i} className={`sticker__ch sticker__ch--${l.color}`}>
                {l.ch}
              </span>
            ))}
            <span className="sticker__the">the</span>
            <span className="sticker__ch sticker__ch--c2">F</span>
            <span className="sticker__ch sticker__ch--c3">l</span>
            <span className="sticker__ch sticker__ch--c4">a</span>
            <span className="sticker__ch sticker__ch--c1">g</span>
            <span className="sticker__bang">!</span>
          </h1>
          <div className="sticker__mascot">
            <Mascot size={110} />
          </div>
          <div className="sticker__stars" aria-hidden="true">
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>

        {/* Hero card — integrates the rotating poster with the Hana's Game
            CTA so they read as a single visual unit. Clicking the card
            starts the game with the stored selection; the gear in the
            top-right opens the picker so users can edit their list. */}
        <div
          className="hero-card"
          role="button"
          tabIndex={0}
          aria-label="Play Hana's Game"
          onClick={() => playWith(loadStoredSelection().codes)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              playWith(loadStoredSelection().codes)
            }
          }}
        >
          <button
            type="button"
            className="hero-card__settings"
            aria-label="Edit country list"
            onClick={(e) => {
              e.stopPropagation()
              setPickerOpen(true)
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
          <HeroCarousel className="hero-card__poster" />
          <div className="hero-card__content">
            <h2 className="hero-card__title">Hana&rsquo;s Game</h2>
            <p className="hero-card__desc">
              Build your own list of flags to practise. Pick the countries you
              already know the flag and as you learn about new countries, just
              add them to your list to test your memory!
            </p>
            <span className="hero-card__cta card-sticker__cta card-sticker__cta--sky">PLAY!</span>
          </div>
        </div>

        <div className="sticker__cards">
          {/* Learn mode — no-stakes sandbox, listed first because it's the
              friendliest entry point for new players. */}
          <button
            type="button"
            className="card-sticker card-sticker--d card-sticker--secondary"
            onClick={() => navigate('/learn')}
          >
            <h2 className="card-sticker__title">Learn your flags</h2>
            <p className="card-sticker__sub">
              Hover or click any country on the world map to see its flag.
              No clock, no score — just explore at your own pace.
            </p>
            <span className="card-sticker__cta card-sticker__cta--pink">EXPLORE →</span>
          </button>

          {/* Quick Quiz — difficulty mode only. */}
          <button
            type="button"
            className="card-sticker card-sticker--c card-sticker--secondary"
            onClick={() => setQuizOpen(true)}
          >
            <h2 className="card-sticker__title">Quick Quiz</h2>
            <p className="card-sticker__sub">
              Pick 5, 10, 20, or 30 flags from the full 195. The number of
              answer choices matches your flag count — simple as that.
            </p>
            <span className="card-sticker__cta card-sticker__cta--mustard">SET UP →</span>
          </button>

          {/* Flag Master — all game modes. */}
          <button
            type="button"
            className="card-sticker card-sticker--a card-sticker--secondary"
            onClick={() => setFlagMasterOpen(true)}
          >
            <h2 className="card-sticker__title">Flag Master</h2>
            <p className="card-sticker__sub">
              All 195 flags, by continent, by sub-continent, or similar flags
              only — the ultimate test of how many you really know.
            </p>
            <span className="card-sticker__cta card-sticker__cta--lime">PLAY →</span>
          </button>
        </div>

        <button
          type="button"
          className="sticker__leaderboard"
          onClick={() => openLeaderboard()}
        >
          🏆 Leaderboard
        </button>

        {/* Renders itself only when an install path is available on this
            platform (Chrome/Edge/Android install prompt or Safari Share
            menu). Hidden once the app is already launched standalone. */}
        <InstallAppButton />
      </main>

      <CountryPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onConfirm={playWith}
      />

      <QuickQuizSetupModal
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        onStart={playQuiz}
      />

      <AllFlagsSetupModal
        open={flagMasterOpen}
        onClose={() => setFlagMasterOpen(false)}
        onStart={playFlagMaster}
      />
    </div>
  )
}
