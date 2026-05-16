import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLeaderboard } from '../context/LeaderboardContext'
import { FlagConfetti } from '../components/FlagConfetti'
import { Mascot } from '../components/Mascot'
import { CountryPickerModal } from '../components/CountryPickerModal'
import { QuickQuizSetupModal, type QuickQuizConfig } from '../components/QuickQuizSetupModal'
import { HeroCarousel } from '../components/HeroCharacters'
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

  const playAll = () => navigate('/game')
  const playWith = (codes: string[]) => {
    setPickerOpen(false)
    navigate('/game', { state: { codes } })
  }
  const playQuiz = (quiz: QuickQuizConfig) => {
    setQuizOpen(false)
    navigate('/game', { state: { quiz } })
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
            CTA so they read as a single visual unit. The whole card is
            clickable (role=button) to open the picker; the carousel arrows
            inside stopPropagation so they don't trigger play. */}
        <div
          className="hero-card"
          role="button"
          tabIndex={0}
          aria-label="Play Hana's Game"
          onClick={() => setPickerOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setPickerOpen(true)
            }
          }}
        >
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

          {/* Quick Quiz is now the 3rd CTA. */}
          <button
            type="button"
            className="card-sticker card-sticker--c card-sticker--secondary"
            onClick={() => setQuizOpen(true)}
          >
            <h2 className="card-sticker__title">Quick Quiz</h2>
            <p className="card-sticker__sub">
              Pick 10, 20, or 30 flags at Easy, Moderate, or Hard. Difficulty
              sets your options and tries per flag.
            </p>
            <span className="card-sticker__cta card-sticker__cta--mustard">SET UP →</span>
          </button>

          {/* All 195 Flags is now the 3rd CTA. */}
          <button
            type="button"
            className="card-sticker card-sticker--a card-sticker--secondary"
            onClick={playAll}
          >
            <h2 className="card-sticker__title">All 195 Flags</h2>
            <p className="card-sticker__sub">
              The full set, in random order. One guess per flag — for the
              ultimate test of how many you know.
            </p>
            <span className="card-sticker__cta card-sticker__cta--lime">PLAY ALL →</span>
          </button>
        </div>

        <button
          type="button"
          className="sticker__leaderboard"
          onClick={openLeaderboard}
        >
          🏆 Leaderboard
        </button>
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
    </div>
  )
}
