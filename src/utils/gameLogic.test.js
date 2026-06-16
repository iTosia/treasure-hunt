import { describe, it, expect } from 'vitest';
import { calculateDistance, getHintForDistance } from './gameLogic';

describe('gameLogic utilities', () => {
  describe('calculateDistance', () => {
    it('calculates correct distance between points', () => {
      expect(calculateDistance(0, 0, 3, 4)).toBe(5);
      expect(calculateDistance(10, 10, 10, 10)).toBe(0);
      expect(calculateDistance(-1, -1, 1, 1)).toBe(Math.sqrt(8));
    });
  });

  describe('getHintForDistance', () => {
    it('returns "found" for distance < 20', () => {
      const result = getHintForDistance(19);
      expect(result).toEqual({
        text: "Treasure found! 🎉",
        state: "found",
        isFound: true,
      });
    });

    it('returns "very hot" for distance 20 <= d < 50', () => {
      const result = getHintForDistance(49);
      expect(result).toEqual({
        text: "Very hot 🔥",
        state: "very-hot",
        isFound: false,
      });
    });

    it('returns "warm" for distance 50 <= d < 120', () => {
      const result = getHintForDistance(119);
      expect(result).toEqual({
        text: "Warm 🌡️",
        state: "warm",
        isFound: false,
      });
    });

    it('returns "cold" for distance >= 120', () => {
      const result = getHintForDistance(120);
      expect(result).toEqual({
        text: "Cold ❄️",
        state: "normal",
        isFound: false,
      });
    });
  });
});
