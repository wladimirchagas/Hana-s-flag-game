import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const nrArmsSvg = fs.readFileSync(path.join(root, "public/national-flags/nr/nr-arms.svg"), "utf8");
// Extract inner elements of Nauru arms SVG
const nrArmsMatch = nrArmsSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
const nrArmsInner = nrArmsMatch ? nrArmsMatch[1] : "";

const vaArmsSvg = fs.readFileSync(path.join(root, "public/national-flags/va/va-arms.svg"), "utf8");
const vaArmsMatch = vaArmsSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
const vaArmsInner = vaArmsMatch ? vaArmsMatch[1] : "";

// 1. Acta Apostolicae Sedis (VA)
const aasSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 170" width="600" height="170">
  <defs>
    <style>
      .aas-title { font-family: "Cinzel", "Trajan Pro", "Times New Roman", Garamond, serif; font-size: 26px; font-weight: 700; fill: #1c1917; letter-spacing: 0.14em; }
      .aas-sub { font-family: "Cinzel", "Times New Roman", Garamond, serif; font-size: 13px; font-weight: 600; fill: #57534e; letter-spacing: 0.22em; }
      .aas-line { stroke: #b45309; stroke-width: 1.5; }
      .aas-line-thin { stroke: #d97706; stroke-width: 0.75; }
    </style>
  </defs>
  <rect width="600" height="170" fill="transparent"/>
  <!-- Papal Arms Emblem scaled -->
  <g transform="translate(262, 10) scale(0.18)">
    ${vaArmsInner}
  </g>
  <!-- Decorative dividing lines -->
  <line x1="80" y1="96" x2="230" y2="96" class="aas-line" />
  <circle cx="240" cy="96" r="2.5" fill="#b45309" />
  <circle cx="360" cy="96" r="2.5" fill="#b45309" />
  <line x1="370" y1="96" x2="520" y2="96" class="aas-line" />
  <!-- Title -->
  <text x="300" y="128" text-anchor="middle" class="aas-title">ACTA APOSTOLICAE SEDIS</text>
  <line x1="140" y1="138" x2="460" y2="138" class="aas-line-thin" />
  <text x="300" y="155" text-anchor="middle" class="aas-sub">COMMENTARIUM OFFICIALE</text>
</svg>`;

// 2. Donne Chiesa Mondo (VA)
const dcmSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 140" width="540" height="140">
  <defs>
    <style>
      .dcm-title { font-family: "Didot", "Bodoni MT", "Cinzel", "Times New Roman", serif; font-size: 34px; font-weight: 700; fill: #831843; letter-spacing: 0.08em; }
      .dcm-sub { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11.5px; font-weight: 600; fill: #701a75; letter-spacing: 0.25em; text-transform: uppercase; }
      .dcm-tag { font-family: "Georgia", serif; font-size: 13px; font-style: italic; fill: #9d174d; }
    </style>
  </defs>
  <rect width="540" height="140" fill="transparent"/>
  <text x="270" y="58" text-anchor="middle" class="dcm-title">DONNE CHIESA MONDO</text>
  <line x1="70" y1="78" x2="470" y2="78" stroke="#be185d" stroke-width="1.5" />
  <text x="270" y="100" text-anchor="middle" class="dcm-sub">MENSILE DELL'OSSERVATORE ROMANO</text>
  <circle cx="90" cy="116" r="3" fill="#be185d"/>
  <circle cx="450" cy="116" r="3" fill="#be185d"/>
  <line x1="105" y1="116" x2="435" y2="116" stroke="#f472b6" stroke-width="0.75" />
</svg>`;

// 3. Nauru Bulletin (NR)
const nbSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 150" width="580" height="150">
  <defs>
    <style>
      .nb-title { font-family: "Impact", "Arial Black", -apple-system, BlinkMacSystemFont, sans-serif; font-size: 36px; font-weight: 900; fill: #002b7f; letter-spacing: 0.06em; }
      .nb-sub { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; font-weight: 700; fill: #b45309; letter-spacing: 0.2em; text-transform: uppercase; }
    </style>
  </defs>
  <rect width="580" height="150" fill="transparent"/>
  <!-- Nauru coat of arms scaled -->
  <g transform="translate(30, 20) scale(0.18)">
    ${nrArmsInner}
  </g>
  <text x="195" y="68" class="nb-title">NAURU BULLETIN</text>
  <line x1="195" y1="84" x2="540" y2="84" stroke="#ffc72c" stroke-width="3.5" />
  <text x="195" y="106" class="nb-sub">GOVERNMENT INFORMATION OFFICE · REPUBLIC OF NAURU</text>
</svg>`;

// 4. Naoero Gazette (NR)
const ngSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 160" width="580" height="160">
  <defs>
    <style>
      .ng-rep { font-family: "Times New Roman", "Baskerville", serif; font-size: 15px; font-weight: 700; fill: #1f2937; letter-spacing: 0.3em; text-transform: uppercase; }
      .ng-title { font-family: "Times New Roman", "Baskerville", serif; font-size: 32px; font-weight: 900; fill: #111827; letter-spacing: 0.08em; }
      .ng-sub { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 10px; font-weight: 700; fill: #4b5563; letter-spacing: 0.28em; text-transform: uppercase; }
    </style>
  </defs>
  <rect width="580" height="160" fill="transparent"/>
  <g transform="translate(250, 10) scale(0.14)">
    ${nrArmsInner}
  </g>
  <text x="290" y="88" text-anchor="middle" class="ng-rep">REPUBLIC OF NAURU</text>
  <line x1="60" y1="96" x2="520" y2="96" stroke="#111827" stroke-width="2.5" />
  <text x="290" y="128" text-anchor="middle" class="ng-title">GOVERNMENT GAZETTE · NAOERO</text>
  <line x1="120" y1="138" x2="460" y2="138" stroke="#111827" stroke-width="1" />
  <text x="290" y="152" text-anchor="middle" class="ng-sub">PUBLISHED BY AUTHORITY</text>
</svg>`;

// 5. Mwinen Ko (NR)
const mkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 130" width="500" height="130">
  <defs>
    <style>
      .mk-title { font-family: "Georgia", "Times New Roman", serif; font-size: 38px; font-weight: 700; fill: #047857; letter-spacing: 0.05em; }
      .mk-sub { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11.5px; font-weight: 600; fill: #065f46; letter-spacing: 0.2em; text-transform: uppercase; }
    </style>
  </defs>
  <rect width="500" height="130" fill="transparent"/>
  <!-- Decorative 12-pointed Nauru star icon in green -->
  <g transform="translate(45, 62) scale(0.65)">
    <polygon points="0,-40 9,-12 38,-12 15,5 24,32 0,16 -24,32 -15,5 -38,-12 -9,-12" fill="#10b981"/>
    <circle cx="0" cy="5" r="8" fill="#047857"/>
  </g>
  <text x="105" y="65" class="mk-title">MWINEN KO</text>
  <line x1="105" y1="80" x2="460" y2="80" stroke="#10b981" stroke-width="2.5" />
  <text x="105" y="102" class="mk-sub">NAURU COMMUNITY NEWS · LET'S TALK ABOUT IT</text>
</svg>`;

// 6. Central Star News (NR)
const csnSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 130" width="520" height="130">
  <defs>
    <style>
      .csn-title { font-family: "Impact", "Arial Black", sans-serif; font-size: 34px; font-weight: 900; fill: #1e3a8a; letter-spacing: 0.05em; }
      .csn-sub { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; font-weight: 700; fill: #d97706; letter-spacing: 0.22em; text-transform: uppercase; }
    </style>
  </defs>
  <rect width="520" height="130" fill="transparent"/>
  <!-- Golden 12-pointed star emblem -->
  <g transform="translate(50, 65) scale(0.7)">
    <circle cx="0" cy="0" r="32" fill="#1e3a8a"/>
    <polygon points="0,-25 6,-8 24,-8 9,3 15,20 0,10 -15,20 -9,3 -24,-8 -6,-8" fill="#fbbf24"/>
  </g>
  <text x="110" y="66" class="csn-title">CENTRAL STAR NEWS</text>
  <line x1="110" y1="80" x2="480" y2="80" stroke="#fbbf24" stroke-width="3" />
  <text x="110" y="102" class="csn-sub">AIWO &amp; BUADA COMMUNITY NEWSLETTER · NAURU</text>
</svg>`;

// 7. The Nauru Chronicle (NR)
const ncSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 130" width="540" height="130">
  <defs>
    <style>
      .nc-title { font-family: "Playfair Display", "Times New Roman", serif; font-size: 32px; font-weight: 900; fill: #0f172a; letter-spacing: 0.06em; }
      .nc-sub { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 10.5px; font-weight: 700; fill: #475569; letter-spacing: 0.26em; text-transform: uppercase; }
    </style>
  </defs>
  <rect width="540" height="130" fill="transparent"/>
  <text x="270" y="60" text-anchor="middle" class="nc-title">THE NAURU CHRONICLE</text>
  <line x1="60" y1="78" x2="480" y2="78" stroke="#0f172a" stroke-width="2" />
  <line x1="120" y1="83" x2="420" y2="83" stroke="#64748b" stroke-width="0.75" />
  <text x="270" y="104" text-anchor="middle" class="nc-sub">PACIFIC VOICES · CENTRAL PACIFIC INDEPENDENT PRESS</text>
</svg>`;

fs.writeFileSync(path.join(root, "public/newspaper-logos/va/acta-apostolicae-sedis.svg"), aasSvg);
console.log("✓ Saved va/acta-apostolicae-sedis.svg");

fs.writeFileSync(path.join(root, "public/newspaper-logos/va/donne-chiesa-mondo.svg"), dcmSvg);
console.log("✓ Saved va/donne-chiesa-mondo.svg");

fs.writeFileSync(path.join(root, "public/newspaper-logos/nr/nauru-bulletin.svg"), nbSvg);
console.log("✓ Saved nr/nauru-bulletin.svg");

fs.writeFileSync(path.join(root, "public/newspaper-logos/nr/naoero-gazette.svg"), ngSvg);
console.log("✓ Saved nr/naoero-gazette.svg");

fs.writeFileSync(path.join(root, "public/newspaper-logos/nr/mwinen-ko.svg"), mkSvg);
console.log("✓ Saved nr/mwinen-ko.svg");

fs.writeFileSync(path.join(root, "public/newspaper-logos/nr/central-star-news.svg"), csnSvg);
console.log("✓ Saved nr/central-star-news.svg");

fs.writeFileSync(path.join(root, "public/newspaper-logos/nr/nauru-chronicle.svg"), ncSvg);
console.log("✓ Saved nr/nauru-chronicle.svg");
