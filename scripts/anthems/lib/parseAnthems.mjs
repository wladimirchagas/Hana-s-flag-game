// Parses src/data/nationalAnthems.ts via regex without invoking the TS compiler.
// Returns a record keyed by ISO 3166-1 alpha-2 code with the country-level
// scalar fields (title, titleEn, wikiFile, language, instrumental) plus a
// summary of the lines array (count, whether word-level timestamps exist).
//
// The shape is intentionally limited to what Phase 1 (catalog + gap audit)
// needs. Lyric text itself is never returned — only counts — so callers cannot
// accidentally emit copyrighted content.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_PATH = path.resolve(__dirname, "..", "..", "..", "src", "data", "nationalAnthems.ts");

const STRING_VALUE_RE = /"((?:[^"\\]|\\.)*)"/;

function unescape(s) {
  return s
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, "\\");
}

function readScalar(header, key) {
  const re = new RegExp(`(?:^|[,{\\s])${key}: ${STRING_VALUE_RE.source}`);
  const m = header.match(re);
  return m ? unescape(m[1]) : undefined;
}

function readFlagTrue(header, key) {
  const re = new RegExp(`(?:^|[,{\\s])${key}: true(?:[,\\s}]|$)`);
  return re.test(header);
}

function splitHeaderAndLines(blockBody) {
  const i = blockBody.indexOf("lines:");
  if (i < 0) return { header: blockBody, linesBody: "" };
  return { header: blockBody.slice(0, i), linesBody: blockBody.slice(i) };
}

function parseBlock(code, blockBody) {
  const { header, linesBody } = splitHeaderAndLines(blockBody);

  const title = readScalar(header, "title");
  const titleEn = readScalar(header, "titleEn");
  const wikiFile = readScalar(header, "wikiFile");
  const wikiSearch = readScalar(header, "wikiSearch");
  const language = readScalar(header, "language");
  const instrumental = readFlagTrue(header, "instrumental");

  const lineCount = linesBody ? (linesBody.match(/\{\s*text:\s*"/g) || []).length : 0;
  const linesWithWordTimings = linesBody ? (linesBody.match(/\bwords:\s*\[/g) || []).length : 0;
  const hasWordTimestamps = linesWithWordTimings > 0;

  return {
    iso2: code,
    title,
    titleEn,
    wikiFile,
    wikiSearch,
    language,
    instrumental,
    lineCount,
    linesWithWordTimings,
    hasWordTimestamps,
  };
}

export function parseAnthems(filePath = DEFAULT_PATH) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`nationalAnthems.ts not found at ${filePath}`);
  }
  const src = fs.readFileSync(filePath, "utf8");

  const startIdx = src.indexOf("NATIONAL_ANTHEMS");
  if (startIdx < 0) throw new Error("export NATIONAL_ANTHEMS not found");
  const openIdx = src.indexOf("= {", startIdx);
  if (openIdx < 0) throw new Error("object literal start not found");

  const blockHeaderRe = /^  ([A-Z]{2}): \{\s*$/gm;
  blockHeaderRe.lastIndex = openIdx + 3;

  const starts = [];
  let m;
  while ((m = blockHeaderRe.exec(src)) !== null) {
    starts.push({ code: m[1], headerEnd: blockHeaderRe.lastIndex });
  }

  const entries = {};
  for (let i = 0; i < starts.length; i++) {
    const { code, headerEnd } = starts[i];
    const nextStart = starts[i + 1]?.headerEnd ?? src.indexOf("\n};", headerEnd);
    const blockBody = src.slice(headerEnd, nextStart);
    entries[code] = parseBlock(code, blockBody);
  }
  return entries;
}

export const ANTHEMS_TS_PATH = DEFAULT_PATH;
