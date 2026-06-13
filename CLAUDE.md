# Hana's Flag Game — development guide

## Flag aspect ratios — hard rule, do not override without approval

Every national and territory flag SVG in `public/flags/` is sourced from
[hampusborgos/country-flags](https://github.com/hampusborgos/country-flags)
and encodes the **real-world aspect ratio** in its `viewBox`:

| Flag | viewBox | Ratio |
|------|---------|-------|
| France, most of Africa/Americas | `0 0 3 2` | 3:2 |
| Germany, Austria, Belgium | `0 0 5 3` | 5:3 |
| UK, Australia, New Zealand, Fiji | `0 0 60 30` | 2:1 |
| Switzerland, Vatican City | `0 0 32 32` | 1:1 |
| Qatar | `0 0 1400 550` | ~28:11 |
| Nepal | negative-origin viewBox | pentagon |
| Afghanistan | `0 0 1000 500` | 2:1 (Wikimedia override) |

### Rules — apply to all code changes, CSS, and flag downloads

1. **Never** add `aspect-ratio` to `.flag-card`, `.flag-grid__thumb`,
   `.flag-image`, or any other element that wraps a flag, in a way that
   overrides the SVG's natural proportions.

2. **Never** use `object-fit: cover` on flag `<img>` elements — it crops
   flags. Always use `object-fit: contain`.

3. **Never** download national/territory flags from `flagcdn.com` or the
   `flag-icons` npm package. These standardise every flag to `640×480` (4:3),
   destroying the real-world proportions. The correct source is
   `https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/{code}.svg`.

4. **Afghanistan exception**: `public/flags/af.svg` uses the Taliban / Islamic
   Emirate flag from Wikimedia Commons (pinned in `NATIONAL_SOURCE_OVERRIDES`
   in `scripts/download-flags.mjs`). Do not replace it with the hampusborgos
   file — that repo carries the pre-2021 Republic flag for `AF`.

### Enforcement

`npm run flags:check` (and the `flag-integrity` CI workflow) fail if any
bundled SVG has a forbidden standardised viewBox. Any PR that touches
`public/flags/` must pass this check.

To re-download all flags correctly:
```
node scripts/download-flags.mjs --force --national-only
```

## PR workflow — hard rule for all agents

After pushing a branch and creating a pull request, an agent **MUST**:

1. **Immediately merge** the PR (squash merge) — do not leave it open waiting for manual action unless the user has explicitly asked to review first.
2. **Confirm the merge succeeded** by checking the merge response.
3. **Report back** with:
   - Merge status (success/failure)
   - Current time in **AEST** (Australian Eastern Standard Time, UTC+10; or AEDT UTC+11 during daylight saving, which runs October–April)
   - The merge commit SHA (this is the build code/number)

Example confirmation message format:
> Merged ✓ — commit `b05323a` — 9:56 PM AEST

Do not report the time in UTC or any other timezone unless asked.
