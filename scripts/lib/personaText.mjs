// Country Personas — the ONE renderer for persona descriptions (owner-review draft and the app's
// generated data both use it, so they can never disagree).
//
// A description is a template. Figures are never typed by hand; they are tokens the renderer
// fills from the persona's profile (medians and member ranges computed from the snapshot):
//
//   {range:var}    the members' range, e.g. "1.4–2.1 children per woman"
//   {between:var}  the same range for "between … and …" prose, e.g. "46 and 74%"
//   {median:var}   the members' median, e.g. "$18,000"
//   {min:var} {max:var}
//   {n:var}        how many members have a figure for var
//   {size}         the persona's number of countries
//   {surveyed}     how many members the World Values Survey has covered
//   {all:var}      renders nothing; FAILS unless every member has var = 1 (e.g. an official language);
//                  {all:a|b} FAILS unless every member has at least one of them = 1
//   {none:var}     renders nothing; FAILS unless every member has var = 0
//   {under:var=N}  renders N (formatted); FAILS unless EVERY member has a figure and all are below N
//   {over:var=N}   renders N (formatted); FAILS unless EVERY member has a figure and all are above N
//                  — for true-of-everyone thresholds ("each has fewer than 400,000 people") where
//                  the members are too spread out for a median to be quotable
//   {every:var=Level}  renders nothing; FAILS unless every member has that rating/category
//                  (e.g. {every:idx_freedomHouse_rating=Free}) — so a plain-text claim such as
//                  "all are rated Free" is checked against the data too. {every:var=A|B} accepts
//                  any of the listed levels ("middle-income" = Lower middle | Upper middle).
//   {world:var>P} {world:var<P}  renders nothing; FAILS unless every member with a figure sits
//                  above (below) the world's P-th percentile — so "among the world's highest"
//                  ({world:var>90}) or "higher than in most countries" ({world:var>50}) is checked
//
// A sentence that quotes a figure some members lack must say so: it must contain "where reported"
// or "where surveyed", or the render fails.
//
// A numeric token is allowed ONLY when the variable is "quotable" for that persona: every observed
// member lies within 1 world standard deviation of the persona's median (owner, 2026-09-24:
// "the claimed averages are just that, averages … we should have stricter boundaries"). So no
// description can quote a figure that misdescribes one of its own members.

const pct = (v) => `${Math.abs(v) >= 10 || v === 0 ? Math.round(v) : Number(v.toFixed(1))}%`;
const sig = (v, digits = 2) => {
  if (v === 0) return 0;
  const p = Math.pow(10, Math.floor(Math.log10(Math.abs(v))) - digits + 1);
  return Math.round(v / p) * p;
};
const grouped = (v) => Math.round(v).toLocaleString("en-US");
function compact(v) {
  if (Math.abs(v) >= 1e9) return { num: `${Number((v / 1e9).toPrecision(2))}`, unit: " billion" };
  if (Math.abs(v) >= 1e6) return { num: `${Number((v / 1e6).toPrecision(2))}`, unit: " million" };
  return { num: grouped(sig(v, 2)), unit: "" };
}
const fixed = (d) => (v) => ({ num: Number(v).toFixed(d), unit: "" });

