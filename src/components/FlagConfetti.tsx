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
  // top row
  { code: "jp", top: "4%",  left: "2%",  size: 64, rotate: -8,  delay: 0.0, duration: 6.5 },
  { code: "br", top: "7%",  left: "16%", size: 56, rotate: 6,   delay: 1.2, duration: 7.2 },
  { code: "gb", top: "3%",  left: "32%", size: 58, rotate: -5,  delay: 0.4, duration: 6.8 },
  { code: "ca", top: "5%",  left: "50%", size: 60, rotate: -4,  delay: 2.0, duration: 6.0 },
  { code: "cn", top: "4%",  left: "66%", size: 56, rotate: 7,   delay: 1.6, duration: 7.4 },
  { code: "in", top: "6%",  left: "82%", size: 58, rotate: 10,  delay: 0.6, duration: 7.8 },
  // upper-middle row
  { code: "au", top: "25%", left: "1%",  size: 70, rotate: 5,   delay: 1.8, duration: 7.0 },
  { code: "ng", top: "22%", left: "14%", size: 52, rotate: -9,  delay: 2.3, duration: 6.3 },
  { code: "ar", top: "26%", left: "30%", size: 58, rotate: 8,   delay: 0.8, duration: 7.5 },
  { code: "kr", top: "23%", left: "46%", size: 60, rotate: -3,  delay: 1.4, duration: 6.7 },
  { code: "eg", top: "27%", left: "62%", size: 54, rotate: 11,  delay: 2.9, duration: 7.1 },
  { code: "nz", top: "24%", left: "78%", size: 66, rotate: -7,  delay: 0.3, duration: 6.8 },
  { code: "id", top: "22%", left: "92%", size: 52, rotate: 4,   delay: 1.7, duration: 7.3 },
  // middle row
  { code: "my", top: "46%", left: "0%",  size: 60, rotate: -10, delay: 2.4, duration: 7.4 },
  { code: "it", top: "44%", left: "12%", size: 56, rotate: 6,   delay: 0.5, duration: 6.9 },
  { code: "es", top: "47%", left: "26%", size: 58, rotate: -4,  delay: 1.9, duration: 6.2 },
  { code: "tr", top: "43%", left: "42%", size: 54, rotate: 9,   delay: 2.6, duration: 7.7 },
  { code: "sa", top: "48%", left: "58%", size: 60, rotate: -6,  delay: 0.2, duration: 6.6 },
  { code: "th", top: "44%", left: "74%", size: 56, rotate: 5,   delay: 1.3, duration: 7.0 },
  { code: "mx", top: "46%", left: "90%", size: 50, rotate: 12,  delay: 2.1, duration: 6.6 },
  // lower-middle row
  { code: "za", top: "65%", left: "3%",  size: 64, rotate: 8,   delay: 1.0, duration: 6.2 },
  { code: "pk", top: "62%", left: "18%", size: 52, rotate: -7,  delay: 2.8, duration: 7.6 },
  { code: "pt", top: "66%", left: "34%", size: 56, rotate: 3,   delay: 0.7, duration: 6.4 },
  { code: "se", top: "63%", left: "50%", size: 58, rotate: -11, delay: 1.5, duration: 7.2 },
  { code: "nl", top: "67%", left: "66%", size: 54, rotate: 7,   delay: 2.2, duration: 6.8 },
  { code: "ph", top: "64%", left: "82%", size: 52, rotate: -4,  delay: 0.9, duration: 7.4 },
  // bottom row
  { code: "fr", top: "83%", left: "8%",  size: 54, rotate: -6,  delay: 0.9, duration: 7.6 },
  { code: "pl", top: "86%", left: "22%", size: 56, rotate: 5,   delay: 2.0, duration: 6.3 },
  { code: "de", top: "84%", left: "38%", size: 58, rotate: 4,   delay: 2.7, duration: 6.4 },
  { code: "ke", top: "87%", left: "54%", size: 52, rotate: -8,  delay: 0.4, duration: 7.1 },
  { code: "us", top: "83%", left: "70%", size: 62, rotate: -3,  delay: 1.5, duration: 7.0 },
  { code: "ru", top: "86%", left: "86%", size: 54, rotate: 9,   delay: 2.4, duration: 6.7 },
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
