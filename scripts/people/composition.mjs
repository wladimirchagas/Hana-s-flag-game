// Documented demographic composition used to compose the image-generation
// prompts in scripts/build-people-images.mjs.
//
// HARD RULE (mirrors the repo's "never invent flag content" rule): the ethnic /
// cultural group lists below are DOCUMENTED DATA, not invented. Each entry cites
// the authoritative source its composition is drawn from. Groups are listed in
// rough order of population share so the prompt asks for a realistic mix. Never
// fabricate or guess a country's composition — add a country only with a cited
// source, and keep the citation in the comment.
//
// `groups`  — major cultural/ethnic groups, largest first, phrased so an image
//             model produces authentic (not stereotyped) people.
// `setting` — a recognizable, everyday location in the country (NOT a tourist
//             cliché) for the background.

export const COMPOSITION = {
  BR: {
    name: "Brazil",
    // Source: IBGE 2022 Census (self-declared cor/raça): pardo ~45%, branca ~43%,
    // preta ~10.2%, indígena ~0.8%, amarela ~0.4%. Plus established heritage
    // communities (Japanese-Brazilian, Levantine-Arab Brazilian) noted by IBGE.
    groups: [
      "people of mixed (pardo) heritage",
      "people of White European descent (Portuguese, Italian, German)",
      "Afro-Brazilian people of African descent",
      "Indigenous Brazilian people",
      "Japanese-Brazilian people of East Asian descent",
      "Brazilian people of Levantine Arab (Lebanese/Syrian) descent",
    ],
    setting:
      "a lively, sunny seafront promenade in a Brazilian coastal city, with tropical greenery and pastel buildings",
  },

  MY: {
    name: "Malaysia",
    // Source: Malaysia Dept. of Statistics (DOSM) 2023: Bumiputera ~70% (Malay +
    // Orang Asli + Sabah/Sarawak indigenous), Chinese ~22.4%, Indian ~6.6%.
    groups: [
      "Malay people",
      "Malaysian Chinese people",
      "Malaysian Indian people (Tamil heritage)",
      "indigenous Orang Asli and Bornean (Iban, Kadazan) people",
    ],
    setting:
      "a bustling covered street market in a Malaysian city at dusk, warm string lights, modern shopfronts",
  },

  JP: {
    name: "Japan",
    // Source: Japan Statistics Bureau. Population is predominantly ethnic Japanese
    // (~97-98%), with established minorities: Ryukyuan (Okinawan), Ainu, and
    // resident Korean and Chinese communities. Composition is far less varied
    // than Brazil/Malaysia — the prompt should reflect that honestly, not force
    // artificial diversity, while still spanning ages and family types.
    groups: [
      "Japanese people",
      "Okinawan (Ryukyuan) Japanese people",
      "long-resident Zainichi Korean and Chinese people",
    ],
    setting:
      "a clean Japanese city street near a train station, modern signage in Japanese, cherry or ginkgo trees",
  },

  NG: {
    name: "Nigeria",
    // Source: standard references on Nigeria's ethnic composition: Hausa-Fulani
    // (north), Yoruba (southwest), Igbo (southeast) are the three largest, plus
    // Ijaw, Kanuri, Tiv and many others; religiously split Muslim (north) /
    // Christian (south).
    groups: [
      "Hausa-Fulani people",
      "Yoruba people",
      "Igbo people",
      "Ijaw, Kanuri and Tiv people",
    ],
    setting:
      "a vibrant Nigerian urban street with colourful low-rise buildings, market stalls and palm trees",
  },

  FR: {
    name: "France",
    // Source: France does not collect official ethnic statistics, but its
    // population reflects long-standing immigration: White French of European
    // origin alongside large communities of Maghrebi (Algerian, Moroccan,
    // Tunisian), Sub-Saharan African, and Asian (Vietnamese, Chinese) heritage,
    // and people from the overseas départements (Caribbean, Réunion).
    groups: [
      "White French people of European descent",
      "French people of Maghrebi (North African) descent",
      "French people of Sub-Saharan African descent",
      "French people of Caribbean and Réunionnais (overseas-département) descent",
      "French people of East and Southeast Asian descent",
    ],
    setting:
      "a Parisian-style café terrace on a tree-lined boulevard, Haussmann buildings, overcast soft daylight",
  },
};

// Codes covered by the current pilot. Keep in sync with the pilot scope; the
// script defaults to generating these when no --code is passed.
export const PILOT_CODES = ["BR", "MY", "JP", "NG", "FR"];

/**
 * Compose the structured image-generation prompt for one country from its
 * documented composition. The prompt asks for the diversity dimensions the
 * feature requires (ethnicity, age, gender, same- and opposite-sex couples)
 * while explicitly steering away from folkloric/stereotyped costume.
 */
export function buildPrompt(code) {
  const c = COMPOSITION[code];
  if (!c) throw new Error(`No documented composition for ${code}`);
  const groups = c.groups.join("; ");
  return [
    `Photorealistic, professionally-shot candid documentary group photograph of about seven everyday people who live in ${c.name}, gathered together in ${c.setting}.`,
    `The group naturally spans all ages: at least one young child, one or two teenagers or young adults, several middle-aged adults, and one or two elderly seniors, with a balance of women and men.`,
    `Show two couples shown warmly and tastefully (holding hands or an arm around a shoulder): one same-sex couple and one opposite-sex couple.`,
    `The people authentically reflect the real cultural and ethnic diversity of ${c.name}: ${groups}.`,
    `Everyone wears contemporary, everyday clothing suited to the local climate and culture — modern, ordinary and authentic, NOT folkloric costumes, NOT national dress, NOT tourist stereotypes.`,
    `Natural daylight, candid relaxed expressions, 35mm reportage style, shallow depth of field, sharp focus, realistic skin texture and natural body diversity.`,
    `No text, no captions, no watermarks, no logos, and no flags anywhere in the image.`,
  ].join(" ");
}
