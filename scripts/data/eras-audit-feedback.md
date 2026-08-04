# Historical Eras Audit — Feedback & Open Actions

## Sporadic User Feedback (All Sessions)

### Open Issues (Awaiting Fix)

(None currently — all reported issues addressed)

### Completed Fixes

- **Iberian Union (1580-1640) in ad1600**: Merged separate "Spanish Empire" + "Portuguese Empire" entries into single "Iberian Union" polity with combined population (12M), expanded note explaining unified crown and combined global dominance. Validation: eras:check-flags ✓. [Reported 2026-08-04, Fixed 2026-08-04]

### Historical Corrections Previously Applied (Earlier Sessions)

- **Brazil in 1880**: Was incorrectly marked as "Kingdom of Brazil" — user corrected to Empire of Brazil (accurate for 1880 period, which was the Brazilian Empire under Dom Pedro II). [Applied in earlier batch]

- **Ottoman Empire 1600 flag anachronism**: User queried whether Ottoman flag looked anachronistic for 1600 era — verified as correctly handled by `flagExistedInEra()` gate (all Ottoman entries use `noFlag: true`). [Verified in earlier session]

---

## Process Notes

**Standing mandate:** Track ALL sporadic user feedback in this file as it arrives. Never lose track of corrections, edge cases, or issues the user reports while working on other batches. Update this file whenever:
- User reports a new issue
- A fix is applied
- An issue is verified/closed
- New feedback arrives

**Format:** Each issue includes:
- What was wrong/reported
- When reported
- When fixed (if applicable)
- Link to verification

---

**Last updated:** 2026-08-04 09:35 PM AEST
**Current batch:** PR #891 (Iberian Union fix) — CI running, awaiting merge
**Next batch:** Batch 28 (bc500 expansion) — queued to start after PR #891 merge
