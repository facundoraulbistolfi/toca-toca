export function defaultStats() {
  return {
    version: 3,
    lastWinner: null,
    streak: null,
    bestStreak: null,
    totals: [],
  };
}

export function sanitizeStats(input) {
  if (!input || typeof input !== 'object') {
    return defaultStats();
  }
  const totals = (Array.isArray(input.totals) ? input.totals : [])
    .map((entry) => ({
      participantId: typeof entry?.participantId === 'string' ? entry.participantId.trim() : '',
      count: Math.max(0, Math.round(Number(entry?.count) || 0)),
    }))
    .filter((entry) => entry.participantId && entry.count > 0);

  return {
    version: 3,
    lastWinner:
      input?.lastWinner && typeof input.lastWinner.participantId === 'string'
        ? {
            participantId: input.lastWinner.participantId.trim(),
            name: String(input.lastWinner.name || '').trim() || 'Jugador',
          }
        : null,
    streak:
      input?.streak && typeof input.streak.participantId === 'string'
        ? {
            participantId: input.streak.participantId.trim(),
            count: Math.max(1, Math.round(Number(input.streak.count) || 1)),
          }
        : null,
    bestStreak: null,
    totals,
  };
}

export function defaultStatsStore(initialStats = null) {
  return {
    version: 3,
    stats: sanitizeStats(initialStats || defaultStats()),
  };
}

export function sanitizeStatsStore(input) {
  if (!input || typeof input !== 'object') {
    return defaultStatsStore();
  }

  if (input?.stats && typeof input.stats === 'object') {
    return {
      version: 3,
      stats: sanitizeStats(input.stats),
    };
  }

  const rawByProfile = input?.byProfile;
  if (rawByProfile && typeof rawByProfile === 'object' && !Array.isArray(rawByProfile)) {
    const rawEntries = Object.entries(rawByProfile);
    if (rawEntries.length === 0) {
      return defaultStatsStore();
    }
    const preferredEntry = rawEntries.find(([key]) => String(key).trim().toLowerCase() === 'default') || rawEntries[0];
    return {
      version: 3,
      stats: sanitizeStats(preferredEntry[1]),
    };
  }

  return defaultStatsStore(sanitizeStats(input));
}

export function sanitizeSpinHistory(input, maxEntries = 500) {
  if (!input || typeof input !== 'object') {
    return { version: 1, entries: [] };
  }

  const entries = (Array.isArray(input.entries) ? input.entries : [])
    .map((entry, index) => ({
      id: typeof entry?.id === 'string' && entry.id.trim() ? entry.id.trim() : `spin_${index + 1}`,
      timestamp: Math.max(0, Math.round(Number(entry?.timestamp) || 0)),
      winnerParticipantId:
        typeof entry?.winnerParticipantId === 'string' ? entry.winnerParticipantId.trim() : '',
      configSnapshot:
        entry?.configSnapshot && typeof entry.configSnapshot === 'object' ? entry.configSnapshot : null,
    }))
    .filter((entry) => entry.winnerParticipantId)
    .slice(-maxEntries);

  return {
    version: 1,
    entries,
  };
}
