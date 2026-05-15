import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LeaderboardProvider } from './context/LeaderboardContext.tsx'
import { LeaderboardLightbox } from './components/LeaderboardLightbox.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

// Vite injects BASE_URL from the `base` option in vite.config.ts. Trailing slash
// is stripped because react-router expects e.g. "/flag-game" not "/flag-game/".
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <ThemeProvider>
        <LeaderboardProvider>
          <App />
          <LeaderboardLightbox />
        </LeaderboardProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
