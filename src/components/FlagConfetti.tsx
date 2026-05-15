type Tile = {
  code: string;
  top: string;
  left: string;
  size: number;
  rotate: number;
  delay: number;
  duration: number;
};

// Stable positions so the confetti doesn't reshuffle between renders.
// Mix of well-known flags so kids spot familiar ones in the background.
const TILES: readonly Tile[] = [
  { code: "jp", top: "6%",  left: "4%",  size: 64, rotate: -8, delay: 0.0, duration: 6.5 },
  { code: "br", top: "10%", left: "22%", size: 56, rotate: 6,  delay: 1.2, duration: 7.2 },
  { code: "ca", top: "4%",  left: "55%", size: 60, rotate: -4, delay: 2.0, duration: 6.0 },
  { code: "in", top: "8%",  left: "78%", size: 58, rotate: 10, delay: 0.6, duration: 7.8 },
  { code: "au", top: "32%", left: "2%",  size: 70, rotate: 5,  delay: 1.8, duration: 7.0 },
  { code: "nz", top: "30%", left: "88%", size: 66, rotate: -7, delay: 0.3, duration: 6.8 },
  { code: "my", top: "62%", left: "5%",  size: 60, rotate: -10, delay: 2.4, duration: 7.4 },
  { code: "za", top: "65%", left: "84%", size: 64, rotate: 8,  delay: 1.0, duration: 6.2 },
  { code: "fr", top: "82%", left: "18%", size: 54, rotate: -6, delay: 0.9, duration: 7.6 },
  { code: "de", top: "85%", left: "44%", size: 58, rotate: 4,  delay: 2.7, duration: 6.4 },
  { code: "us", top: "80%", left: "70%", size: 62, rotate: -3, delay: 1.5, duration: 7.0 },
  { code: "mx", top: "45%", left: "92%", size: 50, rotate: 12, delay: 2.1, duration: 6.6 },
];

// Subset for narrow viewports — keeps the look without taxing layout.
const MOBILE_TILES = TILES.filter((_, i) => i % 2 === 0);

export function FlagConfetti() {
  return (
    <>
      <div className="confetti confetti--desktop" aria-hidden="true">
        {TILES.map((t) => (
          <FlagTile key={t.code} tile={t} />
        ))}
      </div>
      <div className="confetti confetti--mobile" aria-hidden="true">
        {MOBILE_TILES.map((t) => (
          <FlagTile key={t.code} tile={t} />
        ))}
      </div>
    </>
  );
}

function FlagTile({ tile }: { tile: Tile }) {
  return (
    <img
      className="confetti__tile"
      src={`https://flagcdn.com/${tile.code}.svg`}
      alt=""
      loading="lazy"
      style={{
        top: tile.top,
        left: tile.left,
        width: tile.size,
        // height auto via CSS; using transform for rotation so the float keyframe can stack
        // by setting CSS variables.
        ["--rot" as string]: `${tile.rotate}deg`,
        ["--delay" as string]: `${tile.delay}s`,
        ["--dur" as string]: `${tile.duration}s`,
      }}
    />
  );
}
