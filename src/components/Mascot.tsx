export function Mascot({ size = 96 }: { size?: number }) {
  return (
    <svg
      className="mascot"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Smiling globe mascot"
    >
      <defs>
        <radialGradient id="globeFill" cx="35%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#9ee9ff" />
          <stop offset="60%" stopColor="#4ecdc4" />
          <stop offset="100%" stopColor="#2a9d92" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="52" r="40" fill="url(#globeFill)" stroke="#1a2238" strokeWidth="3" />
      <path
        d="M14 52 Q50 36 86 52"
        fill="none"
        stroke="#1a2238"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      <path
        d="M50 12 Q34 52 50 92"
        fill="none"
        stroke="#1a2238"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      <path
        d="M28 30 Q34 38 30 48 Q40 50 44 42 Q52 48 60 40 Q70 44 72 34 Q60 28 50 32 Q40 24 28 30 Z"
        fill="#7ed957"
        stroke="#1a2238"
        strokeWidth="2"
      />
      <path
        d="M30 64 Q42 60 52 66 Q64 60 74 68 Q70 78 58 78 Q46 82 36 76 Q30 72 30 64 Z"
        fill="#7ed957"
        stroke="#1a2238"
        strokeWidth="2"
      />
      <circle cx="38" cy="46" r="3.2" fill="#1a2238" />
      <circle cx="62" cy="46" r="3.2" fill="#1a2238" />
      <circle cx="39" cy="45" r="1" fill="#fff" />
      <circle cx="63" cy="45" r="1" fill="#fff" />
      <path
        d="M38 60 Q50 70 62 60"
        fill="none"
        stroke="#1a2238"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="30" cy="56" r="2.5" fill="#ff6b6b" opacity="0.7" />
      <circle cx="70" cy="56" r="2.5" fill="#ff6b6b" opacity="0.7" />
    </svg>
  );
}
