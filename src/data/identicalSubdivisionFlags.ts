// Divisions of one country that fly the SAME flag.
//
// In the Sub-national flags game a flag shown for one member of a group is just
// as much the flag of the others, so every member is accepted as the answer.
// A quiz question must have exactly one correct answer; where two places really
// do share a flag, the honest fix is to accept both, never to swap in a
// different image or drop one of them.
//
// Every group is sourced: the flags are documented as identical, not merely
// alike. `scripts/check-identical-subdivision-flags.mjs` rasterises every
// division flag and fails the build when two in one country look near-identical
// but are neither grouped here nor listed in the check's REVIEWED_DISTINCT.

export interface IdenticalFlagGroup {
  /** Subdivision codes, all in one country, whose flags are identical. */
  codes: readonly string[];
  /** One sentence on why the flags are the same. */
  note: string;
  /** Where that is documented. */
  source: string;
}

export const IDENTICAL_SUBDIVISION_FLAG_GROUPS: readonly IdenticalFlagGroup[] = [
  {
    codes: ["AE-AJ", "AE-DU"],
    note: "Ajman and Dubai both fly a red field with a white bar at the hoist.",
    source: "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates#Flag_of_each_emirate",
  },
  {
    codes: ["AE-RK", "AE-SH"],
    note: "Ras Al Khaimah and Sharjah, ruled by two branches of the same house, fly the same flag.",
    source: "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates#Flag_of_each_emirate",
  },
  {
    codes: ["CO-NAR", "CO-VID"],
    note: "Vichada’s flag is exactly Nariño’s, in its colours and its proportions.",
    source: "https://es.wikipedia.org/wiki/Bandera_del_Vichada",
  },
  {
    codes: ["FR-2A", "FR-2B"],
    note: "Both Corsican departments are shown with the flag of Corsica; neither has one of its own.",
    source: "https://fr.wikipedia.org/wiki/Drapeau_de_la_Corse",
  },
  {
    codes: ["LI-01", "LI-03"],
    note: "Balzers and Gamprin both fly three equal stripes, blue, yellow and blue.",
    source: "https://www.crwflags.com/fotw/flags/li-ba.html",
  },
];

const TWINS: ReadonlyMap<string, readonly string[]> = new Map(
  IDENTICAL_SUBDIVISION_FLAG_GROUPS.flatMap((g) =>
    g.codes.map((code) => [code, g.codes.filter((c) => c !== code)] as const),
  ),
);

/** The other divisions whose flag is identical to `code`'s; empty when there are none. */
export function identicalFlagTwins(code: string): readonly string[] {
  return TWINS.get(code) ?? [];
}
