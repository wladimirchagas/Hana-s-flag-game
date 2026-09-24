// Build gate: a check the rules SAY gates the build must actually run in CI,
// on a Node that can load it.
//
// Two failures this catches, both of which had shipped (2026-08-07):
//
//   1. A CHECK IN `flags:check` THAT NO CI JOB RUNS. CLAUDE.md states that
//      `check-historical-flag-anachronism.mjs` "fails the build ... in the
//      flag-integrity workflow" — the gate that stops a modern flag flying in
//      an era that never saw it (South Africa's 1994 flag on the 1914 map).
//      It appeared in the workflow's `paths:` filter and in a comment, and was
//      never invoked by a single `run:` step. Four more were in the same state,
//      and one of them was RED: `build-flag-aspect-ratios.mjs --check` failed
//      because 34 era flags bundled during the era audit were missing from
//      flagOverlayAspectRatios.ts, so Nepal's and Mongolia's pennants, Qatar
//      1936 and the 3:1 Persia/Montenegro flags all rendered at the default
//      ratio. That reached the live site, because nothing in CI ran the check.
//
//   2. A `.ts`-IMPORTING SCRIPT ON A NODE TOO OLD TO LOAD IT. Several era
//      checks `await import()` a TypeScript module directly and need native
//      type-stripping (Node 22.18+). On Node 20 they die with
//      `ERR_UNKNOWN_FILE_EXTENSION` before running a single assertion — the job
//      goes red for a reason that has nothing to do with the data, which is
//      what happened to `check-era-maps` before it was moved to Node 24. A red
//      check nobody can act on is worse than no check: it trains people to
//      ignore it.
//
// This does not verify a check PASSES (the checks do that). It verifies each one
// is wired somewhere it can actually run.
//
// Run: node scripts/check-ci-coverage.mjs   (npm run ci:check-coverage)

import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const WORKFLOW = "../.github/workflows/flag-integrity.yml";

/** Native TypeScript type-stripping is unflagged from this version on. */
const MIN_TS_NODE = [22, 18];

const failures = [];

/* ------------------------------------------------- what flags:check runs */
const pkg = JSON.parse(readFileSync(R("../package.json"), "utf8"));
const flagsCheck = pkg.scripts?.["flags:check"];
if (!flagsCheck) {
  console.error("✗ package.json has no `flags:check` script — the aggregate gate is gone.");
  process.exit(1);
}
const gateScripts = [...flagsCheck.matchAll(/scripts\/([\w.-]+\.mjs)/g)].map((m) => m[1]);

