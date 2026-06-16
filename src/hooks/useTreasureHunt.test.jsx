import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTreasureHunt } from './useTreasureHunt';

describe('useTreasureHunt', () => {
  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useTreasureHunt());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.hint).toBe("Try to find the treasure!");
  });

  it('should set treasure and stop loading when map loads', () => {
    const { result } = renderHook(() => useTreasureHunt());

    result.current.mapRef.current = {
      getBoundingClientRect: () => ({ width: 1000, height: 1000 })
    };

    act(() => {
      result.current.handleMapLoad();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.treasure).toBeDefined();
  });

  it('should increase click count on click', () => {
    const { result } = renderHook(() => useTreasureHunt());

    result.current.mapRef.current = {
      getBoundingClientRect: () => ({ width: 1000, height: 1000 })
    };

    act(() => {
      result.current.handleMapLoad();
    });

    const clickEvent = {
      target: { getBoundingClientRect: () => ({ left: 0, top: 0 }) },
      clientX: 500,
      clientY: 500,
    };

    act(() => {
      result.current.handleClick(clickEvent);
    });

    expect(result.current.clicks).toBe(1);
  });
});
