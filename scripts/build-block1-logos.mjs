import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function saveSvg(relPath, content) {
  const full = path.join(root, "public", relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim());
  console.log(`✓ Saved ${relPath} (${content.length} bytes)`);
}

// 1. Afghanistan (AF)
saveSvg("newspaper-logos/af/bakhtar.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#005A36" rx="8"/>
  <circle cx="70" cy="70" r="42" fill="#D4AF37"/>
  <circle cx="70" cy="70" r="36" fill="#005A36"/>
  <text x="70" y="77" font-family="'Scheherazade New', 'Amiri', serif" font-size="28" font-weight="bold" fill="#D4AF37" text-anchor="middle">باختر</text>
  <text x="140" y="65" font-family="'Cinzel', serif" font-size="24" font-weight="bold" fill="#FFFFFF" letter-spacing="1">BAKHTAR NEWS AGENCY</text>
  <text x="140" y="95" font-family="'Amiri', serif" font-size="20" fill="#D4AF37">آژانس خبری باختر — کابل</text>
</svg>`);

saveSvg("newspaper-logos/af/tolonews.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#111827" rx="8"/>
  <polygon points="40,25 90,70 40,115" fill="#E11D48"/>
  <polygon points="65,40 100,70 65,100" fill="#F59E0B"/>
  <text x="120" y="82" font-family="'Montserrat', 'Helvetica', sans-serif" font-size="44" font-weight="900" fill="#FFFFFF" letter-spacing="2">TOLO<tspan fill="#E11D48">NEWS</tspan></text>
</svg>`);

saveSvg("newspaper-logos/af/pajhwok.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#1E3A8A" rx="8"/>
  <path d="M 40,40 C 70,20 90,60 60,100 C 90,80 100,110 50,110 Z" fill="#F59E0B"/>
  <text x="125" y="68" font-family="'Helvetica Neue', sans-serif" font-size="32" font-weight="bold" fill="#FFFFFF">PAJHWOK</text>
  <text x="125" y="96" font-family="'Amiri', serif" font-size="20" fill="#93C5FD">AFGHAN NEWS AGENCY</text>
</svg>`);

saveSvg("newspaper-logos/af/khaama.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#0F172A" rx="8"/>
  <rect x="40" y="35" width="60" height="70" fill="#0284C7" rx="6"/>
  <path d="M 55,50 L 85,85 M 85,50 L 55,85" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>
  <text x="120" y="75" font-family="'Inter', sans-serif" font-size="34" font-weight="800" fill="#FFFFFF">KHAAMA <tspan fill="#0284C7">PRESS</tspan></text>
  <text x="120" y="100" font-family="'Inter', sans-serif" font-size="14" fill="#94A3B8" letter-spacing="2">ONLINE NEWS AGENCY</text>
</svg>`);

saveSvg("newspaper-logos/af/hasht-e-subh.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#022C22" rx="8"/>
  <circle cx="70" cy="70" r="35" fill="#10B981"/>
  <text x="70" y="82" font-family="'Amiri', serif" font-size="38" font-weight="bold" fill="#FFFFFF" text-anchor="middle">۸</text>
  <text x="125" y="65" font-family="'Amiri', serif" font-size="28" font-weight="bold" fill="#34D399">روزنامه هشت صبح</text>
  <text x="125" y="95" font-family="'Cinzel', serif" font-size="18" fill="#FFFFFF" letter-spacing="1">HASHT-E SUBH DAILY</text>
</svg>`);

// 2. Albania (AL)
saveSvg("newspaper-logos/al/atsh.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#991B1B" rx="8"/>
  <path d="M 40,70 L 60,40 L 70,55 L 80,40 L 100,70 L 85,70 L 70,95 L 55,70 Z" fill="#111827"/>
  <text x="120" y="70" font-family="'Cinzel', serif" font-size="36" font-weight="bold" fill="#FFFFFF" letter-spacing="3">ATSH</text>
  <text x="120" y="95" font-family="'Helvetica', sans-serif" font-size="14" fill="#FCA5A5" letter-spacing="1">AGJENCIA TELEGRAFIKE SHQIPTARE</text>
</svg>`);

