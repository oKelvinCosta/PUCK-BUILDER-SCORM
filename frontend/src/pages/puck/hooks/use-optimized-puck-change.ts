import { useRef, useCallback } from 'react';

/**
 * Hook to optimize Puck onChange performance
 * Reduces lag during typing by batching and throttling updates
 */
export function useOptimizedPuckChange(onChange: (data: object) => void) {
  // Refs for optimization
  const pendingChange = useRef<object | null>(null);
  const rafId = useRef<number>();
  const lastChangeTime = useRef<number>(0);
  const changeQueue = useRef<object[]>([]);
  
  /**
   * Throttled change handler to reduce typing lag
   * Uses requestAnimationFrame for smooth updates
   */
  const optimizedChange = useCallback((data: object) => {
    const now = Date.now();
    const timeSinceLastChange = now - lastChangeTime.current;
    
    // Store the change
    pendingChange.current = data;
    changeQueue.current.push(data);
    
    // Cancel any pending RAF
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    // Use RAF for smooth updates, but throttle rapid changes
    if (timeSinceLastChange > 50) { // 50ms throttle
      // Immediate update for significant changes
      lastChangeTime.current = now;
      onChange(data);
      changeQueue.current = [];
    } else {
      // Batch rapid changes using RAF
      rafId.current = requestAnimationFrame(() => {
        if (pendingChange.current) {
          lastChangeTime.current = Date.now();
          onChange(pendingChange.current);
          changeQueue.current = [];
        }
      });
    }
  }, [onChange]);

  /**
   * Cleanup function
   */
  const cleanup = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
  }, []);

  return {
    handleChange: optimizedChange,
    cleanup,
  };
}
