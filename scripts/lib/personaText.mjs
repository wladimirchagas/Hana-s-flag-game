// Country Personas — the ONE renderer for persona descriptions (owner-review draft and the app's
// generated data both use it, so they can never disagree).
//
// A description is a template. Figures are never typed by hand; they are tokens the renderer
// fills from the persona's profile (medians and member ranges computed from the snapshot):
//
//   {range:var}    the members' range, e.g. "1.4–2.1 children per woman"
//   {median:var}   the members' median, e.g. "$18,000"
//   {min:var} {max:var}
//   {n:var}        how many members have a figure for var
//   {size}         the persona's number of countries
//   {surveyed}     how many members the World Values Survey has covered
//   {all:var}      renders nothing; FAILS unless every member has var = 1 (e.g. an official language)
//   {none:var}     renders nothing; FAILS unless every member has var = 0
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

export function formatParts(variable, meta, v) {
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

export function formatRange(variable, meta, lo, hi) {
  const a = formatParts(variable, meta, lo);
  const b = formatParts(variable, meta, hi);
  if (`${a.prefix ?? ""}${a.num}${a.unit}` === `${b.prefix ?? ""}${b.num}${b.unit}`) return formatValue(variable, meta, lo);
  if (a.unit === b.unit) return `${a.prefix ?? ""}${a.num}–${b.prefix ?? ""}${b.num}${a.unit}`;
  return `${a.prefix ?? ""}${a.num}${a.unit} to ${b.prefix ?? ""}${b.num}${b.unit}`;
}

const TOKEN = /\{(range|median|min|max|n|all|none):([a-z0-9_]+)\}|\{(size|surveyed)\}/g;

/**
 * Render one template for one persona.
 *   profile   — { [var]: { n, median, min, max, quotable, share } } for this persona
 *   variables — snapshot variable metadata (labels, units)
 *   ctx       — { size, surveyed }
 * Returns { text, errors, used } — `used` lists the variables the text quotes.
 */
export function renderTemplate(template, profile, variables, ctx) {
  const errors = [];
  const used = new Set();
  const text = template.replace(TOKEN, (whole, op, variable, bare) => {
    if (bare === "size") return String(ctx.size);
    if (bare === "surveyed") return String(ctx.surveyed);
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
    const meta = variables[variable];
    if (op === "range") return formatRange(variable, meta, row.min, row.max);
    if (op === "median") return formatValue(variable, meta, row.median);
    if (op === "min") return formatValue(variable, meta, row.min);
    return formatValue(variable, meta, row.max);
  });
  if (/\{[a-z]+(:[a-z0-9_]+)?\}/.test(text)) errors.push(`unrecognised token left in: ${text.match(/\{[a-z]+(:[a-z0-9_]+)?\}/)[0]}`);
  return { text: text.replace(/\s{2,}/g, " ").trim(), errors, used: [...used] };
}
