import fs from 'fs';
const path = 'scripts/data/national-flag-sources.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const entries = [
  ['SG', 'sg-civil-ensign', {
    description: "The civil ensign of Singapore, created by law in 1966 for use by privately owned, Singapore-registered merchant ships, is a red field bearing the white crescent and five stars taken from the national flag, in elongated 1:2 proportions. The red repeats the national flag's own meaning of universal brotherhood and equality of all people, while the crescent stands for a young nation on the rise and the five stars for democracy, peace, progress, justice and equality.",
    sources: [
      { title: "Wikipedia — Red Ensign of Singapore", url: "https://en.wikipedia.org/wiki/Red_Ensign_of_Singapore" },
      { title: "Flags of the World — Civil Ensign (Singapore)", url: "https://www.crwflags.com/fotw/flags/sg~civil.html" }
    ]
  }],
  ['SG', 'sg-state-ensign', {
    description: "The state ensign, flown by Singapore's non-military government vessels such as coast guard ships, is blue with the national flag's crescent and stars in a red canton and an eight-pointed red-and-white compass rose in the fly. The compass device marks the ensign as belonging to a government vessel rather than a merchant ship, distinguishing it from the plain red civil ensign flown by Singapore's private merchant fleet.",
    sources: [
      { title: "Flags of the World — State Ensign (Singapore)", url: "https://www.crwflags.com/fotw/flags/sg~state.html" },
      { title: "Wikipedia — List of Singaporean flags", url: "https://en.wikipedia.org/wiki/List_of_Singaporean_flags" }
    ]
  }],
];
let applied = 0;
for (const [cc, id, meaning] of entries) {
  const flags = data.countries[cc]?.flags;
  if (!flags) { console.log(`MISSING country ${cc}`); continue; }
  const entry = flags.find((f) => f.id === id);
  if (!entry) { console.log(`MISSING entry ${cc}:${id}`); continue; }
  if (entry.meaning) { console.log(`SKIP ${cc}:${id} already has meaning`); continue; }
  entry.meaning = meaning;
  applied++;
  console.log(`applied ${cc}:${id}`);
}
fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log(`Total applied: ${applied}`);