saveSvg("newspaper-logos/al/panorama.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#FFFFFF" rx="8" stroke="#E5E7EB"/>
  <text x="250" y="85" font-family="'Playfair Display', 'Times New Roman', serif" font-size="46" font-weight="900" fill="#B91C1C" text-anchor="middle" letter-spacing="2">PANORAMA</text>
</svg>`);

saveSvg("newspaper-logos/al/gazeta-shqiptare.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#18181B" rx="8"/>
  <text x="250" y="70" font-family="'Bodoni MT', 'Didot', serif" font-size="34" font-weight="bold" fill="#FFFFFF" text-anchor="middle">GAZETA SHQIPTARE</text>
  <line x1="100" y1="85" x2="400" y2="85" stroke="#EF4444" stroke-width="2"/>
  <text x="250" y="105" font-family="'Inter', sans-serif" font-size="12" fill="#A1A1AA" text-anchor="middle" letter-spacing="3">E PËRDIATSHME PAVARUR — TIRANË</text>
</svg>`);

saveSvg("newspaper-logos/al/koha-jone.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#FFFFFF" rx="8" stroke="#DC2626" stroke-width="3"/>
  <text x="250" y="80" font-family="'Impact', 'Arial Black', sans-serif" font-size="44" fill="#DC2626" text-anchor="middle" letter-spacing="1">KOHA JONË</text>
</svg>`);

saveSvg("newspaper-logos/al/shekulli.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#0F172A" rx="8"/>
  <text x="250" y="80" font-family="'Cinzel', 'Georgia', serif" font-size="42" font-weight="700" fill="#38BDF8" text-anchor="middle" letter-spacing="4">SHEKULLI</text>
</svg>`);

// 3. Algeria (DZ)
saveSvg("newspaper-logos/dz/aps.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#065F46" rx="8"/>
  <circle cx="75" cy="70" r="38" fill="#FFFFFF"/>
  <path d="M 65,45 L 85,70 L 65,95" stroke="#065F46" stroke-width="8" fill="none" stroke-linecap="round"/>
  <text x="135" y="70" font-family="'Helvetica Neue', sans-serif" font-size="42" font-weight="900" fill="#FFFFFF" letter-spacing="3">APS</text>
  <text x="135" y="98" font-family="'Amiri', serif" font-size="18" fill="#A7F3D0">وكالة الأنباء الجزائرية</text>
</svg>`);

saveSvg("newspaper-logos/dz/el-watan.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#FFFFFF" rx="8" stroke="#111827"/>
  <text x="250" y="82" font-family="'Times New Roman', serif" font-size="48" font-weight="bold" fill="#111827" text-anchor="middle" letter-spacing="1">El Watan</text>
  <text x="250" y="112" font-family="'Helvetica', sans-serif" font-size="12" fill="#6B7280" text-anchor="middle">LE QUOTIDIEN INDÉPENDANT</text>
</svg>`);

saveSvg("newspaper-logos/dz/el-khabar.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#991B1B" rx="8"/>
  <text x="250" y="85" font-family="'Amiri', 'Scheherazade', serif" font-size="52" font-weight="bold" fill="#FFFFFF" text-anchor="middle">الخبر</text>
</svg>`);

saveSvg("newspaper-logos/dz/echorouk.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#1E40AF" rx="8"/>
  <circle cx="70" cy="70" r="30" fill="#F59E0B"/>
  <text x="120" y="85" font-family="'Amiri', serif" font-size="48" font-weight="bold" fill="#FFFFFF">الشروق</text>
</svg>`);

saveSvg("newspaper-logos/dz/liberte.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#FFFFFF" rx="8" stroke="#2563EB" stroke-width="3"/>
  <text x="250" y="82" font-family="'Futura', 'Arial', sans-serif" font-size="44" font-weight="bold" fill="#2563EB" text-anchor="middle" letter-spacing="3">LIBERTE</text>
</svg>`);

// 4. Andorra (AD)
saveSvg("newspaper-logos/ad/diari-d-andorra.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#1E3A8A" rx="8"/>
  <text x="250" y="70" font-family="'Cinzel', serif" font-size="30" font-weight="bold" fill="#FFFFFF" text-anchor="middle">DIARI D'ANDORRA</text>
  <text x="250" y="98" font-family="'Inter', sans-serif" font-size="13" fill="#FDE047" text-anchor="middle" letter-spacing="2">EL PERIÒDIC INDEPENDENT DEL PRINCIPAT</text>
</svg>`);

