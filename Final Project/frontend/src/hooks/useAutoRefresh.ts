import { useEffect, useRef, useCallback } from 'react';

interface UseAutoRefreshOptions {
  interval: number; // milliseconds
  enabled?: boolean;
  onRefresh: () => void | Promise<void>;
  dependencies?: any[];
}

export const useAutoRefresh = ({
  interval,
  enabled = true,
  onRefresh,
  dependencies = []
}: UseAutoRefreshOptions) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshingRef = useRef(false);

  const startRefresh = useCallback(() => {
    if (!enabled || intervalRef.current) return;

    intervalRef.current = setInterval(async () => {
      if (isRefreshingRef.current) return;

      try {
        isRefreshingRef.current = true;
        await onRefresh();
      } catch (error) {
        console.error('Auto refresh error:', error);
      } finally {
        isRefreshingRef.current = false;
      }
    }, interval);
  }, [interval, enabled, onRefresh]);

  const stopRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const refreshNow = useCallback(async () => {
    if (isRefreshingRef.current) return;

    try {
      isRefreshingRef.current = true;
      await onRefresh();
    } catch (error) {
      console.error('Manual refresh error:', error);
    } finally {
      isRefreshingRef.current = false;
    }
  }, [onRefresh]);

  useEffect(() => {
    if (enabled) {
      startRefresh();
    } else {
      stopRefresh();
    }

    return () => {
      stopRefresh();
    };
  }, [enabled, startRefresh, stopRefresh, ...dependencies]);

  return {
    refreshNow,
    startRefresh,
    stopRefresh,
    isRefreshing: isRefreshingRef.current
  };
}; 