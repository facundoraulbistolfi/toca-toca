import test from 'node:test';
import assert from 'node:assert/strict';
import {
  defaultStatsStore,
  sanitizeSpinHistory,
  sanitizeStatsStore,
} from '../lib/stats-logic.mjs';

test('sanitizeStatsStore migrates legacy stats object', () => {
  const store = sanitizeStatsStore({ totals: [{ participantId: 'p1', count: 4 }] });
  assert.equal(store.stats.totals[0].participantId, 'p1');
});

test('sanitizeStatsStore migrates byProfile and keeps default bucket', () => {
  const store = sanitizeStatsStore({
    byProfile: {
      default: { totals: [{ participantId: 'a', count: 2 }] },
      work: { totals: [{ participantId: 'b', count: 3 }] },
    },
  });
  assert.equal(store.stats.totals[0].participantId, 'a');
});

test('defaultStatsStore includes stats root object', () => {
  const store = defaultStatsStore();
  assert.ok(store.stats);
});

test('sanitizeSpinHistory keeps config snapshots and truncates', () => {
  const history = sanitizeSpinHistory(
    {
      entries: [
        { id: '1', winnerParticipantId: 'a', configSnapshot: { mode: 'x' } },
        { id: '2', winnerParticipantId: 'b', configSnapshot: { mode: 'y' } },
      ],
    },
    1,
  );
  assert.equal(history.entries.length, 1);
  assert.equal(history.entries[0].id, '2');
  assert.deepEqual(history.entries[0].configSnapshot, { mode: 'y' });
});
