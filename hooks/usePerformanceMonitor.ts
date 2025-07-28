import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  itemsLoaded: number;
  timestamp: number;
}

/**
 * Hook to monitor lazy loading performance
 */
export const usePerformanceMonitor = (itemCount: number) => {
  const startTime = useRef<number>(Date.now());
  const metrics = useRef<PerformanceMetrics[]>([]);

  useEffect(() => {
    if (itemCount > 0) {
      const loadTime = Date.now() - startTime.current;
      const metric: PerformanceMetrics = {
        loadTime,
        itemsLoaded: itemCount,
        timestamp: Date.now(),
      };
      
      metrics.current.push(metric);
      
      // Log performance metrics in development
      if (__DEV__) {
        console.log(`🚀 Lazy Loading Performance:`, {
          itemsLoaded: itemCount,
          loadTime: `${loadTime}ms`,
          avgTimePerItem: `${(loadTime / itemCount).toFixed(2)}ms`,
        });
      }
    }
  }, [itemCount]);

  const getAverageLoadTime = () => {
    if (metrics.current.length === 0) return 0;
    const totalTime = metrics.current.reduce((sum, metric) => sum + metric.loadTime, 0);
    return totalTime / metrics.current.length;
  };

  const getTotalItemsLoaded = () => {
    return metrics.current.reduce((sum, metric) => sum + metric.itemsLoaded, 0);
  };

  return {
    getAverageLoadTime,
    getTotalItemsLoaded,
    metrics: metrics.current,
  };
};
