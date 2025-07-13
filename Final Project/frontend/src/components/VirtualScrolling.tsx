import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface VirtualScrollingProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
}

function VirtualScrolling<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  loading = false,
  onLoadMore,
  hasMore = false,
  loadingComponent,
  emptyComponent
}: VirtualScrollingProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Calculate visible range
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  // Get visible items
  const visibleItems = items.slice(startIndex, endIndex);

  // Calculate total height for scrollbar
  const totalHeight = items.length * itemHeight;

  // Calculate offset for visible items
  const offsetY = startIndex * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Intersection Observer for infinite loading
  useEffect(() => {
    if (!onLoadMore || !hasMore) return;

    const options = {
      root: containerRef.current,
      rootMargin: '100px',
      threshold: 0.1
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !loading) {
          setIsIntersecting(true);
          onLoadMore();
        } else {
          setIsIntersecting(false);
        }
      });
    }, options);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onLoadMore, hasMore, loading]);

  // Add intersection observer to last item
  const lastItemRef = useCallback((node: HTMLDivElement) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    if (node && onLoadMore && hasMore) {
      observerRef.current?.observe(node);
    }
  }, [onLoadMore, hasMore]);

  if (items.length === 0 && !loading) {
    return (
      <Box sx={{ height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {emptyComponent || (
          <Typography variant="body1" color="text.secondary">
            No items to display
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative'
      }}
      onScroll={handleScroll}
    >
      <Box sx={{ height: totalHeight, position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: offsetY,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((item, index) => {
            const actualIndex = startIndex + index;
            const isLastItem = actualIndex === items.length - 1;
            
            return (
              <Box
                key={actualIndex}
                ref={isLastItem ? lastItemRef : undefined}
                sx={{ height: itemHeight }}
              >
                {renderItem(item, actualIndex)}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Loading indicator */}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 2,
            bgcolor: 'background.paper'
          }}
        >
          {loadingComponent || <CircularProgress size={24} />}
        </Box>
      )}
    </Box>
  );
}

export default VirtualScrolling; 