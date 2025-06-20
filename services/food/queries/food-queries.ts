import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { EdamamApi } from '../api/edamam-api';
import { EdamamApiResponse, SimplifiedFoodItem, EdamamModelConverter } from '@/types/edamam-api';

export const FOOD_QUERY_KEYS = {
  all: ['food'] as const,
  search: (query: string) => [...FOOD_QUERY_KEYS.all, 'search', query] as const,
  popular: () => [...FOOD_QUERY_KEYS.all, 'popular'] as const,
  category: (category: string) => [...FOOD_QUERY_KEYS.all, 'category', category] as const,
  details: (foodId: string) => [...FOOD_QUERY_KEYS.all, 'details', foodId] as const,
};

/**
 * Hook to search for foods
 */
export const useSearchFood = (query: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: FOOD_QUERY_KEYS.search(query),
    queryFn: async (): Promise<SimplifiedFoodItem[]> => {
      if (!query.trim()) return [];
      
      const response = await EdamamApi.searchFood(query);
      return response.hints.map(hint => EdamamModelConverter.toSimplifiedFoodItem(hint));
    },
    enabled: enabled && query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

/**
 * Hook to get popular foods
 */
export const usePopularFoods = () => {
  return useQuery({
    queryKey: FOOD_QUERY_KEYS.popular(),
    queryFn: async (): Promise<SimplifiedFoodItem[]> => {
      const response = await EdamamApi.getPopularFoods();
      return response.hints.map(hint => EdamamModelConverter.toSimplifiedFoodItem(hint));
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

/**
 * Hook to search foods by category
 */
export const useFoodsByCategory = (category: string) => {
  return useQuery({
    queryKey: FOOD_QUERY_KEYS.category(category),
    queryFn: async (): Promise<SimplifiedFoodItem[]> => {
      const response = await EdamamApi.searchByCategory(category);
      return response.hints.map(hint => EdamamModelConverter.toSimplifiedFoodItem(hint));
    },
    enabled: !!category,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

/**
 * Hook to get food details
 */
export const useFoodDetails = (foodId: string) => {
  return useQuery({
    queryKey: FOOD_QUERY_KEYS.details(foodId),
    queryFn: async (): Promise<EdamamApiResponse> => {
      return EdamamApi.getFoodDetails(foodId);
    },
    enabled: !!foodId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });
};

/**
 * Hook for infinite query with pagination (if API supports it)
 */
export const useInfiniteFoodSearch = (query: string) => {
  return useInfiniteQuery({
    queryKey: [...FOOD_QUERY_KEYS.search(query), 'infinite'],
    queryFn: async ({ pageParam = '' }): Promise<EdamamApiResponse> => {
      if (!query.trim()) {
        return { text: '', count: 0, parsed: [], hints: [], _links: {} };
      }
      
      // Use pageParam as the next URL if available
      if (pageParam) {
        const response = await fetch(pageParam);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }
        return EdamamApi.searchFood(query);
    },
    getNextPageParam: (lastPage) => {
      // Safely check for _links and next href
      return lastPage?._links?.next?.href || undefined;
    },
    enabled: query.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    initialPageParam: '',
  });
};

/**
 * Hook for infinite popular foods with lazy loading
 */
export const useInfinitePopularFoods = () => {
  return useInfiniteQuery({
    queryKey: [...FOOD_QUERY_KEYS.popular(), 'infinite'],
    queryFn: async ({ pageParam = '' }): Promise<EdamamApiResponse> => {
      // Use pageParam as the next URL if available
      if (pageParam) {
        const response = await fetch(pageParam);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }
        return EdamamApi.getPopularFoods();
    },
    getNextPageParam: (lastPage) => {
      // Safely check for _links and next href
      return lastPage?._links?.next?.href || undefined;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    initialPageParam: '',
  });
};

/**
 * Hook for infinite category foods with lazy loading
 */
export const useInfiniteFoodsByCategory = (category: string) => {
  return useInfiniteQuery({
    queryKey: [...FOOD_QUERY_KEYS.category(category), 'infinite'],
    queryFn: async ({ pageParam = '' }): Promise<EdamamApiResponse> => {
      // Use pageParam as the next URL if available
      if (pageParam) {
        const response = await fetch(pageParam);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }
        return EdamamApi.searchByCategory(category);
    },
    getNextPageParam: (lastPage) => {
      // Safely check for _links and next href
      return lastPage?._links?.next?.href || undefined;
    },
    enabled: !!category && category !== 'popular',
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    initialPageParam: '',
  });
};