saveSvg("newspaper-logos/ad/el-periodic.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#FFFFFF" rx="8" stroke="#DC2626"/>
  <text x="250" y="72" font-family="'Helvetica Neue', sans-serif" font-size="34" font-weight="900" fill="#DC2626" text-anchor="middle">EL PERIÒDIC</text>
  <text x="250" y="100" font-family="'Helvetica Neue', sans-serif" font-size="18" font-weight="700" fill="#1E3A8A" text-anchor="middle">D'ANDORRA</text>
</svg>`);

saveSvg("newspaper-logos/ad/ana.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#0F172A" rx="8"/>
  <circle cx="70" cy="70" r="32" fill="#EA580C"/>
  <text x="70" y="79" font-family="'Inter', sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" text-anchor="middle">ANA</text>
  <text x="125" y="68" font-family="'Inter', sans-serif" font-size="22" font-weight="700" fill="#FFFFFF">AGÈNCIA DE NOTÍCIES</text>
  <text x="125" y="94" font-family="'Inter', sans-serif" font-size="18" fill="#F97316">ANDORRANA</text>
</svg>`);

saveSvg("newspaper-logos/ad/altaveu.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#7C3AED" rx="8"/>
  <text x="250" y="82" font-family="'Montserrat', sans-serif" font-size="44" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">altaveu</text>
</svg>`);

saveSvg("newspaper-logos/ad/bondia.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#F59E0B" rx="8"/>
  <text x="250" y="85" font-family="'Arial Black', sans-serif" font-size="48" fill="#FFFFFF" text-anchor="middle">BonDia</text>
</svg>`);

// 5. Angola (AO)
saveSvg("newspaper-logos/ao/angop.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#B91C1C" rx="8"/>
  <path d="M 45,45 L 85,45 L 85,95 L 45,95 Z" fill="#F59E0B"/>
  <polygon points="65,55 75,70 65,85" fill="#B91C1C"/>
  <text x="110" y="75" font-family="'Trebuchet MS', sans-serif" font-size="42" font-weight="bold" fill="#FFFFFF" letter-spacing="3">ANGOP</text>
  <text x="110" y="100" font-family="'Inter', sans-serif" font-size="13" fill="#FCD34D" letter-spacing="1">AGÊNCIA ANGOLA PRESS</text>
</svg>`);

saveSvg("newspaper-logos/ao/jornal-de-angola.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#FFFFFF" rx="8" stroke="#111827"/>
  <text x="250" y="68" font-family="'Times New Roman', serif" font-size="32" font-weight="bold" fill="#991B1B" text-anchor="middle">JORNAL DE ANGOLA</text>
  <text x="250" y="98" font-family="'Helvetica', sans-serif" font-size="12" fill="#4B5563" text-anchor="middle" letter-spacing="2">O DIÁRIO NACIONAL DE ANGOLA — LUANDA</text>
</svg>`);

saveSvg("newspaper-logos/ao/o-pais.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#0F172A" rx="8"/>
  <text x="250" y="82" font-family="'Impact', sans-serif" font-size="52" fill="#E11D48" text-anchor="middle" letter-spacing="2">O PAÍS</text>
</svg>`);

saveSvg("newspaper-logos/ao/novo-jornal.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#0284C7" rx="8"/>
  <text x="250" y="82" font-family="'Arial Black', sans-serif" font-size="40" fill="#FFFFFF" text-anchor="middle">NOVO JORNAL</text>
</svg>`);

