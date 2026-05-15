import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLeaderboard } from '../context/LeaderboardContext'
import { FlagConfetti } from '../components/FlagConfetti'
import { Mascot } from '../components/Mascot'
import { CountryPickerModal } from '../components/CountryPickerModal'
import { ThemeToggle } from '../components/ThemeToggle'
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

  const playAll = () => navigate('/game')
  const playWith = (codes: string[]) => {
    setPickerOpen(false)
    navigate('/game', { state: { codes } })
  }

  return (
    <div className="sticker">
      <FlagConfetti />

      <div className="sticker__topbar">
        <ThemeToggle />
      </div>

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

        <div className="sticker__cards">
          <button
            type="button"
            className="card-sticker card-sticker--a"
            onClick={playAll}
          >
            <div className="card-sticker__row" aria-hidden="true">
              <span>◯</span><span>◯</span><span>◯</span><span>◯</span>
              <span>◯</span><span>◯</span><span>◯</span><span>◯</span>
            </div>
            <h2 className="card-sticker__title">All Flags</h2>
            <p className="card-sticker__sub">Play with all 195 countries</p>
            <span className="card-sticker__cta card-sticker__cta--coral">PLAY!</span>
          </button>

          <button
            type="button"
            className="card-sticker card-sticker--b"
            onClick={() => setPickerOpen(true)}
          >
            <div className="card-sticker__row" aria-hidden="true">
              <span>☑</span><span>☑</span><span>☑</span>
              <span>☐</span><span>☐</span><span>☐</span>
            </div>
            <h2 className="card-sticker__title">My Picks</h2>
            <p className="card-sticker__sub">Choose your own list</p>
            <span className="card-sticker__cta card-sticker__cta--sky">CHOOSE!</span>
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
    </div>
  )
}
