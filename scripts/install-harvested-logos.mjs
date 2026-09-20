#!/usr/bin/env node
/**
 * Install visually-verified newspaper/agency logos into public/ + data files.
 * Only entries listed in MANIFEST are touched. Never invents images.
 *
 * Usage: node scripts/install-harvested-logos.mjs
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve, join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

/**
 * Visually verified batch (2026-09). Each row: id, source path (repo-relative),
 * logoExplainer, licenceNote, optional kind override.
 */
const MANIFEST = [
  {
    id: "ma-assabah",
    src: "tmp/logo-harvest/ma/assabah.jpg",
    explainer:
      "Official masthead/brand mark for Assabah, sourced from Wikimedia Commons and visually verified.",
    licence:
      "Assabah masthead trademark bundled from Wikimedia Commons (File:Assabah-logo.jpg) for educational reference in Learn mode.",
  },
  {
    id: "mc-nice-matin-monaco",
    src: "tmp/logo-harvest/mc/nice-matin-monaco.png",
    explainer:
      "Official masthead/brand mark for Nice-Matin (Monaco coverage), sourced from the publisher's official site and visually verified.",
    licence:
      "Nice-Matin (Monaco coverage) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "md-newsmaker",
    src: "tmp/logo-harvest/md/newsmaker.jpg",
    explainer:
      "Official masthead/brand mark for NewsMaker, sourced from the publisher's official site and visually verified.",
    licence:
      "NewsMaker masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "md-tv8",
    src: "tmp/logo-harvest/md/tv8.svg",
    explainer:
      "Official masthead/brand mark for TV8.md News, sourced from the publisher's official site and visually verified.",
    licence:
      "TV8.md News masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "me-vijesti",
    src: "tmp/logo-harvest/me/vijesti.svg",
    explainer:
      "Official masthead/brand mark for Vijesti, sourced from the publisher's official site and visually verified.",
    licence:
      "Vijesti masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "me-pobjeda",
    src: "tmp/logo-harvest/me/pobjeda.jpg",
    explainer:
      "Official masthead/brand mark for Pobjeda, sourced from the publisher's official site and visually verified.",
    licence:
      "Pobjeda masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "me-dan",
    src: "tmp/logo-harvest/me/dan.png",
    explainer:
      "Official masthead/brand mark for Dan, sourced from the publisher's official site and visually verified.",
    licence:
      "Dan masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mg-l-express",
    src: "tmp/logo-harvest/mg/l-express.jpg",
    explainer:
      "Official masthead/brand mark for L'Express de Madagascar, sourced from Wikimedia Commons and visually verified.",
    licence:
      "L'Express de Madagascar masthead trademark bundled from Wikimedia Commons (File:Logo L'Express de Madagascar.jpg) for educational reference in Learn mode.",
  },
  {
    id: "mg-madagascar-tribune",
    src: "tmp/logo-harvest/mg/madagascar-tribune.gif",
    explainer:
      "Official masthead/brand mark for Madagascar Tribune, sourced from the publisher's official site and visually verified.",
    licence:
      "Madagascar Tribune masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mg-newsmada",
    src: "tmp/logo-harvest/mg/newsmada.png",
    explainer:
      "Official masthead/brand mark for NewsMada, sourced from the publisher's official site and visually verified.",
    licence:
      "NewsMada masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mk-nova-makedonija",
    src: "tmp/logo-harvest/mk/nova-makedonija.png",
    explainer:
      "Official masthead/brand mark for Nova Makedonija, sourced from the publisher's official site and visually verified.",
    licence:
      "Nova Makedonija masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mk-koha-mk",
    src: "tmp/logo-harvest/mk/koha-mk.png",
    explainer:
      "Official masthead/brand mark for Koha (North Macedonia), sourced from the publisher's official site and visually verified.",
    licence:
      "Koha (North Macedonia) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mk-sakam-da-kazam",
    src: "tmp/logo-harvest/mk/sakam-da-kazam.svg",
    explainer:
      "Official masthead/brand mark for Sakam da ka\u017eam (SDK.mk), sourced from the publisher's official site and visually verified.",
    licence:
      "Sakam da ka\u017eam (SDK.mk) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ml-l-independant",
    src: "tmp/logo-harvest/ml/l-independant.jpg",
    explainer:
      "Official masthead/brand mark for L'Ind\u00e9pendant, sourced from the publisher's official site and visually verified.",
    licence:
      "L'Ind\u00e9pendant masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ml-studio-tamani",
    src: "tmp/logo-harvest/ml/studio-tamani.svg",
    explainer:
      "Official masthead/brand mark for Studio Tamani, sourced from the publisher's official site and visually verified.",
    licence:
      "Studio Tamani masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mm-democratic-voice",
    src: "tmp/logo-harvest/mm/democratic-voice.png",
    explainer:
      "Official masthead/brand mark for Democratic Voice of Burma (DVB), sourced from the publisher's official site and visually verified.",
    licence:
      "Democratic Voice of Burma (DVB) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mn-udriin-sonin",
    src: "tmp/logo-harvest/mn/udriin-sonin.png",
    explainer:
      "Official masthead/brand mark for Udriin Sonin, sourced from the publisher's official site and visually verified.",
    licence:
      "Udriin Sonin masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mn-gogo-mn",
    src: "tmp/logo-harvest/mn/gogo-mn.png",
    explainer:
      "Official masthead/brand mark for Gogo.mn, sourced from the publisher's official site and visually verified.",
    licence:
      "Gogo.mn masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mn-montsame",
    src: "tmp/logo-harvest/mn/montsame.png",
    explainer:
      "Official masthead/brand mark for Montsame, sourced from Wikimedia Commons and visually verified.",
    licence:
      "Montsame masthead trademark bundled from Wikimedia Commons (File:Montsame logo.png) for educational reference in Learn mode.",
  },
  {
    id: "mr-le-calame",
    src: "tmp/logo-harvest/mr/le-calame.jpg",
    explainer:
      "Official masthead/brand mark for Le Calame, sourced from the publisher's official site and visually verified.",
    licence:
      "Le Calame masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mt-newsbook",
    src: "tmp/logo-harvest/mt/newsbook.jpg",
    explainer:
      "Official masthead/brand mark for Newsbook, sourced from the publisher's official site and visually verified.",
    licence:
      "Newsbook masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mu-l-express",
    src: "tmp/logo-harvest/mu/l-express.svg",
    explainer:
      "Official masthead/brand mark for L'Express, sourced from Wikimedia Commons and visually verified.",
    licence:
      "L'Express masthead trademark bundled from Wikimedia Commons (File:Logo L'Express.svg) for educational reference in Learn mode.",
  },
  {
    id: "mu-le-mauricien",
    src: "tmp/logo-harvest/mu/le-mauricien.png",
    explainer:
      "Official masthead/brand mark for Le Mauricien, sourced from the publisher's official site and visually verified.",
    licence:
      "Le Mauricien masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mu-defi-media",
    src: "tmp/logo-harvest/mu/defi-media.png",
    explainer:
      "Official masthead/brand mark for D\u00e9fi M\u00e9dia, sourced from the publisher's official site and visually verified.",
    licence:
      "D\u00e9fi M\u00e9dia masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mv-mihaaru",
    src: "tmp/logo-harvest/mv/mihaaru.png",
    explainer:
      "Official masthead/brand mark for Mihaaru, sourced from the publisher's official site and visually verified.",
    licence:
      "Mihaaru masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mv-avas",
    src: "tmp/logo-harvest/mv/avas.jpg",
    explainer:
      "Official masthead/brand mark for Avas, sourced from Wikimedia Commons and visually verified.",
    licence:
      "Avas masthead trademark bundled from Wikimedia Commons (File:Logo of AVAS.jpg) for educational reference in Learn mode.",
  },
  {
    id: "mv-the-edition",
    src: "tmp/logo-harvest/mv/the-edition.png",
    explainer:
      "Official masthead/brand mark for The Edition, sourced from the publisher's official site and visually verified.",
    licence:
      "The Edition masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mv-psm-news",
    src: "tmp/logo-harvest/mv/psm-news.png",
    explainer:
      "Official masthead/brand mark for PSM News, sourced from the publisher's official site and visually verified.",
    licence:
      "PSM News masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mw-the-nation",
    src: "tmp/logo-harvest/mw/the-nation.png",
    explainer:
      "Official masthead/brand mark for The Nation, sourced from the publisher's official site and visually verified.",
    licence:
      "The Nation masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mw-malawi24",
    src: "tmp/logo-harvest/mw/malawi24.png",
    explainer:
      "Official masthead/brand mark for Malawi24, sourced from the publisher's official site and visually verified.",
    licence:
      "Malawi24 masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mw-nyasa-times",
    src: "tmp/logo-harvest/mw/nyasa-times.png",
    explainer:
      "Official masthead/brand mark for Nyasa Times, sourced from the publisher's official site and visually verified.",
    licence:
      "Nyasa Times masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mw-mana",
    src: "tmp/logo-harvest/mw/mana.png",
    explainer:
      "Official masthead/brand mark for Mana Online, sourced from the publisher's official site and visually verified.",
    licence:
      "Mana Online masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "my-utusan-malaysia",
    src: "tmp/logo-harvest/my/utusan-malaysia.png",
    explainer:
      "Official masthead/brand mark for Utusan Malaysia, sourced from the publisher's official site and visually verified.",
    licence:
      "Utusan Malaysia masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mz-carta",
    src: "tmp/logo-harvest/mz/carta.png",
    explainer:
      "Official masthead/brand mark for Carta de Mo\u00e7ambique, sourced from the publisher's official site and visually verified.",
    licence:
      "Carta de Mo\u00e7ambique masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "na-new-era",
    src: "tmp/logo-harvest/na/new-era.jpg",
    explainer:
      "Official masthead/brand mark for New Era, sourced from Wikimedia Commons and visually verified.",
    licence:
      "New Era masthead trademark bundled from Wikimedia Commons (File:New-Era-Logo.jpg) for educational reference in Learn mode.",
  },
  {
    id: "na-the-namibian",
    src: "tmp/logo-harvest/na/the-namibian.png",
    explainer:
      "Official masthead/brand mark for The Namibian, sourced from the publisher's official site and visually verified.",
    licence:
      "The Namibian masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "na-namibian-sun",
    src: "tmp/logo-harvest/na/namibian-sun.png",
    explainer:
      "Official masthead/brand mark for Namibian Sun, sourced from the publisher's official site and visually verified.",
    licence:
      "Namibian Sun masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "na-observer",
    src: "tmp/logo-harvest/na/observer.png",
    explainer:
      "Official masthead/brand mark for Windhoek Observer, sourced from the publisher's official site and visually verified.",
    licence:
      "Windhoek Observer masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ne-le-sahel",
    src: "tmp/logo-harvest/ne/le-sahel.jpg",
    explainer:
      "Official masthead/brand mark for Le Sahel, sourced from the publisher's official site and visually verified.",
    licence:
      "Le Sahel masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ne-air-info",
    src: "tmp/logo-harvest/ne/air-info.png",
    explainer:
      "Official masthead/brand mark for A\u00efr Info, sourced from the publisher's official site and visually verified.",
    licence:
      "A\u00efr Info masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ni-confidencial",
    src: "tmp/logo-harvest/ni/confidencial.jpg",
    explainer:
      "Official masthead/brand mark for Confidencial, sourced from the publisher's official site and visually verified.",
    licence:
      "Confidencial masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "np-gorkhapatra",
    src: "tmp/logo-harvest/np/gorkhapatra.svg",
    explainer:
      "Official masthead/brand mark for Gorkhapatra, sourced from the publisher's official site and visually verified.",
    licence:
      "Gorkhapatra masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "np-nagarik",
    src: "tmp/logo-harvest/np/nagarik.png",
    explainer:
      "Official masthead/brand mark for Nagarik, sourced from the publisher's official site and visually verified.",
    licence:
      "Nagarik masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "np-onlinekhabar",
    src: "tmp/logo-harvest/np/onlinekhabar.svg",
    explainer:
      "Official masthead/brand mark for Onlinekhabar, sourced from the publisher's official site and visually verified.",
    licence:
      "Onlinekhabar masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "om-oman-daily-observer",
    src: "tmp/logo-harvest/om/oman-daily-observer.svg",
    explainer:
      "Official masthead/brand mark for Oman Daily Observer, sourced from the publisher's official site and visually verified.",
    licence:
      "Oman Daily Observer masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "om-muscat-daily",
    src: "tmp/logo-harvest/om/muscat-daily.webp",
    explainer:
      "Official masthead/brand mark for Muscat Daily, sourced from the publisher's official site and visually verified.",
    licence:
      "Muscat Daily masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "om-shabiba",
    src: "tmp/logo-harvest/om/shabiba.svg",
    explainer:
      "Official masthead/brand mark for Shabiba, sourced from the publisher's official site and visually verified.",
    licence:
      "Shabiba masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "pa-critica",
    src: "tmp/logo-harvest/pa/critica.png",
    explainer:
      "Official masthead/brand mark for Cr\u00edtica, sourced from the publisher's official site and visually verified.",
    licence:
      "Cr\u00edtica masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "pa-midiario",
    src: "tmp/logo-harvest/pa/midiario.png",
    explainer:
      "Official masthead/brand mark for Mi Diario, sourced from the publisher's official site and visually verified.",
    licence:
      "Mi Diario masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "pe-correo",
    src: "tmp/logo-harvest/pe/correo.jpg",
    explainer:
      "Official masthead/brand mark for Correo, sourced from the publisher's official site and visually verified.",
    licence:
      "Correo masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "pe-wayka",
    src: "tmp/logo-harvest/pe/wayka.png",
    explainer:
      "Official masthead/brand mark for Wayka, sourced from the publisher's official site and visually verified.",
    licence:
      "Wayka masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "pg-post-courier",
    src: "tmp/logo-harvest/pg/post-courier.webp",
    explainer:
      "Official masthead/brand mark for Post-Courier, sourced from the publisher's official site and visually verified.",
    licence:
      "Post-Courier masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "pg-the-national",
    src: "tmp/logo-harvest/pg/the-national.png",
    explainer:
      "Official masthead/brand mark for The National, sourced from the publisher's official site and visually verified.",
    licence:
      "The National masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ps-wattan",
    src: "tmp/logo-harvest/ps/wattan.png",
    explainer:
      "Official masthead/brand mark for Wattan News, sourced from the publisher's official site and visually verified.",
    licence:
      "Wattan News masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "pw-island-times",
    src: "tmp/logo-harvest/pw/island-times.png",
    explainer:
      "Official masthead/brand mark for Island Times Palau, sourced from the publisher's official site and visually verified.",
    licence:
      "Island Times Palau masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "py-abc-color",
    src: "tmp/logo-harvest/py/abc-color.jpg",
    explainer:
      "Official masthead/brand mark for ABC Color, sourced from Wikimedia Commons and visually verified.",
    licence:
      "ABC Color masthead trademark bundled from Wikimedia Commons (File:ABC color logo.jpg) for educational reference in Learn mode.",
  },
  {
    id: "py-ultima-hora",
    src: "tmp/logo-harvest/py/ultima-hora.png",
    explainer:
      "Official masthead/brand mark for \u00daltima Hora, sourced from the publisher's official site and visually verified.",
    licence:
      "\u00daltima Hora masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "py-la-nacion",
    src: "tmp/logo-harvest/py/la-nacion.png",
    explainer:
      "Official masthead/brand mark for La Naci\u00f3n Paraguay, sourced from the publisher's official site and visually verified.",
    licence:
      "La Naci\u00f3n Paraguay masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "py-extra",
    src: "tmp/logo-harvest/py/extra.svg",
    explainer:
      "Official masthead/brand mark for Diario Extra, sourced from the publisher's official site and visually verified.",
    licence:
      "Diario Extra masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "py-hoy",
    src: "tmp/logo-harvest/py/hoy.svg",
    explainer:
      "Official masthead/brand mark for Hoy, sourced from the publisher's official site and visually verified.",
    licence:
      "Hoy masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "qa-the-peninsula",
    src: "tmp/logo-harvest/qa/the-peninsula.png",
    explainer:
      "Official masthead/brand mark for The Peninsula, sourced from the publisher's official site and visually verified.",
    licence:
      "The Peninsula masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "qa-qatar-tribune",
    src: "tmp/logo-harvest/qa/qatar-tribune.png",
    explainer:
      "Official masthead/brand mark for Qatar Tribune, sourced from the publisher's official site and visually verified.",
    licence:
      "Qatar Tribune masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "rs-vecernje-novosti",
    src: "tmp/logo-harvest/rs/vecernje-novosti.png",
    explainer:
      "Official masthead/brand mark for Ve\u010dernje Novosti, sourced from the publisher's official site and visually verified.",
    licence:
      "Ve\u010dernje Novosti masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "rs-nova-rs",
    src: "tmp/logo-harvest/rs/nova-rs.svg",
    explainer:
      "Official masthead/brand mark for Nova.rs, sourced from the publisher's official site and visually verified.",
    licence:
      "Nova.rs masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "rw-the-new-times",
    src: "tmp/logo-harvest/rw/the-new-times.png",
    explainer:
      "Official masthead/brand mark for The New Times, sourced from the publisher's official site and visually verified.",
    licence:
      "The New Times masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "rw-kigali-today",
    src: "tmp/logo-harvest/rw/kigali-today.png",
    explainer:
      "Official masthead/brand mark for Kigali Today (KT Press), sourced from the publisher's official site and visually verified.",
    licence:
      "Kigali Today (KT Press) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sb-island-sun",
    src: "tmp/logo-harvest/sb/island-sun.png",
    explainer:
      "Official masthead/brand mark for Island Sun, sourced from the publisher's official site and visually verified.",
    licence:
      "Island Sun masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sc-seychelles-nation",
    src: "tmp/logo-harvest/sc/seychelles-nation.png",
    explainer:
      "Official masthead/brand mark for Seychelles Nation, sourced from the publisher's official site and visually verified.",
    licence:
      "Seychelles Nation masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sd-al-sudani",
    src: "tmp/logo-harvest/sd/al-sudani.png",
    explainer:
      "Official masthead/brand mark for Al-Sudani, sourced from the publisher's official site and visually verified.",
    licence:
      "Al-Sudani masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sd-sudanile",
    src: "tmp/logo-harvest/sd/sudanile.png",
    explainer:
      "Official masthead/brand mark for Sudanile, sourced from the publisher's official site and visually verified.",
    licence:
      "Sudanile masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sd-ayin",
    src: "tmp/logo-harvest/sd/ayin.png",
    explainer:
      "Official masthead/brand mark for Ayin Network, sourced from the publisher's official site and visually verified.",
    licence:
      "Ayin Network masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "si-delo",
    src: "tmp/logo-harvest/si/delo.svg",
    explainer:
      "Official masthead/brand mark for Delo, sourced from the publisher's official site and visually verified.",
    licence:
      "Delo masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "si-slovenske-novice",
    src: "tmp/logo-harvest/si/slovenske-novice.svg",
    explainer:
      "Official masthead/brand mark for Slovenske novice, sourced from the publisher's official site and visually verified.",
    licence:
      "Slovenske novice masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sk-aktuality",
    src: "tmp/logo-harvest/sk/aktuality.svg",
    explainer:
      "Official masthead/brand mark for Aktuality.sk, sourced from the publisher's official site and visually verified.",
    licence:
      "Aktuality.sk masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sk-plus-jeden-den",
    src: "tmp/logo-harvest/sk/plus-jeden-den.png",
    explainer:
      "Official masthead/brand mark for Plus jeden de\u0148, sourced from Wikimedia Commons and visually verified.",
    licence:
      "Plus jeden de\u0148 masthead trademark bundled from Wikimedia Commons (File:Logo Plus JEDEN DEN.png) for educational reference in Learn mode.",
  },
  {
    id: "sl-swit-salone",
    src: "tmp/logo-harvest/sl/swit-salone.png",
    explainer:
      "Official masthead/brand mark for SwitSalone, sourced from the publisher's official site and visually verified.",
    licence:
      "SwitSalone masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sl-politico",
    src: "tmp/logo-harvest/sl/politico.jpg",
    explainer:
      "Official masthead/brand mark for Politico SL, sourced from the publisher's official site and visually verified.",
    licence:
      "Politico SL masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sm-smrtv-notizie",
    src: "tmp/logo-harvest/sm/smrtv-notizie.png",
    explainer:
      "Official masthead/brand mark for San Marino RTV (SMRTV Notizie), sourced from the publisher's official site and visually verified.",
    licence:
      "San Marino RTV (SMRTV Notizie) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sn-le-soleil",
    src: "tmp/logo-harvest/sn/le-soleil.webp",
    explainer:
      "Official masthead/brand mark for Le Soleil, sourced from the publisher's official site and visually verified.",
    licence:
      "Le Soleil masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sn-seneweb",
    src: "tmp/logo-harvest/sn/seneweb.png",
    explainer:
      "Official masthead/brand mark for Seneweb, sourced from Wikimedia Commons and visually verified.",
    licence:
      "Seneweb masthead trademark bundled from Wikimedia Commons (File:Logo seneweb.png) for educational reference in Learn mode.",
  },
  {
    id: "so-garowe-online",
    src: "tmp/logo-harvest/so/garowe-online.svg",
    explainer:
      "Official masthead/brand mark for Garowe Online, sourced from the publisher's official site and visually verified.",
    licence:
      "Garowe Online masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "so-horseed",
    src: "tmp/logo-harvest/so/horseed.png",
    explainer:
      "Official masthead/brand mark for Horseed Media, sourced from the publisher's official site and visually verified.",
    licence:
      "Horseed Media masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "so-goobjoog",
    src: "public/newspaper-logos/so/goobjoog.png",
    explainer:
      "Official masthead/brand mark for Goobjoog News, sourced from the publisher's official site and visually verified.",
    licence:
      "Goobjoog News masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sr-dagblad-suriname",
    src: "tmp/logo-harvest/sr/dagblad-suriname.png",
    explainer:
      "Official masthead/brand mark for Dagblad Suriname, sourced from the publisher's official site and visually verified.",
    licence:
      "Dagblad Suriname masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sr-starnieuws",
    src: "tmp/logo-harvest/sr/starnieuws.svg",
    explainer:
      "Official masthead/brand mark for Starnieuws, sourced from the publisher's official site and visually verified.",
    licence:
      "Starnieuws masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sr-dwtonline",
    src: "tmp/logo-harvest/sr/dwtonline.jpg",
    explainer:
      "Official masthead/brand mark for DwT Online, sourced from the publisher's official site and visually verified.",
    licence:
      "DwT Online masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "st-tela-non",
    src: "tmp/logo-harvest/st/tela-non.png",
    explainer:
      "Official masthead/brand mark for T\u00e9la N\u00f3n, sourced from the publisher's official site and visually verified.",
    licence:
      "T\u00e9la N\u00f3n masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sv-la-prensa-grafica",
    src: "tmp/logo-harvest/sv/la-prensa-grafica.png",
    explainer:
      "Official masthead/brand mark for La Prensa Gr\u00e1fica, sourced from Wikimedia Commons and visually verified.",
    licence:
      "La Prensa Gr\u00e1fica masthead trademark bundled from Wikimedia Commons (File:Logo de La Prensa Gr\u00e1fica.png) for educational reference in Learn mode.",
  },
  {
    id: "sv-el-diario-de-hoy",
    src: "tmp/logo-harvest/sv/el-diario-de-hoy.svg",
    explainer:
      "Official masthead/brand mark for El Diario de Hoy, sourced from the publisher's official site and visually verified.",
    licence:
      "El Diario de Hoy masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sv-el-faro",
    src: "tmp/logo-harvest/sv/el-faro.jpg",
    explainer:
      "Official masthead/brand mark for El Faro, sourced from Wikimedia Commons and visually verified.",
    licence:
      "El Faro masthead trademark bundled from Wikimedia Commons (File:Logo El Faro.jpg) for educational reference in Learn mode.",
  },
  {
    id: "sv-diario-el-salvador",
    src: "tmp/logo-harvest/sv/diario-el-salvador.png",
    explainer:
      "Official masthead/brand mark for Diario El Salvador, sourced from Wikimedia Commons and visually verified.",
    licence:
      "Diario El Salvador masthead trademark bundled from Wikimedia Commons (File:Logo of Diario El Salvador.png) for educational reference in Learn mode.",
  },
  {
    id: "sv-el-mundo",
    src: "tmp/logo-harvest/sv/el-mundo-alt1.svg",
    explainer:
      "Official masthead/brand mark for Diario El Mundo, sourced from the publisher's official site and visually verified.",
    licence:
      "Diario El Mundo masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sy-al-watan",
    src: "tmp/logo-harvest/sy/al-watan.svg",
    explainer:
      "Official masthead/brand mark for Al-Watan, sourced from the publisher's official site and visually verified.",
    licence:
      "Al-Watan masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sy-enab-baladi",
    src: "tmp/logo-harvest/sy/enab-baladi.jpg",
    explainer:
      "Official masthead/brand mark for Enab Baladi, sourced from the publisher's official site and visually verified.",
    licence:
      "Enab Baladi masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sy-syria-direct",
    src: "tmp/logo-harvest/sy/syria-direct.png",
    explainer:
      "Official masthead/brand mark for Syria Direct, sourced from the publisher's official site and visually verified.",
    licence:
      "Syria Direct masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sz-times-of-eswatini",
    src: "tmp/logo-harvest/sz/times-of-eswatini.png",
    explainer:
      "Official masthead/brand mark for Times of Eswatini, sourced from the publisher's official site and visually verified.",
    licence:
      "Times of Eswatini masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sz-ebuswini-observer",
    src: "tmp/logo-harvest/sz/ebuswini-observer.png",
    explainer:
      "Official masthead/brand mark for Eswatini Observer, sourced from Wikimedia Commons and visually verified.",
    licence:
      "Eswatini Observer masthead trademark bundled from Wikimedia Commons (File:Eswatini Observer-Logo.png) for educational reference in Learn mode.",
  },
];

