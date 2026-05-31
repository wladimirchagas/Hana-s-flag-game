import { useEffect, useState } from 'react'

// Chrome / Edge / Android Chrome fire `beforeinstallprompt` once the page
// meets PWA install criteria. The event is non-standard so we type it here
// rather than rely on lib.dom.
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// Two browsers we have to special-case:
//   - iOS Safari: no `beforeinstallprompt` at all — user must use Share →
//     Add to Home Screen. We detect it so we can show a how-to modal.
//   - Desktop Safari ≥ 17 / iPadOS: "Add to Dock" / "Add to Home Screen"
//     also lives under the Share menu, so we route it through the same
//     instructions but with desktop wording.
type Platform = 'prompt-capable' | 'ios-safari' | 'desktop-safari' | 'unsupported'

function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'unsupported'
  const ua = window.navigator.userAgent
  const vendor = window.navigator.vendor || ''
  // iPad on iOS 13+ reports as "Macintosh"; the touch-points check rescues it.
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && 'ontouchend' in document && navigator.maxTouchPoints > 1)
  // Every browser on iOS is a WebKit shell — none of them support the
  // `beforeinstallprompt` event, so we route all of them through the
  // Share-menu instructions.
  if (isIOS) return 'ios-safari'
  // Desktop Safari: vendor is the only reliable signal because Chromium
  // and Firefox both put "Safari" in their UA.
  const isDesktopSafari =
    /Safari/.test(ua) && /Apple/.test(vendor) && !/Chrome|CriOS|FxiOS|EdgiOS/.test(ua)
  if (isDesktopSafari) return 'desktop-safari'
  return 'prompt-capable'
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  // The two ways a PWA reports it's running from a home-screen shortcut.
  // matchMedia covers Chrome / Edge / Android; navigator.standalone is the
  // iOS-only legacy flag.
  if (window.matchMedia?.('(display-mode: standalone)').matches) return true
  if ((window.navigator as { standalone?: boolean }).standalone) return true
  return false
}

export function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [platform] = useState<Platform>(() => detectPlatform())
  const [installed, setInstalled] = useState<boolean>(() => isStandalone())
  const [showIosHelp, setShowIosHelp] = useState(false)

  useEffect(() => {
    const onPrompt = (e: Event) => {
      // Stash the event so the click handler can call prompt() later. The
      // browser only fires this once per session; without preventDefault
      // it would show its own mini-infobar (Chrome) and we'd lose the
      // chance to drive the prompt from our button.
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    const onInstalled = () => {
      setInstalled(true)
      setDeferredPrompt(null)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed) return null

  // On Chrome/Edge/Android the install prompt only becomes available once
  // the SW + manifest are picked up. If we haven't received it yet there's
  // nothing we can usefully wire up, so hide the button rather than show
  // something that won't work.
  const canShow =
    platform === 'ios-safari' ||
    platform === 'desktop-safari' ||
    deferredPrompt !== null
  if (!canShow) return null

  const handleClick = async () => {
    if (platform === 'ios-safari' || platform === 'desktop-safari') {
      setShowIosHelp(true)
      return
    }
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setInstalled(true)
    }
    // Either way the event can only be used once.
    setDeferredPrompt(null)
  }

  return (
    <>
      <button
        type="button"
        className="install-app-btn"
        onClick={handleClick}
        aria-label="Save shortcut to home screen"
      >
        <span className="install-app-btn__icon" aria-hidden="true">📲</span>
        <span>Save shortcut to {isMobileUA() ? 'home screen' : 'desktop'}</span>
      </button>

      {showIosHelp && (
        <InstallHelpModal
          platform={platform === 'desktop-safari' ? 'desktop-safari' : 'ios-safari'}
          onClose={() => setShowIosHelp(false)}
        />
      )}
    </>
  )
}

function isMobileUA(): boolean {
  if (typeof navigator === 'undefined') return false
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
}

function InstallHelpModal({
  platform,
  onClose,
}: {
  platform: 'ios-safari' | 'desktop-safari'
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    // Lock background scroll while modal is open.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  const isDesktop = platform === 'desktop-safari'
  const target = isDesktop ? 'Dock' : 'Home Screen'

  return (
    <div className="install-help-backdrop" role="presentation" onClick={onClose}>
      <div
        className="install-help"
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-help-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="install-help__close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <h2 id="install-help-title" className="install-help__title">
          Add to {target}
        </h2>
        <p className="install-help__intro">
          Safari doesn&rsquo;t let websites trigger the install prompt directly, so
          here are the steps:
        </p>
        <ol className="install-help__steps">
          <li>
            Tap the <strong>Share</strong> button
            <span className="install-help__inline-icon" aria-hidden="true">
              {/* Apple share glyph — same shape Safari shows in the toolbar. */}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V4" />
                <path d="M8 8l4-4 4 4" />
                <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
              </svg>
            </span>
            {isDesktop
              ? ' in Safari’s toolbar (top-right).'
              : ' at the bottom of Safari.'}
          </li>
          <li>
            Scroll and choose <strong>Add to {target}</strong>
            <span className="install-help__inline-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </span>
            .
          </li>
          <li>
            Tap <strong>Add</strong> to confirm. The flag-game icon will appear
            on your {isDesktop ? 'Dock' : 'home screen'} and open like an app.
          </li>
        </ol>
        <button type="button" className="install-help__ok" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  )
}
