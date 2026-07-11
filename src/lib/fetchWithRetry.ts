/**
 * fetch() with a small exponential-backoff retry.
 *
 * Why this exists: the Learn-mode map data (`countries-50m.json` and the
 * per-country `subdivisions/*.json`) is fetched live from the network. A single
 * dropped request — common on flaky mobile connections and VPNs — used to leave
 * the map permanently BLANK with no recovery (`WorldProgressMap` sets an empty
 * feature list on any fetch failure). Retrying a couple of times with backoff
 * recovers from those transient drops within the same load, and the service
 * worker's runtime cache (see `vite.config.ts`) serves the data offline on
 * subsequent loads.
 *
 * Only transient failures are retried: a network throw or a 5xx response. A 4xx
 * (e.g. a genuine 404 for a country with no subdivision file) is returned as-is
 * so callers can treat it as a real "no data" answer, not something to retry.
 */
export async function fetchWithRetry(
  url: string,
  { retries = 2, baseDelayMs = 400 }: { retries?: number; baseDelayMs?: number } = {},
): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      // 4xx is a definitive answer — don't retry it.
      if (res.ok || (res.status >= 400 && res.status < 500)) return res;
      lastError = new Error(`HTTP ${res.status}`);
    } catch (err) {
      lastError = err;
    }
    if (attempt < retries) {
      const delay = baseDelayMs * 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError instanceof Error ? lastError : new Error(`Failed to fetch ${url}`);
}