function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

function patchEntry(src, id, fields) {
  // Find the object block for this id and replace noImageReason with logo fields
  const idRe = new RegExp(`"id":\\s*"${id}"`);
  const m = idRe.exec(src);
  if (!m) throw new Error(`id not found: ${id}`);
  // Walk backwards to find the opening `{` of this object (previous `{` after a `[` or `,`)
  let start = m.index;
  while (start > 0 && src[start] !== "{") start--;
  // Find matching close brace
  let depth = 0,
    i = start,
    inStr = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") {
        i++;
        continue;
      }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inStr = c;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  let block = src.slice(start, i);
  if (!block.includes("noImageReason") && block.includes('"logo"')) {
    console.log(`  skip ${id} (already has logo)`);
    return src;
  }
  if (!block.includes("noImageReason")) {
    throw new Error(`${id}: expected noImageReason to replace`);
  }
  // Remove noImageReason line
  block = block.replace(/\s*"noImageReason":\s*"(?:\\.|[^"\\])*",?\n?/, "\n");
  // Insert logo fields before sources (or at end before closing)
  const insert = `      "logo": ${JSON.stringify(fields.logo)},\n      "logoExplainer": ${JSON.stringify(fields.explainer)},\n      "licenceNote": ${JSON.stringify(fields.licence)},\n`;
  if (/"sources":/.test(block)) {
    block = block.replace(/(\n\s*)"sources":/, `\n${insert}$1"sources":`);
  } else {
    block = block.replace(/\n(\s*)\}$/, `,\n${insert}$1}`);
  }
  // tidy double commas / trailing commas before }
  block = block.replace(/,(\s*),/g, ",$1").replace(/,(\s*)\}/g, "$1}");
  return src.slice(0, start) + block + src.slice(i);
}

