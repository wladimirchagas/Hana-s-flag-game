/**
 * Shared internal-border mesh for the Learn-mode world-map overlay.
 *
 * Given one country's subdivision FeatureCollection, returns a MultiLineString
 * of edges that appear on two or more subdivision rings (internal borders
 * only), stitched into continuous polylines. Coastline / national-outline
 * edges (count 1) are dropped — the country layer already draws those solid.
 *
 * Used by:
 *   - scripts/build-world-subnational-borders.mjs (precompute the asset)
 *   - (logic mirrored in spirit by the runtime loader, which now only fetches)
 */

/** Quantise so nearly-identical vertices from adjacent polygons hash equal (~110 m). */
export const MESH_COORD_DECIMALS = 3;

/**
 * @param {[number, number]} p
 * @returns {string}
 */
export function qKey(p) {
  return `${p[0].toFixed(MESH_COORD_DECIMALS)},${p[1].toFixed(MESH_COORD_DECIMALS)}`;
}

/**
 * @param {[number, number]} a
 * @param {[number, number]} b
 * @returns {string}
 */
export function edgeKey(a, b) {
  const ka = qKey(a);
  const kb = qKey(b);
  return ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`;
}

/**
 * @param {unknown} geometry
 * @returns {[number, number][][]}
 */
export function outerRingsOf(geometry) {
  const g = geometry;
  if (!g || typeof g !== "object") return [];
  if (g.type === "Polygon") return [g.coordinates[0]].filter(Boolean);
  if (g.type === "MultiPolygon") {
    return g.coordinates.map((poly) => poly[0]).filter(Boolean);
  }
  return [];
}

/**
 * Round a lon/lat to the mesh quantisation used for matching — the world-map
 * overlay never needs more precision than this.
 * @param {[number, number]} p
 * @returns {[number, number]}
 */
export function roundCoord(p) {
  const f = 10 ** MESH_COORD_DECIMALS;
  return [Math.round(p[0] * f) / f, Math.round(p[1] * f) / f];
}

/**
 * @param {string} countryCode
 * @param {{ type: string, features: Array<{ geometry?: unknown }> }} featureCollection
 * @returns {{ type: "Feature", properties: { name: string, iso_3166_2: string }, geometry: { type: "MultiLineString", coordinates: [number, number][][] } } | null}
 */
export function countryInternalMesh(countryCode, featureCollection) {
  const counts = new Map();
  const coords = new Map();

  for (const f of featureCollection.features ?? []) {
    for (const ring of outerRingsOf(f.geometry)) {
      for (let i = 0; i < ring.length - 1; i++) {
        const a = ring[i];
        const b = ring[i + 1];
        if (a[0] === b[0] && a[1] === b[1]) continue;
        const key = edgeKey(a, b);
        counts.set(key, (counts.get(key) ?? 0) + 1);
        if (!coords.has(key)) coords.set(key, [a, b]);
      }
    }
  }

  const adj = new Map();
  const internalKeys = [];
  for (const [key, n] of counts) {
    if (n < 2) continue;
    internalKeys.push(key);
    const pair = coords.get(key);
    if (!pair) continue;
    const ka = qKey(pair[0]);
    const kb = qKey(pair[1]);
    if (!adj.has(ka)) adj.set(ka, []);
    if (!adj.has(kb)) adj.set(kb, []);
    adj.get(ka).push(key);
    adj.get(kb).push(key);
  }
  if (internalKeys.length === 0) return null;

  const used = new Set();
  const lines = [];

  function otherEnd(key, from) {
    const pair = coords.get(key);
    const ka = qKey(pair[0]);
    return ka === from ? qKey(pair[1]) : ka;
  }

  function pointFor(key, endpoint) {
    const pair = coords.get(key);
    return qKey(pair[0]) === endpoint ? pair[0] : pair[1];
  }

  function walk(startKey) {
    used.add(startKey);
    const startPair = coords.get(startKey);
    let left = qKey(startPair[0]);
    let right = qKey(startPair[1]);
    const line = [roundCoord(startPair[0]), roundCoord(startPair[1])];

    let tip = right;
    for (;;) {
      const next = (adj.get(tip) ?? []).find((k) => !used.has(k));
      if (!next) break;
      used.add(next);
      const far = otherEnd(next, tip);
      line.push(roundCoord(pointFor(next, far)));
      tip = far;
    }

    tip = left;
    for (;;) {
      const next = (adj.get(tip) ?? []).find((k) => !used.has(k));
      if (!next) break;
      used.add(next);
      const far = otherEnd(next, tip);
      line.unshift(roundCoord(pointFor(next, far)));
      tip = far;
    }
    return line;
  }

  for (const key of internalKeys) {
    if (used.has(key)) continue;
    lines.push(walk(key));
  }

  // Drop vertices that sit within ~3 km of the chord between their
  // neighbours. Topology (which borders exist) is unchanged; only the
  // source polygons' excess digitisation is thinned so the world-map
  // overlay projects and paints quickly.
  const simplified = lines.map((line) => simplifyPolyline(line, 0.03));

  return {
    type: "Feature",
    properties: {
      name: `${countryCode}-subnational-borders`,
      iso_3166_2: countryCode,
    },
    geometry: { type: "MultiLineString", coordinates: simplified },
  };
}

/**
 * Ramer–Douglas–Peucker. `tolerance` is in degrees (planar approx is fine
 * at this scale for thinning display polylines).
 * @param {[number, number][]} line
 * @param {number} tolerance
 * @returns {[number, number][]}
 */
export function simplifyPolyline(line, tolerance) {
  if (line.length <= 2) return line;
  const sqTol = tolerance * tolerance;

  function sqSegDist(p, a, b) {
    let x = a[0];
    let y = a[1];
    let dx = b[0] - x;
    let dy = b[1] - y;
    if (dx !== 0 || dy !== 0) {
      const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        x = b[0];
        y = b[1];
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }
    dx = p[0] - x;
    dy = p[1] - y;
    return dx * dx + dy * dy;
  }

  function rdp(start, end, keep) {
    let maxSq = 0;
    let idx = 0;
    for (let i = start + 1; i < end; i++) {
      const sq = sqSegDist(line[i], line[start], line[end]);
      if (sq > maxSq) {
        idx = i;
        maxSq = sq;
      }
    }
    if (maxSq > sqTol) {
      if (idx - start > 1) rdp(start, idx, keep);
      keep.push(line[idx]);
      if (end - idx > 1) rdp(idx, end, keep);
    }
  }

  const keep = [line[0]];
  rdp(0, line.length - 1, keep);
  keep.push(line[line.length - 1]);
  return keep;
}