saveSvg("newspaper-logos/ao/folha-8.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#18181B" rx="8"/>
  <text x="250" y="85" font-family="'Courier New', monospace" font-size="44" font-weight="bold" fill="#EF4444" text-anchor="middle">FOLHA 8</text>
</svg>`);

// 6. Antigua and Barbuda (AG)
saveSvg("newspaper-logos/ag/antigua-observer.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#0284C7" rx="8"/>
  <circle cx="70" cy="70" r="32" fill="#F59E0B"/>
  <text x="120" y="68" font-family="'Georgia', serif" font-size="28" font-weight="bold" fill="#FFFFFF">ANTIGUA OBSERVER</text>
  <text x="120" y="96" font-family="'Inter', sans-serif" font-size="14" fill="#E0F2FE" letter-spacing="1">NEWS MEDIA GROUP — ST. JOHN'S</text>
</svg>`);

saveSvg("newspaper-logos/ag/abs.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#0F172A" rx="8"/>
  <rect x="40" y="40" width="60" height="60" fill="#DC2626" rx="6"/>
  <text x="70" y="80" font-family="'Inter', sans-serif" font-size="24" font-weight="900" fill="#FFFFFF" text-anchor="middle">ABS</text>
  <text x="120" y="68" font-family="'Inter', sans-serif" font-size="22" font-weight="700" fill="#FFFFFF">ANTIGUA BARBUDA</text>
  <text x="120" y="94" font-family="'Inter', sans-serif" font-size="16" fill="#F87171">BROADCASTING SERVICE</text>
</svg>`);

saveSvg("newspaper-logos/ag/real-news.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#15803D" rx="8"/>
  <text x="250" y="82" font-family="'Impact', sans-serif" font-size="44" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">REAL NEWS ANTIGUA</text>
</svg>`);

saveSvg("newspaper-logos/ag/pointville.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#B91C1C" rx="8"/>
  <text x="250" y="80" font-family="'Arial Black', sans-serif" font-size="38" fill="#FFFFFF" text-anchor="middle">POINT EXPRESS</text>
</svg>`);

saveSvg("newspaper-logos/ag/antigua-trumpet.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#4338CA" rx="8"/>
  <text x="250" y="82" font-family="'Georgia', serif" font-size="34" font-weight="bold" fill="#FDE047" text-anchor="middle">ANTIGUA TRUMPET</text>
</svg>`);

// 7. Argentina (AR)
saveSvg("newspaper-logos/ar/clarin.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#DC2626" rx="8"/>
  <text x="250" y="88" font-family="'Georgia', 'Times New Roman', serif" font-size="54" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">Clarín</text>
</svg>`);

saveSvg("newspaper-logos/ar/la-nacion.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#FFFFFF" rx="8" stroke="#111827"/>
  <text x="250" y="85" font-family="'Playfair Display', 'Times New Roman', serif" font-size="46" font-weight="900" fill="#111827" text-anchor="middle">LA NACION</text>
</svg>`);

saveSvg("newspaper-logos/ar/pagina-12.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#111827" rx="8"/>
  <text x="250" y="85" font-family="'Helvetica Neue', sans-serif" font-size="46" font-weight="900" fill="#0284C7" text-anchor="middle">Página<tspan fill="#FFFFFF">12</tspan></text>
</svg>`);

saveSvg("newspaper-logos/ar/telam.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#0284C7" rx="8"/>
  <text x="250" y="85" font-family="'Montserrat', sans-serif" font-size="48" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">TÉLAM</text>
</svg>`);

saveSvg("newspaper-logos/ar/el-cronista.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#065F46" rx="8"/>
  <text x="250" y="82" font-family="'Cinzel', serif" font-size="38" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">EL CRONISTA</text>
</svg>`);

// 8. Armenia (AM)
saveSvg("newspaper-logos/am/armenpress.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#1E3A8A" rx="8"/>
  <circle cx="70" cy="70" r="32" fill="#D97706"/>
  <text x="120" y="68" font-family="'Cinzel', serif" font-size="28" font-weight="bold" fill="#FFFFFF">ARMENPRESS</text>
  <text x="120" y="96" font-family="'Noto Sans Armenian', sans-serif" font-size="16" fill="#93C5FD">ԱՐՄԵՆՊՐԵՍ ԼՐԱՏՎԱԿԱՆ ԳՈՐԾԱԿԱԼՈՒԹՅՈՒՆ</text>
</svg>`);