function main() {
  let papers = readFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), "utf8");
  let agencies = readFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), "utf8");
  let installed = 0;
  for (const row of MANIFEST) {
    const abs = resolve(ROOT, row.src);
    if (!existsSync(abs)) throw new Error(`missing source ${row.src}`);
    const buf = readFileSync(abs);
    const kind =
      buf[0] === 0x89
        ? "png"
        : buf[0] === 0xff
          ? "jpg"
          : buf.toString("utf8", 0, 200).includes("<svg")
            ? "svg"
            : buf.toString("latin1", 0, 4) === "RIFF"
              ? "webp"
              : extname(row.src).slice(1).replace("jpeg", "jpg");
    const cc = row.id.slice(0, 2);
    const slug = row.id.slice(3);
    const relDir = `newspaper-logos/${cc}`;
    const destDir = resolve(ROOT, "public", relDir);
    mkdirSync(destDir, { recursive: true });
    const destName = `${slug}.${kind === "jpeg" ? "jpg" : kind}`;
    const destAbs = join(destDir, destName);
    copyFileSync(abs, destAbs);
    const logoPath = `${relDir}/${destName}`;
    const fields = { logo: logoPath, explainer: row.explainer, licence: row.licence };
    console.log(`install ${row.id} → ${logoPath} (${buf.length}b sha=${sha256(buf).slice(0, 12)})`);
    let found = false;
    if (papers.includes(`"id": "${row.id}"`)) {
      papers = patchEntry(papers, row.id, fields);
      found = true;
    }
    if (agencies.includes(`"id": "${row.id}"`)) {
      agencies = patchEntry(agencies, row.id, fields);
      found = true;
    }
    if (!found) {
      throw new Error(`id ${row.id} not in papers or agencies`);
    }
    installed++;
  }
  writeFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), papers);
  writeFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), agencies);
  console.log(`\nInstalled ${installed} logos.`);
}

main();
