// Manifest of AI-generated "people of this country" images that have been
// human-reviewed and approved for display in Learn mode.
//
// HARD RULE: a country's "See people from this country" button only appears
// when its ISO alpha-2 code is listed in PEOPLE_IMAGE_CODES below AND the file
// public/people/{code}.webp exists. Generating an image file (via
// scripts/build-people-images.mjs) does NOT make it appear — a human must
// review the image first and then add the code here. This mirrors the repo's
// "never trust a bulk-imported asset as correct by default" rule for flags.
//
// The images are AI-generated illustrative composites built from documented
// demographic data (see scripts/people/composition.mjs), not photographs of
// real people — hence the mandatory caption below.

export const PEOPLE_IMAGE_CAPTION =
  "AI-generated illustrative composite — not photographs of real individuals.";

// ISO alpha-2 codes (uppercase) with an approved, bundled people image.
// Add a code here ONLY after visually reviewing public/people/{code}.webp.
export const PEOPLE_IMAGE_CODES: ReadonlySet<string> = new Set<string>([
  // Pilot countries are added here once their generated image has been reviewed.
]);

export function hasPeopleImage(code: string): boolean {
  return PEOPLE_IMAGE_CODES.has(code.toUpperCase());
}

export function peopleImageUrl(code: string, baseUrl: string): string {
  return `${baseUrl}people/${code.toLowerCase()}.webp`;
}
