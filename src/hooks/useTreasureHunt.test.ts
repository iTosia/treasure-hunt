import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTreasureHunt } from './useTreasureHunt';

// Mock the AI hints server action to avoid actual API calls in tests
vi.mock('../app/actions/aiHints', () => ({
  generateAIHint: vi.fn().mockResolvedValue({
    success: true,
    hint: "Arrr, ye be gettin' close, matey!",
  }),
}));

describe('useTreasureHunt', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useTreasureHunt());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.hint).toBe("Try to find the treasure!");
  });

  it('should set treasure and stop loading when map loads', () => {
    const { result } = renderHook(() => useTreasureHunt());

    result.current.mapRef.current = {
      getBoundingClientRect: () => ({ width: 1000, height: 1000 })
    } as HTMLImageElement;

    act(() => {
      result.current.handleMapLoad();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.treasure).toBeDefined();
  });

  it('should increase click count on click', async () => {
    const { result } = renderHook(() => useTreasureHunt());

    result.current.mapRef.current = {
      getBoundingClientRect: () => ({ width: 1000, height: 1000 })
    } as HTMLImageElement;

    act(() => {
      result.current.handleMapLoad();
    });

    const clickEvent = {
      currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0 }) },
      clientX: 500,
      clientY: 500,
    } as React.MouseEvent<HTMLImageElement>;

    await act(async () => {
      await result.current.handleClick(clickEvent);
    });

    expect(result.current.clicks).toBe(1);
  });

  it('should not increment clicks after treasure is found', async () => {
    const { result } = renderHook(() => useTreasureHunt());

    result.current.mapRef.current = {
      getBoundingClientRect: () => ({ width: 1000, height: 1000 })
    } as HTMLImageElement;

    act(() => {
      result.current.handleMapLoad();
    });

    // Click directly on the treasure position (distance < 20)
    const treasure = result.current.treasure;
    if (treasure) {
      const clickEvent = {
        currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0 }) },
        clientX: treasure.x,
        clientY: treasure.y,
      } as React.MouseEvent<HTMLImageElement>;

      await act(async () => {
        await result.current.handleClick(clickEvent);
      });

      expect(result.current.found).toBe(true);
      expect(result.current.showResult).toBe(true);

      // Second click should be ignored
      await act(async () => {
        await result.current.handleClick(clickEvent);
      });

      expect(result.current.clicks).toBe(1);
    }
  });

  it('should reset state on restart', async () => {
    const { result } = renderHook(() => useTreasureHunt());

    result.current.mapRef.current = {
      getBoundingClientRect: () => ({ width: 1000, height: 1000 })
    } as HTMLImageElement;

    act(() => {
      result.current.handleMapLoad();
    });

    const clickEvent = {
      currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0 }) },
      clientX: 500,
      clientY: 500,
    } as React.MouseEvent<HTMLImageElement>;

    await act(async () => {
      await result.current.handleClick(clickEvent);
    });

    expect(result.current.clicks).toBe(1);

    act(() => {
      result.current.handleRestart();
    });

    expect(result.current.clicks).toBe(0);
    expect(result.current.hint).toBe("Try to find the treasure!");
    expect(result.current.found).toBe(false);
  });
});
