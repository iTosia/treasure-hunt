'use server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export interface LeaderboardEntry {
  id: number;
  userId: string;
  username: string;
  score: number;
  updatedAt: Date;
}

export async function submitScore(score: number) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Authentication required to submit scores');
  }

  // In a real app, we'd fetch the actual user's name from Clerk.
  // For the portfolio, a generic "Player_ID" is acceptable, or you can extend this to fetch the name.
  const username = `Player_${userId.slice(0, 5)}`;

  try {
    // Update the score only if the new score is lower (better)
    const currentRecord = await prisma.leaderboard.findUnique({
      where: { userId },
    });

    if (!currentRecord || score < currentRecord.score) {
      await prisma.leaderboard.upsert({
        where: { userId },
        update: { score, username },
        create: { userId, username, score },
      });
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error submitting score:', error);
    throw new Error('Failed to submit score');
  }
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    return await prisma.leaderboard.findMany({
      orderBy: {
        score: 'asc',
      },
      take: 10,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw new Error('Failed to fetch leaderboard');
  }
}

export async function initDb() {
  // Handled by prisma db push
  return { success: true };
}
