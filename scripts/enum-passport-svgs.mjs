// One-off: enumerate all Commons SVG files matching "passport", save to /tmp/passport_svgs.txt
const UA = "HanaFlagBot/1.0 (flag game national symbols)";
async function search(offset) {
  const u = "https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=50&sroffset=" +
    offset + "&format=json&srsearch=" + encodeURIComponent("intitle:passport");
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(u, { headers: { "User-Agent": UA } });
    if (res.status === 429) { await new Promise(r => setTimeout(r, 2000 * (attempt + 1))); continue; }
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
  }
  throw new Error("429 exhausted");
}
const found = new Set();
let off = 0, total = Infinity;
while (off < total) {
  const d = await search(off);
  total = d.query.searchinfo.totalhits;
  for (const h of d.query.search) if (h.title.toLowerCase().endsWith(".svg")) found.add(h.title);
  if (!d.continue) break;
  off += 50;
  await new Promise(r => setTimeout(r, 700));
}
const fs = await import("node:fs");
fs.writeFileSync("/tmp/passport_svgs.txt", [...found].sort().join("\n") + "\n");
console.log("saved", found.size, "SVG passport files");