// var → (value) => { num, unit, prefix? }. A range repeats the prefix but states the unit once.
const FORMATS = {
  wb_population: (v) => ({ ...compact(v), unit: `${compact(v).unit} people`.replace(/^ /, " ") }),
  wb_gdppc_ppp: (v) => ({ prefix: "$", num: grouped(sig(v, 2)), unit: "" }),
  wb_gdppc_usd: (v) => ({ prefix: "$", num: grouped(sig(v, 2)), unit: "" }),
  wb_density: (v) => ({ num: grouped(sig(v, 2)), unit: " people per km²" }),
  wb_land_area: (v) => ({ num: grouped(sig(v, 2)), unit: " km²" }),
  wb_fertility: (v) => ({ num: v.toFixed(1), unit: " children per woman" }),
  wb_life_expectancy: (v) => ({ num: Math.round(v).toString(), unit: " years" }),
  wb_pop_growth: (v) => ({ num: v.toFixed(1), unit: "% a year" }),
  wb_tourist_arrivals: (v) => ({ ...compact(v), unit: `${compact(v).unit} visitors` }),
  wb_homicide: (v) => ({ num: v < 10 ? v.toFixed(1) : Math.round(v).toString(), unit: " per 100,000 people" }),
  wb_co2_pc: (v) => ({ num: v < 10 ? v.toFixed(1) : Math.round(v).toString(), unit: " tonnes of CO₂ per person" }),
  wb_gini: (v) => ({ num: Math.round(v).toString(), unit: "" }),
  idx_freedomHouse: (v) => ({ num: Math.round(v).toString(), unit: " out of 100" }),
  idx_cpi: (v) => ({ num: Math.round(v).toString(), unit: " out of 100" }),
  idx_rsfPress: (v) => ({ num: Math.round(v).toString(), unit: " out of 100" }),
  idx_softPower: (v) => ({ num: v.toFixed(1), unit: " out of 100" }),
  idx_imdCompetitiveness: (v) => ({ num: Math.round(v).toString(), unit: " out of 100" }),
  idx_vDem: (v) => ({ num: v.toFixed(2), unit: " out of 1" }),
  idx_wjpRuleOfLaw: (v) => ({ num: v.toFixed(2), unit: " out of 1" }),
  idx_genderGap: (v) => ({ num: v.toFixed(2), unit: " out of 1" }),
  idx_hdi: (v) => ({ num: v.toFixed(3), unit: " out of 1" }),
  idx_economist: (v) => ({ num: v.toFixed(1), unit: " out of 10" }),
  idx_happiness: (v) => ({ num: v.toFixed(1), unit: " out of 10" }),
  idx_gti: (v) => ({ num: v.toFixed(1), unit: " out of 10" }),
  idx_gpi: fixed(2),
  idx_etr: fixed(2),
  idx_digitalNews: (v) => ({ num: Math.round(v).toString(), unit: "%" }),
  wvs_god_importance: (v) => ({ num: v.toFixed(1), unit: " out of 10" }),
  wvs_abortion_justifiable: (v) => ({ num: v.toFixed(1), unit: " out of 10" }),
  wvs_homosexuality_justifiable: (v) => ({ num: v.toFixed(1), unit: " out of 10" }),
  wvs_autonomy: (v) => ({ num: `${v > 0 ? "+" : ""}${Math.round(v)}`, unit: " points" }),
  hist_independence_year: (v) => ({ num: Math.round(v).toString(), unit: "" }),
  hist_flag_adopted: (v) => ({ num: Math.round(v).toString(), unit: "" }),
};

const minus = (p) => ({ ...p, num: String(p.num).replace(/^-/, "−") });

export function formatParts(variable, meta, v) {
  return minus(rawParts(variable, meta, v));
}

function rawParts(variable, meta, v) {
  if (FORMATS[variable]) return FORMATS[variable](v);
  if (meta?.unit === "%" || variable.startsWith("rel_") || /\(%\)/.test(meta?.label ?? "")) {
    const s = pct(v);
    return { num: s.replace("%", ""), unit: "%" };
  }
  if (Number.isInteger(v)) return { num: grouped(v), unit: "" };
  return { num: Number(v.toPrecision(3)).toString(), unit: "" };
}

export function formatValue(variable, meta, v) {
  const p = formatParts(variable, meta, v);
  return `${p.prefix ?? ""}${p.num}${p.unit}`;
}

// Units that differ only in a scale word ("people" vs "million people") share their tail:
// "240,000 to 1.4 million people", not "240,000 people to 1.4 million people".
function sharedTail(a, b) {
  const tail = (u) => (u.match(/ (people|visitors)$/) || [""])[0];
  const t = tail(a.unit);
  return t && t === tail(b.unit) ? t : "";
}

