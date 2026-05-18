import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import FlagGamePage from './pages/FlagGamePage'
import LearnPage from './pages/LearnPage'
import { ThemeToggle } from './components/ThemeToggle'
import { BuildFooter } from './components/BuildFooter'

export default function App() {
  return (
    <>
      {/* One toggle, top-centre of the viewport, visible everywhere — single
          source of truth so we don't drift across pages. */}
      <div className="global-theme-toggle">
        <ThemeToggle />
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<FlagGamePage />} />
        <Route path="/learn" element={<LearnPage />} />
      </Routes>
      {/* Persistent build-info footer across every route. */}
      <BuildFooter />
    </>
  )
}
