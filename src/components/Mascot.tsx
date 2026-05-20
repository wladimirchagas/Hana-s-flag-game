export function Mascot({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Map pin mascot">
      {/* Pin body: circle head + tapered point */}
      <path
        d="M50 6 C76 6,88 22,88 40 C88 60,70 74,50 96 C30 74,12 60,12 40 C12 22,24 6,50 6 Z"
        fill="#ff6b6b" stroke="#1a2238" strokeWidth="3" strokeLinejoin="round"
      />
      {/* Inner highlight */}
      <circle cx="50" cy="40" r="26" fill="#ff8888" opacity=".25" />
      {/* Eyes */}
      <circle cx="40" cy="36" r="4.5" fill="#1a2238" />
      <circle cx="60" cy="36" r="4.5" fill="#1a2238" />
      <circle cx="41" cy="35" r="1.8" fill="white" />
      <circle cx="61" cy="35" r="1.8" fill="white" />
      {/* Smile */}
      <path d="M37 50 Q50 62 63 50" fill="none" stroke="#1a2238" strokeWidth="3.5" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="30" cy="46" r="4" fill="#ffc857" opacity=".75" />
      <circle cx="70" cy="46" r="4" fill="#ffc857" opacity=".75" />
      {/* Star on pin body */}
      <path d="M50 18 L52.5 25 L60 25 L54.5 29.5 L56.5 37 L50 33 L43.5 37 L45.5 29.5 L40 25 L47.5 25 Z"
            fill="white" opacity=".7" />
    </svg>
  );
}
