import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LeaderboardProvider } from './context/LeaderboardContext.tsx'
import { LeaderboardLightbox } from './components/LeaderboardLightbox.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { NavigationGuardProvider } from './context/NavigationGuardContext.tsx'
import { ProfileProvider } from './context/ProfileContext.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'

// Vite injects BASE_URL from the `base` option in vite.config.ts. Trailing slash
// is stripped because react-router expects e.g. "/flag-game" not "/flag-game/".
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Outermost, so a render error ANYWHERE — including inside a provider —
        shows a card instead of unmounting the tree and leaving a blank page.
        Because it sits above ThemeProvider it re-applies the persisted theme
        itself when it catches — see ErrorBoundary.componentDidCatch. */}
    <ErrorBoundary>
      <BrowserRouter basename={routerBasename}>
        <ThemeProvider>
          <ProfileProvider>
            <NavigationGuardProvider>
              <LeaderboardProvider>
                <App />
                <LeaderboardLightbox />
              </LeaderboardProvider>
            </NavigationGuardProvider>
          </ProfileProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
