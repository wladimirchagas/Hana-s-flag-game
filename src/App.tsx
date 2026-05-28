import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import FlagGamePage from './pages/FlagGamePage'
import LearnPage from './pages/LearnPage'
import CalibratePage from './pages/CalibratePage'
import { Topbar } from './components/Topbar'
import { BuildFooter } from './components/BuildFooter'

export default function App() {
  return (
    <>
      {/* Sticky top bar — Home link (or brand on the landing page) on
          the left, light/dark toggle on the right. Replaces the old
          floating .global-theme-toggle + per-page .game-nav /
          .learn-topbar widgets. Single source of truth. */}
      <Topbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<FlagGamePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/calibrate" element={<CalibratePage />} />
      </Routes>
      {/* Persistent build-info footer across every route. */}
      <BuildFooter />
    </>
  )
}
