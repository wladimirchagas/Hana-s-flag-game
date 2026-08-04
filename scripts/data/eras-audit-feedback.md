# Historical Eras Audit — Feedback & Open Actions

**Complete chat history extracted and analyzed. 98 user messages reviewed.**

---

## All Feedback from User (Extracted from Chat History)

### Flagged Missing Flags (by era/country)

- **Malaysia 1960**: "has no flag" [Reported: Session 1]
- **Syria 1960**: "has no flag yet" [Reported: Session 1]
- **Brazil 1960**: "has no flag yet" [Reported: Session 1]
- **Albania 1945**: "has no flag yet" [Reported: Session 1]
- **Germany 1938**: "has no flag yet" (note: "germanu" in user feedback) [Reported: Session 1]
- **Hungary 1938**: "has no flag yet" [Reported: Session 1]
- **Turkey 1938**: "has no flag yet" [Reported: Session 1]
- **Ceylon (Sri Lanka) 1920**: "has no flag yet" [Reported: Session 1]
- **Egypt 1920**: "has no flag yet" [Reported: Session 1]
- **Ottoman Empire 1920**: "has no flag yet" (note: "ottomon empira" in feedback) [Reported: Session 1]
- **Hungary 1920**: "has no flag yet" [Reported: Session 1]
- **Brazil 1920**: "has no flag yet" [Reported: Session 1]
- **Philippines 1914**: "flag looks anachronic to me" [Reported: Session 1]
- **Brazil 1914**: "still has no flag yet" [Reported: Session 1]

### Historical Accuracy Issues

- **Malaysia 1945**: "shouldn't exist, or should it?" (existence questionable) [Reported: Session 1]
- **Malaysia 1938**: "didn't exist with this name, or did it?" (name/entity validation) [Reported: Session 1]
- **Mongolia 1938**: "seems incorrect?" [Reported: Session 1]
- **Malaysia 1920**: "shouldn't exist as such, should it?" [Reported: Session 1]
- **Classical Greece in Bronze Age (bc500)**: "no classical greek entity selectable in the bronze age, that's no accurate, right?" — User questions whether classical Greek entities should exist in this period. [Reported: Session 1]
- **Greece map rendering in 500 BC**: "greek territory is physically disconnected from the european continent in the 500bc era!!!" (with screenshot) — Geographic rendering issue. [Reported: Session 1]
- **Brazil 1900**: "was no longer a kingdom; it's also missing a flag" (with screenshot) [Reported: Session 1]
- **Brazil 1880**: "was an empire, not a kingdom" — Correction to Empire of Brazil (accurate for 1880 under Dom Pedro II) [Reported: Session 1]
- **Ottoman Empire 1600**: "flag looks anachronyc?" — Query about flag anachronism for this era [Reported: Session 1]
- **Iberian Union (1580-1640)**: "completely misrepresented in the map/flag" — Spanish Empire and Portuguese Empire were shown as separate entities instead of unified Iberian Union [Reported: 2026-08-04, FIXED 2026-08-04]

### Process & Methodology Feedback

- **Ordering/Priority**: "3 first, then 2, then 1" (user preference on task ordering) [Reported: Session 1]
- **Root cause analysis mandate**: "Whenever you fix an issue because you found or because i've provided feedback, YOU MUST ALWAYS understand if the same/a similar issue impacted other entries. Then prevent the root cause issue from ever happening again by updating hard coded rules if necessary. Do this going forward, but also retrospectivelly." [Reported: Session 1] ⚠️ **CRITICAL MANDATE**
- **Permission & autonomy**: "Yes, I told you earlier not to ask for permission; as long as you're operating within the hard coded rules, go ahead so we can fix things asap" [Reported: Session 1]
- **Workflow**: "merge first, then continue" (instruction for batch workflow) [Reported: Session 1]
- **Feedback tracking**: "have you been taking notes of all the sporadic feedback i provide while you are working on other tasks to make sure you don't lose track of it and act on it later?" (user checking on accountability system) [Reported: 2026-08-04]

---

## Completed Fixes

- **Iberian Union (1580-1640) in ad1600** ✓
  - Issue: Separate "Spanish Empire" + "Portuguese Empire" entries; historically unified under one crown 1580-1640
  - Fix: Merged into single "Iberian Union" polity, combined population 12M, expanded note
  - Validation: npm run eras:check-flags ✓
  - [Fixed: 2026-08-04]

---

## Open Issues (Status Unknown / Awaiting Triage)

### Flag-related (likely auto-handled by modern era data, needs verification)
- Malaysia 1960, Syria 1960, Brazil 1960, Albania 1945, Germany 1938, Hungary 1938, Turkey 1938, Ceylon 1920, Egypt 1920, Ottoman 1920, Hungary 1920, Brazil 1920, Philippines 1914, Brazil 1914

### Historical Accuracy (needs investigation)
- Malaysia 1945, 1938, 1920 (existence/naming validation)
- Mongolia 1938 (accuracy check)
- Classical Greece in Bronze Age / 500 BC (entity existence and geographic rendering)
- Brazil 1900 (type label correction — was Kingdom, not proper designation)

---

## Critical Mandates (From User)

1. **Root cause analysis & prevention** — When fixing any issue (found or reported), MUST trace back to understand if similar issues affected other entries, and prevent recurrence via hard-coded rule updates. Apply retrospectively too.

2. **Track ALL sporadic feedback** — Never lose track of user-provided corrections/observations while working on other tasks. This file is the single source of truth.

3. **Autonomy within hard rules** — Don't ask for permission between batches; proceed autonomously as long as following hard-coded rules in CLAUDE.md.

---

**Last updated:** 2026-08-04 21:45 AEST (Complete extraction + analysis)
**Extraction method:** Full JSONL chat history (98 user messages) parsed and reviewed
**Next action:** Triage unknown-status issues, investigate geographic/historical accuracy problems
