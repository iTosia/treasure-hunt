'use server';

interface HintParams {
  distance: number;
  relativeX: number;
  relativeY: number;
  clicks: number;
}

const HINTS = {
  cold: [
    "Arrr, ye be wandering in the void! Keep searchin', matey!",
    "Shiver me timbers, ye be colder than a fish's belly!",
    "Ye be as far from the gold as a landlubber is from the sea!",
    "The spirits be silent... ye must wander further, scallywag!",
    "Nothing but sand and salt here. Keep yer eyes peeled!",
  ],
  warm: {
    openers: [
      "I smell gold to the ",
      "Steer yer course toward the ",
      "Cast yer eye toward the ",
      "The wind whispers secrets of treasure in the ",
      "Avast! The trail leads to the ",
    ],
    closers: [
      ", ye scallywag!",
      ", or ye'll be walkin' the plank!",
      ", by the powers of Neptune!",
      ", before the tide turns!",
      ", ye salty dog!",
    ],
  },
  hot: [
    "I can almost taste the doubloons! Ye be right on top of it!",
    "Ye be practically standin' on the gold, ye lucky dog!",
    "Batten down the hatches! The treasure be mere inches away!",
    "By the beard of Zeus, ye've found the spot! Dig deep!",
    "Scurvy dog! Ye be so close I can see the glitter in yer eyes!",
  ],
};

export async function generateAIHint({ distance, relativeX, relativeY }: HintParams) {
  const direction = getDirection(relativeX, relativeY);
  const proximity = getProximityLabel(distance);

  let hint = "";

  if (proximity === 'Cold') {
    hint = pickRandom(HINTS.cold);
  } else if (proximity === 'Warm') {
    const opener = pickRandom(HINTS.warm.openers);
    const closer = pickRandom(HINTS.warm.closers);
    hint = `${opener}${direction}${closer}`;
  } else if (proximity === 'Hot') {
    hint = pickRandom(HINTS.hot);
  } else {
    hint = "Ye found it! The treasure be yours!";
  }

  return { success: true, hint };
}

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getDirection(rx: number, ry: number): string {
  const absX = Math.abs(rx);
  const absY = Math.abs(ry);

  if (absX > absY * 2) {
    return rx > 0 ? 'East' : 'West';
  } else if (absY > absX * 2) {
    return ry > 0 ? 'South' : 'North';
  } else {
    if (rx > 0 && ry > 0) return 'South-East';
    if (rx > 0 && ry < 0) return 'North-East';
    if (rx < 0 && ry > 0) return 'South-West';
    return 'North-West';
  }
}

function getProximityLabel(distance: number): string {
  if (distance > 120) return 'Cold';
  if (distance > 50) return 'Warm';
  if (distance > 20) return 'Hot';
  return 'Found';
}
