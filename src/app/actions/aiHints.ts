'use server';

import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

interface HintParams {
  distance: number;
  relativeX: number;
  relativeY: number;
  clicks: number;
}

export async function generateAIHint({ distance, relativeX, relativeY, clicks }: HintParams) {
  // We don't want to call AI for every single click to save cost and latency.
  // The calling component will decide when to call this.

  const direction = getDirection(relativeX, relativeY);
  const proximity = getProximityLabel(distance);

  const prompt = `
    You are a salty, grizzled old pirate captain who knows exactly where the treasure is hidden.
    The player is currently searching for the treasure.

    Current state:
    - Distance to treasure: ${distance.toFixed(0)} pixels.
    - Proximity: ${proximity}
    - Relative direction: ${direction}
    - Total clicks so far: ${clicks}

    Give a short, thematic pirate-style hint (1-2 sentences).
    - If they are "Cold", be vague and encouraging.
    - If they are "Warm", give them a hint about the general direction.
    - If they are "Hot", be very excited and tell them they are almost there, but don't give away the exact spot.

    Example: "Arrr, ye be getting warmer! Shift yer gaze to the east, where the jagged rocks meet the surf!"

    Only return the hint text. No quotes, no labels.
  `;

  try {
    // Use the Google Gemini model for low-latency hints
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: prompt,
    });

    return { success: true, hint: text };
  } catch (error) {
    console.error('AI Hint Error:', error);
    return {
      success: false,
      hint: "Arrr, the spirits are silent... keep searching, matey!"
    };
  }
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
