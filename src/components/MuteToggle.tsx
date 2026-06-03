import { useEffect, useState } from "react";
import { gameAudio } from "../lib/gameAudio";

export function MuteToggle() {
  // Initialise from the singleton so the button reflects whatever
  // loadMutedPreference() set before the first render.
  const [muted, setMuted] = useState(() => gameAudio.muted);

  // Keep in sync if the preference was loaded after mount (edge case).
  useEffect(() => {
    setMuted(gameAudio.muted);
  }, []);

  function toggle() {
    const next = !muted;
    setMuted(next);
    gameAudio.setGlobalMuted(next);
  }

  return (
    <button
      type="button"
      className={`mute-toggle${muted ? " mute-toggle--muted" : ""}`}
      onClick={toggle}
      role="switch"
      aria-checked={!muted}
      aria-label={muted ? "Unmute sounds" : "Mute sounds"}
      title={muted ? "Unmute sounds" : "Mute sounds"}
    >
      <span className="mute-toggle__icon" aria-hidden="true">
        {muted ? "🔇" : "🔊"}
      </span>
    </button>
  );
}
