import "server-only";

/**
 * Limitation de débit en mémoire (par adresse IP).
 * Protection « au mieux » : sur Vercel, chaque instance a sa propre mémoire.
 * Pour une protection globale, brancher un stockage partagé (ex. Upstash Redis).
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  // Nettoyage occasionnel pour éviter la croissance de la Map
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return false;
}
