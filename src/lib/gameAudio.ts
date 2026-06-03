// Singleton Web Audio API manager for game sounds, background music, and haptics.

type HapticType = "correct" | "wrong" | "celebrate" | "unlock";

// C major pentatonic melody for background music: [frequency_hz, duration_seconds]
// Gentle, adventure-y, kids-friendly
const BG_MELODY: Array<[number, number]> = [
  [261.63, 0.5], // C4
  [329.63, 0.5], // E4
  [392.00, 0.5], // G4
  [440.00, 0.5], // A4
  [392.00, 0.5], // G4
  [329.63, 0.5], // E4
  [293.66, 0.5], // D4
  [261.63, 0.5], // C4
  [392.00, 0.5], // G4
  [329.63, 0.5], // E4
  [261.63, 0.5], // C4
  [293.66, 0.5], // D4
  [329.63, 0.5], // E4
  [392.00, 0.5], // G4
  [440.00, 0.5], // A4
  [392.00, 1.0], // G4 (held)
];

const MUTED_KEY = "sfx-muted";

class GameAudioManager {
  private ctx: AudioContext | null = null;
  // User-facing global mute (persisted to localStorage; default true = muted).
  private globalMuted = true;
  private bgMuted = false;
  private bgActive = false;
  private noteIndex = 0;
  private bgTimer: ReturnType<typeof setTimeout> | null = null;

  get muted(): boolean {
    return this.globalMuted;
  }

  setGlobalMuted(muted: boolean): void {
    this.globalMuted = muted;
    try {
      localStorage.setItem(MUTED_KEY, String(muted));
    } catch { /* storage unavailable */ }
    if (muted) {
      this.bgMuted = true;
      this.clearBgTimer();
    } else if (this.bgActive) {
      this.bgMuted = false;
      this.scheduleNextNote();
    }
  }

  /** Call once at app startup to restore the user's saved preference. */
  loadMutedPreference(): void {
    try {
      const stored = localStorage.getItem(MUTED_KEY);
      // Default to muted (true) when no preference is saved yet.
      this.globalMuted = stored === null ? true : stored === "true";
    } catch {
      this.globalMuted = true;
    }
  }

  private getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private tone(
    freq: number,
    startTime: number,
    duration: number,
    peakGain: number,
    type: OscillatorType = "triangle",
  ): void {
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(peakGain, startTime + Math.min(0.02, duration * 0.1));
    gain.gain.setValueAtTime(peakGain, startTime + duration * 0.7);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.01);
  }

  playCorrect(): void {
    this.haptic("correct");
    if (this.globalMuted) return;
    try {
      const ctx = this.getCtx();
      const now = ctx.currentTime;
      // Bright ascending two-note chime: C5 → G5
      this.tone(523.25, now, 0.15, 0.4, "triangle");
      this.tone(783.99, now + 0.12, 0.25, 0.45, "triangle");
    } catch {
      // AudioContext unavailable
    }
  }

  playWrong(): void {
    this.haptic("wrong");
    if (this.globalMuted) return;
    try {
      const ctx = this.getCtx();
      const now = ctx.currentTime;
      // Gentle descending tone — soft for kids, not harsh
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.3);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // AudioContext unavailable
    }
  }

  playGameComplete(): void {
    this.haptic("celebrate");
    if (this.globalMuted) return;
    try {
      const ctx = this.getCtx();
      const now = ctx.currentTime;
      // Happy fanfare: C5 E5 G5 C6 ascending arpeggio, then a held chord
      const arpNotes: [number, number][] = [
        [523.25, 0.14],
        [659.25, 0.14],
        [783.99, 0.14],
        [1046.5, 0.14],
      ];
      let t = now;
      for (const [freq, step] of arpNotes) {
        this.tone(freq, t, 0.28, 0.35, "triangle");
        t += step;
      }
      // Sustained chord underneath the fanfare ending
      for (const freq of [523.25, 659.25, 783.99]) {
        this.tone(freq, t + 0.06, 0.7, 0.22, "triangle");
      }
    } catch {
      // AudioContext unavailable
    }
  }

  playUnlock(): void {
    this.haptic("unlock");
    if (this.globalMuted) return;
    try {
      const ctx = this.getCtx();
      const now = ctx.currentTime;
      // Magical sparkle: quick ascending scale
      const sparkle = [392.0, 493.88, 587.33, 698.46, 880.0, 1046.5];
      sparkle.forEach((freq, i) => {
        this.tone(freq, now + i * 0.09, 0.22, 0.3, "triangle");
      });
    } catch {
      // AudioContext unavailable
    }
  }

  startBackgroundMusic(): void {
    if (this.bgActive) return;
    this.bgActive = true;
    // Don't start notes if the user has muted — bgActive=true means "started"
    // so unmuting later will call scheduleNextNote() via setGlobalMuted().
    if (!this.globalMuted) {
      this.bgMuted = false;
      this.scheduleNextNote();
    }
  }

  stopBackgroundMusic(): void {
    this.bgActive = false;
    this.clearBgTimer();
  }

  pauseBackgroundMusic(): void {
    this.bgMuted = true;
    this.clearBgTimer();
  }

  resumeBackgroundMusic(): void {
    if (!this.bgActive || !this.bgMuted || this.globalMuted) return;
    this.bgMuted = false;
    this.scheduleNextNote();
  }

  private clearBgTimer(): void {
    if (this.bgTimer != null) {
      clearTimeout(this.bgTimer);
      this.bgTimer = null;
    }
  }

  private scheduleNextNote(): void {
    if (!this.bgActive || this.bgMuted || this.globalMuted) return;

    const [freq, durationS] = BG_MELODY[this.noteIndex % BG_MELODY.length]!;
    this.noteIndex++;

    try {
      const ctx = this.getCtx();
      const now = ctx.currentTime;
      // Very soft gain (0.045) so music stays well in the background
      this.tone(freq, now, durationS - 0.05, 0.045, "sine");
    } catch {
      // AudioContext unavailable — keep the loop ticking silently
    }

    this.bgTimer = setTimeout(
      () => this.scheduleNextNote(),
      (durationS - 0.04) * 1000,
    );
  }

  private haptic(type: HapticType): void {
    if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
    try {
      switch (type) {
        case "correct":
          navigator.vibrate(50);
          break;
        case "wrong":
          navigator.vibrate([30, 20, 30]);
          break;
        case "celebrate":
          navigator.vibrate([80, 40, 80, 40, 160]);
          break;
        case "unlock":
          navigator.vibrate([50, 30, 80, 30, 50]);
          break;
      }
    } catch {
      // Vibration API not supported
    }
  }
}

export const gameAudio = new GameAudioManager();
