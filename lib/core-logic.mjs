export const ROUND_MODE_VALUES = new Set(["normal", "cycle_no_repeat", "elimination"]);

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function sanitizeRoundMode(value, fallback = "normal") {
  if (typeof value === "string" && ROUND_MODE_VALUES.has(value)) {
    return value;
  }
  return fallback;
}

export function sanitizeSpinDurationRange(minValue, maxValue, minLimit = 1, maxLimit = 60) {
  const parse = (value, fallback) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      return fallback;
    }
    return clamp(Math.round(parsed), minLimit, maxLimit);
  };

  const min = parse(minValue, 5);
  const max = parse(maxValue, 8);
  return min <= max ? [min, max] : [max, min];
}

export function distributeUnits(weights, targetUnits) {
  const size = Array.isArray(weights) ? weights.length : 0;
  if (size === 0 || targetUnits <= 0) {
    return new Array(size).fill(0);
  }

  const clean = weights.map((w) => Math.max(0, Number(w) || 0));
  const totalWeight = clean.reduce((acc, value) => acc + value, 0);

  if (totalWeight === 0) {
    const even = Math.floor(targetUnits / size);
    const units = new Array(size).fill(even);
    let remainder = targetUnits - even * size;
    for (let i = 0; i < size && remainder > 0; i += 1) {
      units[i] += 1;
      remainder -= 1;
    }
    return units;
  }

  const exact = clean.map((weight) => (weight / totalWeight) * targetUnits);
  const units = exact.map((value) => Math.floor(value));
  let remainder = targetUnits - units.reduce((acc, value) => acc + value, 0);

  const order = exact
    .map((value, index) => ({ index, fraction: value - units[index] }))
    .sort((a, b) => b.fraction - a.fraction);

  for (let i = 0; i < order.length && remainder > 0; i += 1) {
    units[order[i].index] += 1;
    remainder -= 1;
  }

  return units;
}

export function weightedRandomIndex(items, randomFn = Math.random) {
  if (!Array.isArray(items) || items.length === 0) {
    return -1;
  }
  const total = items.reduce((acc, item) => acc + Math.max(0, Number(item?.pct) || 0), 0);
  if (total <= 0) {
    return 0;
  }
  const target = randomFn() * total;
  let cursor = 0;
  for (let i = 0; i < items.length; i += 1) {
    cursor += Math.max(0, Number(items[i]?.pct) || 0);
    if (target <= cursor) {
      return i;
    }
  }
  return items.length - 1;
}

export function sanitizeRoundCycleRemainingIds(rawIds, visibleIds) {
  const visible = new Set(Array.isArray(visibleIds) ? visibleIds.filter(Boolean) : []);
  if (!Array.isArray(rawIds) || visible.size === 0) {
    return [];
  }
  const seen = new Set();
  const result = [];
  rawIds.forEach((id) => {
    const value = typeof id === "string" ? id.trim() : "";
    if (!value || seen.has(value) || !visible.has(value)) {
      return;
    }
    seen.add(value);
    result.push(value);
  });
  return result;
}

export function parseBulkParticipants(rawText) {
  return String(rawText || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const chars = Array.from(line);
      const first = chars[0] || "";
      const likelyEmoji = /\p{Extended_Pictographic}/u.test(first);
      if (likelyEmoji) {
        const rest = line.slice(first.length).trim();
        return {
          emoji: first,
          name: rest || "Jugador",
        };
      }
      return {
        emoji: "😀",
        name: line,
      };
    });
}

export function sanitizeSpinHistory(input, maxEntries = 500) {
  if (!input || typeof input !== "object") {
    return { version: 1, entries: [] };
  }
  const entries = (Array.isArray(input.entries) ? input.entries : [])
    .map((entry, index) => ({
      id: typeof entry?.id === "string" && entry.id.trim() ? entry.id.trim() : `spin_${index + 1}`,
      timestamp: Math.max(0, Math.round(Number(entry?.timestamp) || 0)),
      winnerParticipantId:
        typeof entry?.winnerParticipantId === "string" ? entry.winnerParticipantId.trim() : "",
      winnerName: typeof entry?.winnerName === "string" ? entry.winnerName.trim() : "Jugador",
      winnerEmoji: typeof entry?.winnerEmoji === "string" && entry.winnerEmoji.trim() ? entry.winnerEmoji : "😀",
    }))
    .filter((entry) => entry.winnerParticipantId)
    .slice(-maxEntries);

  return {
    version: 1,
    entries,
  };
}