export function formatRange(variable, meta, lo, hi) {
  const a = formatParts(variable, meta, lo);
  const b = formatParts(variable, meta, hi);
  if (`${a.prefix ?? ""}${a.num}${a.unit}` === `${b.prefix ?? ""}${b.num}${b.unit}`) return formatValue(variable, meta, lo);
  // a negative lower bound reads badly with an en dash ("−0.7–0.6%"), so say "to"
  const sep = String(a.num).startsWith("−") || String(b.num).startsWith("−") ? " to " : "–";
  if (a.unit === b.unit) return `${a.prefix ?? ""}${a.num}${sep}${b.prefix ?? ""}${b.num}${a.unit}`;
  const t = sharedTail(a, b);
  return `${a.prefix ?? ""}${a.num}${a.unit.slice(0, a.unit.length - t.length)} to ${b.prefix ?? ""}${b.num}${b.unit}`;
}

/** "46 and 74%", "1.4 and 2.1 children per woman", "$4,800 and $12,000" — for "between … and …". */
export function formatBetween(variable, meta, lo, hi) {
  const a = formatParts(variable, meta, lo);
  const b = formatParts(variable, meta, hi);
  if (a.unit === b.unit) return `${a.prefix ?? ""}${a.num} and ${b.prefix ?? ""}${b.num}${a.unit}`;
  const t = sharedTail(a, b);
  return `${a.prefix ?? ""}${a.num}${a.unit.slice(0, a.unit.length - t.length)} and ${b.prefix ?? ""}${b.num}${b.unit}`;
}

const TOKEN = /\{(range|between|median|min|max|n|all|none):([a-zA-Z0-9_|]+)\}|\{(size|surveyed)\}|\{every:([a-zA-Z0-9_]+)=([^}]+)\}|\{(under|over):([a-zA-Z0-9_]+)=([0-9.]+)\}|\{world:([a-zA-Z0-9_]+)([<>])([0-9.]+)\}/g;
const QUALIFIED = /\bwhere (reported|surveyed)\b/i;

/** World percentile of a value: the share (%) of countries with a figure that sit below it. */
export function worldPercentiles(values) {
  const cache = new Map();
  return (variable, x) => {
    if (!cache.has(variable)) {
      cache.set(variable, Object.values(values).map((row) => row?.[variable]?.v).filter((v) => typeof v === "number"));
    }
    const xs = cache.get(variable);
    return xs.length ? (100 * xs.filter((v) => v < x).length) / xs.length : NaN;
  };
}

/**
 * Render one template for one persona.
 *   profile   — { [var]: { n, median, min, max, quotable, share } } for this persona
 *   variables — snapshot variable metadata (labels, units)
 *   ctx       — { size, surveyed, worldPct?, members?, values? } (the last three back the
 *               {world:…} and {all:a|b} tokens)
 * Returns { text, errors, used } — `used` lists the variables the text quotes.
 */