/* --------------------------------------- which scripts need a modern Node */
// A script that reads a .ts file as TEXT is fine anywhere; only a real
// `import()` of a .ts module needs type-stripping.
const needsModernNode = new Set(
  readdirSync(R("../scripts"))
    .filter((f) => f.endsWith(".mjs"))
    .filter((f) => /import\([^)]*\.ts"\)/.test(readFileSync(R(`../scripts/${f}`), "utf8"))),
);

/* --------------------------------------------------- what the workflow runs */
// Deliberately parsed as text rather than with a YAML library: this script is a
// build gate and must not depend on a package that may not be installed.
const wf = readFileSync(R(WORKFLOW), "utf8");

/** [{ id, node, scripts:Set }] — one entry per job, in file order. */
const jobs = [];
{
  const lines = wf.split("\n");
  let inJobs = false;
  let cur = null;
  for (const line of lines) {
    if (/^jobs:\s*$/.test(line)) { inJobs = true; continue; }
    if (!inJobs) continue;
    const job = line.match(/^  ([\w-]+):\s*$/);
    if (job) {
      cur = { id: job[1], node: null, scripts: new Set() };
      jobs.push(cur);
      continue;
    }
    if (!cur) continue;
    const nv = line.match(/node-version:\s*"?([\d.]+)"?/);
    if (nv) cur.node = nv[1];
    for (const m of line.matchAll(/scripts\/([\w.-]+\.mjs)/g)) {
      // `paths:` filter entries are quoted list items, not commands — a script
      // listed there is a TRIGGER, not a run. Only count real command lines.
      if (/^\s*-\s*"/.test(line)) continue;
      if (!/(^|\s)(run:|node|npm)\b/.test(line)) continue;
      cur.scripts.add(m[1]);
    }
  }
}

if (jobs.length === 0) {
  console.error(`✗ no jobs parsed from ${WORKFLOW} — the parser or the workflow shape changed.`);
  process.exit(1);
}

const ranBy = new Map(); // script -> [job, ...]
for (const j of jobs) {
  for (const s of j.scripts) {
    if (!ranBy.has(s)) ranBy.set(s, []);
    ranBy.get(s).push(j);
  }
}

/* ------------------------------------------------------------------ check 1 */
for (const s of new Set(gateScripts)) {
  if (!ranBy.has(s)) {
    const hint = wf.includes(s)
      ? "it IS named in the workflow (a paths: filter or a comment), but no step runs it — a filter is not a gate"
      : "it is absent from the workflow entirely";
    failures.push(
      `NOT GATED: scripts/${s} is in \`npm run flags:check\` but no CI job runs it — ${hint}. ` +
        `Add a step for it (a \`.ts\`-importing script must go in a job on Node ${MIN_TS_NODE.join(".")}+).`,
    );
  }
}

/* ------------------------------------------------------------------ check 2 */
const tooOld = (v) => {
  const [maj, min = 0] = String(v).split(".").map(Number);
  return maj < MIN_TS_NODE[0] || (maj === MIN_TS_NODE[0] && min < MIN_TS_NODE[1]);
};

for (const [s, js] of ranBy) {
  if (!needsModernNode.has(s)) continue;
  for (const j of js) {
    if (j.node == null) {
      failures.push(
        `NO NODE VERSION: job "${j.id}" runs scripts/${s}, which imports a .ts module, but pins no ` +
          `node-version — it inherits the runner default and will break when that moves below ` +
          `${MIN_TS_NODE.join(".")}. Pin it explicitly.`,
      );
    } else if (tooOld(j.node)) {
      failures.push(
        `NODE TOO OLD: job "${j.id}" runs scripts/${s} on Node ${j.node}, but that script ` +
          `\`import()\`s a TypeScript module and needs native type-stripping (${MIN_TS_NODE.join(".")}+). ` +
          `It will die with ERR_UNKNOWN_FILE_EXTENSION before checking anything. Move it to a ` +
          `Node ${MIN_TS_NODE.join(".")}+ job.`,
      );
    }
  }
}

/* ---------------------------------------- the Deploy build's own Node */
// `npm run build` runs `test:ui`, and the Deploy workflow builds on its own pinned Node. A
// `.ts`-importing check placed anywhere on that path kills the production build, and the
// merge then reaches nobody. That happened on 2026-09-24: the Country Personas check was
// added to `test:ui`, the Deploy workflow's Node 20 build died with
// ERR_UNKNOWN_FILE_EXTENSION, and the release did not ship.
const DEPLOY = "../.github/workflows/deploy.yml";
const deployWf = readFileSync(R(DEPLOY), "utf8");
const deployNode = deployWf.match(/node-version:\s*"?([\d.]+)"?/)?.[1] ?? null;
const buildChain = new Set();
const expand = (name, seen = new Set()) => {
  if (seen.has(name) || !pkg.scripts?.[name]) return;
  seen.add(name);
  const cmd = pkg.scripts[name];
  for (const m of cmd.matchAll(/scripts\/([\w.-]+\.mjs)/g)) buildChain.add(m[1]);
  for (const m of cmd.matchAll(/npm run ([\w:.-]+)/g)) expand(m[1], seen);
};
if (/npm run build\b/.test(deployWf)) expand("build");
for (const s of buildChain) {
  if (!needsModernNode.has(s)) continue;
  if (deployNode == null || tooOld(deployNode)) {
    failures.push(
      `DEPLOY BUILD BREAKS: \`npm run build\` runs scripts/${s}, which \`import()\`s a TypeScript ` +
        `module, but the Deploy workflow builds on Node ${deployNode ?? "(unset)"}. The production ` +
        `build will die with ERR_UNKNOWN_FILE_EXTENSION and nothing ships. Keep it in flags:check ` +
        `and a Node ${MIN_TS_NODE.join(".")}+ CI job, not on the build path.`,
    );
  }
}

/* ------------------------------------------------------------------- report */
console.log(
  `CI coverage: ${new Set(gateScripts).size} check(s) in flags:check, ` +
    `${ranBy.size} script(s) run across ${jobs.length} job(s), ` +
    `${needsModernNode.size} script(s) need Node ${MIN_TS_NODE.join(".")}+.`,
);
for (const j of jobs) {
  console.log(`  ${j.id.padEnd(24)} node=${String(j.node ?? "(unset)").padEnd(7)} ${j.scripts.size} script(s)`);
}
console.log(`  ${"deploy (npm run build)".padEnd(24)} node=${String(deployNode ?? "(unset)").padEnd(7)} ${buildChain.size} script(s)`);

// A CI check absent from flags:check is fine (the slow landmass raster and the
// era-flag sha256 re-verification are legitimately CI-only), but list them so
// the split stays deliberate rather than accidental.
const ciOnly = [...ranBy.keys()].filter((s) => !gateScripts.includes(s));
if (ciOnly.length > 0) console.log(`\nCI-only (not in flags:check): ${ciOnly.join(", ")}`);

if (failures.length > 0) {
  console.error(`\n✗ CI coverage check FAILED\n`);
  for (const f of failures) console.error(`  • ${f}`);
  console.error(
    `\nA check the rules say gates the build must actually run in CI. Wire the step up — ` +
      `never delete the check from flags:check to make this pass.`,
  );
  process.exit(1);
}

console.log("\n✓ every flags:check gate runs in CI, on a Node that can load it.");
