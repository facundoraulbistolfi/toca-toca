import test from 'node:test';
import assert from 'node:assert/strict';
import {
  distributeUnits,
  parseBulkParticipants,
  sanitizeRoundCycleRemainingIds,
  sanitizeRoundMode,
  sanitizeSpinDurationRange,
  sanitizeSpinHistory,
  weightedRandomIndex,
} from '../lib/core-logic.mjs';

test('distributeUnits preserves target total', () => {
  const units = distributeUnits([4, 3, 3], 100);
  assert.equal(units.reduce((acc, value) => acc + value, 0), 100);
  assert.ok(units[0] >= units[1]);
});

test('distributeUnits splits evenly when weights are zero', () => {
  const units = distributeUnits([0, 0, 0], 10);
  assert.deepEqual(units, [4, 3, 3]);
});

test('weightedRandomIndex supports deterministic random values', () => {
  const items = [{ pct: 10 }, { pct: 30 }, { pct: 60 }];
  assert.equal(weightedRandomIndex(items, () => 0.01), 0);
  assert.equal(weightedRandomIndex(items, () => 0.2), 1);
  assert.equal(weightedRandomIndex(items, () => 0.99), 2);
});

test('sanitizeRoundMode accepts valid and rejects invalid values', () => {
  assert.equal(sanitizeRoundMode('cycle_no_repeat'), 'cycle_no_repeat');
  assert.equal(sanitizeRoundMode('invalid'), 'normal');
});

test('sanitizeSpinDurationRange clamps and orders values', () => {
  assert.deepEqual(sanitizeSpinDurationRange(80, -2), [1, 60]);
  assert.deepEqual(sanitizeSpinDurationRange(12, 8), [8, 12]);
});

test('sanitizeRoundCycleRemainingIds filters invalid and duplicates', () => {
  const ids = sanitizeRoundCycleRemainingIds(['a', 'b', 'a', 'x'], ['a', 'b', 'c']);
  assert.deepEqual(ids, ['a', 'b']);
});

test('parseBulkParticipants parses emoji prefix lines', () => {
  const parsed = parseBulkParticipants('😀 Ana\nBeto');
  assert.deepEqual(parsed, [
    { emoji: '😀', name: 'Ana' },
    { emoji: '😀', name: 'Beto' },
  ]);
});

test('sanitizeSpinHistory trims to max and removes invalid winners', () => {
  const sanitized = sanitizeSpinHistory(
    {
      entries: [
        { id: '1', winnerParticipantId: '', timestamp: 1 },
        { id: '2', winnerParticipantId: 'alexei', timestamp: 2 },
        { id: '3', winnerParticipantId: 'polina', timestamp: 3 },
      ],
    },
    1,
  );
  assert.equal(sanitized.entries.length, 1);
  assert.equal(sanitized.entries[0].winnerParticipantId, 'polina');
});