saveSvg("newspaper-logos/am/aravot.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#FFFFFF" rx="8" stroke="#1E3A8A"/>
  <text x="250" y="72" font-family="'Georgia', serif" font-size="36" font-weight="bold" fill="#1E3A8A" text-anchor="middle">ԱՌԱՎՈՏ</text>
  <text x="250" y="98" font-family="'Inter', sans-serif" font-size="14" fill="#B91C1C" text-anchor="middle" letter-spacing="2">ARAVOT DAILY — YEREVAN</text>
</svg>`);

saveSvg("newspaper-logos/am/news-am.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#B91C1C" rx="8"/>
  <text x="250" y="85" font-family="'Impact', sans-serif" font-size="46" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">NEWS.am</text>
</svg>`);

saveSvg("newspaper-logos/am/hayastani-hanrapetutyun.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#0F172A" rx="8"/>
  <text x="250" y="70" font-family="'Noto Sans Armenian', sans-serif" font-size="22" font-weight="bold" fill="#F59E0B" text-anchor="middle">ՀԱՅԱՍՏԱՆԻ ՀԱՆՐԱՊԵՏՈՒԹՅՈՒՆ</text>
  <text x="250" y="96" font-family="'Cinzel', serif" font-size="14" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">OFFICIAL STATE DAILY — ARMENIA</text>
</svg>`);

saveSvg("newspaper-logos/am/hetq.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#15803D" rx="8"/>
  <text x="250" y="75" font-family="'Noto Sans Armenian', sans-serif" font-size="34" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ՀԵՏՔ / HETQ</text>
  <text x="250" y="100" font-family="'Inter', sans-serif" font-size="12" fill="#DCFCE7" text-anchor="middle" letter-spacing="1">INVESTIGATIVE JOURNALISTS</text>
</svg>`);

// 10. Austria (AT)
saveSvg("newspaper-logos/at/apa.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#0F172A" rx="8"/>
  <rect x="40" y="40" width="60" height="60" fill="#EF4444" rx="4"/>
  <text x="70" y="82" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#FFFFFF" text-anchor="middle">APA</text>
  <text x="120" y="68" font-family="'Inter', sans-serif" font-size="24" font-weight="800" fill="#FFFFFF">AUSTRIAPRESSEAGENTUR</text>
  <text x="120" y="94" font-family="'Inter', sans-serif" font-size="14" fill="#94A3B8" letter-spacing="1">NATIONAL NEWS AGENCY — WIEN</text>
</svg>`);

saveSvg("newspaper-logos/at/kronen-zeitung.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#DC2626" rx="8"/>
  <text x="250" y="72" font-family="'UnifrakturMaguntia', 'Fraktur', serif" font-size="42" fill="#FFFFFF" text-anchor="middle">Kronen Zeitung</text>
  <text x="250" y="100" font-family="'Helvetica Neue', sans-serif" font-size="14" font-weight="bold" fill="#FDE047" text-anchor="middle" letter-spacing="2">DAS UNABHÄNGIGE KRONEN-BLATT</text>
</svg>`);

saveSvg("newspaper-logos/at/der-standard.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#F43F5E" rx="8"/>
  <text x="250" y="85" font-family="'Helvetica Neue', sans-serif" font-size="42" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">DER STANDARD</text>
</svg>`);

saveSvg("newspaper-logos/at/die-presse.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#FFFFFF" rx="8" stroke="#111827"/>
  <text x="250" y="82" font-family="'Playfair Display', serif" font-size="44" font-weight="bold" fill="#111827" text-anchor="middle">Die Presse</text>
  <text x="250" y="108" font-family="'Inter', sans-serif" font-size="11" fill="#6B7280" text-anchor="middle" letter-spacing="3">SEIT 1848 UNABHÄNGIG</text>
</svg>`);

saveSvg("newspaper-logos/at/kurier.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 140" width="500" height="140">
  <rect width="500" height="140" fill="#1E40AF" rx="8"/>
  <text x="250" y="85" font-family="'Futura', sans-serif" font-size="46" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">KURIER</text>
</svg>`);

console.log("✓ Block 1 logos built successfully.");
