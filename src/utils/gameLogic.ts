export interface HintResult {
  text: string;
  state: string;
  isFound: boolean;
}

export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

export function getHintForDistance(distance: number): HintResult {
  if (distance < 20) {
    return {
      text: "Treasure found! 🎉",
      state: "found",
      isFound: true,
    };
  } else if (distance < 50) {
    return {
      text: "Very hot 🔥",
      state: "very-hot",
      isFound: false,
    };
  } else if (distance < 120) {
    return {
      text: "Warm 🌡️",
      state: "warm",
      isFound: false,
    };
  } else {
    return {
      text: "Cold ❄️",
      state: "normal",
      isFound: false,
    };
  }
}
