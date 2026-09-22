#!/usr/bin/env node
/**
 * Download World Values Survey Wave 7 country-results PDFs via a real Chromium
 * session (curl against AJDownload.jsp returns a 1-byte empty body).
 *
 * Usage:
 *   node scripts/download-wvs-country-results.mjs [--only=AD,MX] [--limit=N]
 *
 * Inventory: scripts/data/wvs-wave7-inventory.json
 * Output:    data/wvs/wave7/country-results/
 */
import { chromium } from "playwright";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  renameSync,
} from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const INVENTORY = resolve(ROOT, "scripts/data/wvs-wave7-inventory.json");
const OUT_DIR = resolve(ROOT, "data/wvs/wave7/country-results");
const MANIFEST = resolve(ROOT, "data/wvs/manifest.json");
const BASE = "https://www.worldvaluessurvey.org";

const args = process.argv.slice(2);
const onlyArg = args.find((a) => a.startsWith("--only="));
const limitArg = args.find((a) => a.startsWith("--limit="));
const onlyIsos = onlyArg
  ? new Set(onlyArg.slice("--only=".length).split(",").map((s) => s.trim().toUpperCase()))
  : null;
const limit = limitArg ? Number(limitArg.slice("--limit=".length)) : Infinity;

mkdirSync(OUT_DIR, { recursive: true });

const inventory = JSON.parse(readFileSync(INVENTORY, "utf8"));
const manifest = existsSync(MANIFEST)
  ? JSON.parse(readFileSync(MANIFEST, "utf8"))
  : { entries: [] };
const haveDoids = new Set(
  (manifest.entries || [])
    .filter((e) => e.kind === "country_results_by_sex_age" && e.wave === 7)
    .map((e) => String(e.doid)),
);

function padDoid(doid) {
  return `F${String(doid).padStart(8, "0")}`;
}

function safeFilename(title, doid) {
  // Prefer archive-style name reconstructed from title.
  const cleaned = String(title)
    .replace(/[|]/g, "/")
    .replace(/\s+/g, "_")
    .replace(/[^\w.\-()]+/g, "")
    .replace(/_+/g, "_");
  const id = padDoid(doid);
  if (cleaned.toLowerCase().includes("world_values_survey")) {
    return `${id}-${cleaned}.pdf`;
  }
  return `${id}-${cleaned || "WVS_Wave7"}.pdf`;
}

let todo = inventory.documents.filter((d) => d.doid && !haveDoids.has(String(d.doid)));
if (onlyIsos) todo = todo.filter((d) => onlyIsos.has(String(d.iso2).toUpperCase()));
todo = todo.slice(0, limit);

console.log(
  `Inventory docs with DOID: ${inventory.documents.filter((d) => d.doid).length}; ` +
    `already in manifest: ${haveDoids.size}; to download: ${todo.length}`,
);

if (todo.length === 0) {
  console.log("Nothing to download.");
  process.exit(0);
}

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--disable-blink-features=AutomationControlled"],
});
const context = await browser.newContext({
  acceptDownloads: true,
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
});
const page = await context.newPage();
page.setDefaultTimeout(120_000);

// Warm session on the archive index.
await page.goto(`${BASE}/AJDocumentation.jsp?CndWAVE=7`, {
  waitUntil: "domcontentloaded",
});
await page.waitForTimeout(1500);

const results = [];