export function renderTemplate(template, profile, variables, ctx) {
  const errors = [];
  const used = new Set();
  // Sentences are rendered one at a time so a figure some members lack can be required to sit in a
  // sentence that says "where reported" / "where surveyed".
  const sentences = template.split(/(?<=[.!?])(?=\s|\{)/);
  const text = sentences.map((sentence) => renderSentence(sentence)).join("");
  if (/\{[a-z]+(:[^}]+)?\}/.test(text)) errors.push(`unrecognised token left in: ${text.match(/\{[a-z]+(:[^}]+)?\}/)[0]}`);
  return { text: text.replace(/\s{2,}/g, " ").trim(), errors, used: [...used] };

  function partial(whole, row, sentence) {
    if (row && row.n < ctx.size && !QUALIFIED.test(sentence)) {
      errors.push(`${whole}: only ${row.n} of ${ctx.size} members have a figure, so its sentence must say "where reported" or "where surveyed"`);
    }
  }

  function renderSentence(sentence) {
    return sentence.replace(TOKEN, (whole, op, variable, bare, catVar, level, cmp, cmpVar, cmpValue, worldVar, worldDir, worldP) =>
      renderToken(sentence, whole, op, variable, bare, catVar, level, cmp, cmpVar, cmpValue, worldVar, worldDir, worldP));
  }

  function renderToken(sentence, whole, op, variable, bare, catVar, level, cmp, cmpVar, cmpValue, worldVar, worldDir, worldP) {
    if (bare === "size") return String(ctx.size);
    if (bare === "surveyed") return String(ctx.surveyed);
    if (worldVar) {
      const row = profile[worldVar];
      used.add(worldVar);
      const p = Number(worldP);
      if (!row || !("min" in row) || !ctx.worldPct) {
        errors.push(`${whole}: no figures to rank`);
        return "";
      }
      partial(whole, row, sentence);
      // percentile is monotone in the value: the lowest member decides ">", the highest "<"
      const edge = worldDir === ">" ? ctx.worldPct(worldVar, row.min) : ctx.worldPct(worldVar, row.max);
      const ok = worldDir === ">" ? edge > p : edge < p;
      if (!ok) errors.push(`${whole}: a member sits at the world's ${Math.round(edge)}th percentile`);
      return "";
    }
    if (cmp) {
      const row = profile[cmpVar];
      const n = Number(cmpValue);
      used.add(cmpVar);
      const ok = row && row.n === ctx.size && (cmp === "under" ? row.max < n : row.min > n);
      if (!ok) errors.push(`${whole}: not every member is ${cmp} ${n} (${row ? `${row.min}–${row.max}, n ${row.n}/${ctx.size}` : "no data"})`);
      return formatValue(cmpVar, variables[cmpVar], n);
    }
    if (catVar) {
      const row = profile[catVar];
      used.add(catVar);
      const allowed = level.split("|");
      const ok = row && row.n === ctx.size && Object.keys(row.levels ?? {}).every((l) => allowed.includes(l));
      if (!ok) errors.push(`${whole}: not every member has ${catVar} = ${level} (${row ? JSON.stringify(row.levels) : "no data"})`);
      return "";
    }
    if (op === "all" && variable.includes("|")) {
      // {all:a|b}: every member has at least one of the listed variables = 1
      const vars = variable.split("|");
      vars.forEach((v) => used.add(v));
      const off = (ctx.members ?? []).filter((m) => !vars.some((v) => ctx.values?.[m]?.[v]?.v === 1));
      if (!ctx.members || !ctx.values || off.length) errors.push(`${whole}: not every member has one of ${vars.join(", ")} = 1`);
      return "";
    }
    const row = profile[variable];
    if (!row) {
      errors.push(`${whole}: no profile row for ${variable}`);
      return whole;
    }
    used.add(variable);
    if (op === "all" || op === "none") {
      const want = op === "all" ? 1 : 0;
      if (row.n !== ctx.size || row.share !== want) errors.push(`${whole}: not every member has ${variable} = ${want} (share ${row.share}, n ${row.n}/${ctx.size})`);
      return "";
    }
    if (op === "n") return String(row.n);
    if (!row.quotable) {
      errors.push(`${whole}: ${variable} is not quotable for this persona — a member lies more than 1 world SD from the median`);
    }
    partial(whole, row, sentence);
    const meta = variables[variable];
    if (op === "range") return formatRange(variable, meta, row.min, row.max);
    if (op === "between") return formatBetween(variable, meta, row.min, row.max);
    if (op === "median") return formatValue(variable, meta, row.median);
    if (op === "min") return formatValue(variable, meta, row.min);
    return formatValue(variable, meta, row.max);
  }
}