async function downloadOne(doc) {
  const { doid, said, iso2, country, title, version } = doc;
  const label = `${iso2} ${country} DOID=${doid}`;
  console.log(`\n→ ${label}`);

  // Load the society sample page (carries DOID hidden field + DocDownload).
  const resp = await page.request.post(`${BASE}/AJDocumentationSmpl.jsp`, {
    form: {
      ulthost: "WVS",
      SAID: String(said),
      CndWAVE: "7",
      AJArchive: "WVS Data Archive",
    },
  });
  const html = await resp.text();
  if (!html.includes(`DocDownload('${doid}')`) && !html.includes(`DocDownload("${doid}")`)) {
    throw new Error(`sample page for SAID ${said} does not list DOID ${doid}`);
  }

  // In-page fetch with cookies — same path the Americas agent confirmed works.
  const pdfBytes = await page.evaluate(
    async ({ base, doid, said }) => {
      const body = new URLSearchParams({
        ulthost: "WVS",
        DOID: String(doid),
        CndWAVE: "7",
        SAID: String(said),
        AJArchive: "WVS Data Archive",
      });
      const r = await fetch(`${base}/AJDownload.jsp`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const buf = await r.arrayBuffer();
      const u8 = new Uint8Array(buf);
      // Return as base64 in chunks would blow memory for ~3MB×N — return as
      // number array only for small probes; for real size use binary transfer.
      // Playwright evaluate can't return ArrayBuffer cleanly across all versions,
      // so encode base64 here.
      let binary = "";
      const chunk = 0x8000;
      for (let i = 0; i < u8.length; i += chunk) {
        binary += String.fromCharCode(...u8.subarray(i, i + chunk));
      }
      return {
        status: r.status,
        contentType: r.headers.get("content-type") || "",
        disposition: r.headers.get("content-disposition") || "",
        size: u8.length,
        b64: btoa(binary),
      };
    },
    { base: BASE, doid, said },
  );

  if (pdfBytes.size < 10_000) {
    throw new Error(
      `download too small (${pdfBytes.size} bytes) type=${pdfBytes.contentType}`,
    );
  }
  const buf = Buffer.from(pdfBytes.b64, "base64");
  if (buf.subarray(0, 5).toString("ascii") !== "%PDF-") {
    throw new Error(`not a PDF (header ${buf.subarray(0, 8).toString("ascii")})`);
  }

  let filename = safeFilename(title, doid);
  // Prefer Content-Disposition filename when present.
  const m = /filename\*?=(?:UTF-8''|")?([^";]+)/i.exec(pdfBytes.disposition);
  if (m) {
    const remote = decodeURIComponent(m[1].replace(/"/g, "").trim());
    if (remote.toLowerCase().endsWith(".pdf")) {
      filename = remote.includes("F000") ? remote : `${padDoid(doid)}-${remote}`;
    }
  }

  const outPath = resolve(OUT_DIR, basename(filename));
  const tmp = `${outPath}.partial`;
  writeFileSync(tmp, buf);
  renameSync(tmp, outPath);
  const sha256 = createHash("sha256").update(buf).digest("hex");
  console.log(`  saved ${basename(outPath)} (${buf.length} bytes) sha256=${sha256.slice(0, 12)}…`);
  return {
    doid: String(doid),
    said: Number(said),
    iso2,
    country,
    title,
    version,
    filename: basename(outPath),
    path: `data/wvs/wave7/country-results/${basename(outPath)}`,
    bytes: buf.length,
    sha256,
    contentType: pdfBytes.contentType,
  };
}

for (const doc of todo) {
  let attempt = 0;
  let lastErr;
  while (attempt < 3) {
    attempt += 1;
    try {
      const r = await downloadOne(doc);
      results.push({ ok: true, ...r });
      lastErr = null;
      break;
    } catch (err) {
      lastErr = err;
      console.error(`  attempt ${attempt} failed: ${err.message || err}`);
      await page.waitForTimeout(2000 * attempt);
    }
  }
  if (lastErr) {
    results.push({
      ok: false,
      doid: String(doc.doid),
      iso2: doc.iso2,
      country: doc.country,
      error: String(lastErr.message || lastErr),
    });
  }
}

await browser.close();

const reportPath = resolve(ROOT, "scripts/data/wvs-download-report.json");
writeFileSync(reportPath, JSON.stringify({ generated_at_utc: new Date().toISOString(), results }, null, 2));
const ok = results.filter((r) => r.ok).length;
const fail = results.length - ok;
console.log(`\nDone. ok=${ok} fail=${fail}. Report: ${reportPath}`);
if (fail) process.exitCode = 1;
