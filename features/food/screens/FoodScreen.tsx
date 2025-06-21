import React, { useState, useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "../../../components/ui/safe-area-view";
import { VStack } from "../../../components/ui/vstack";
import { HStack } from "../../../components/ui/hstack";
import { Text } from "../../../components/ui/text";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  useInfiniteFoodSearch,
  useInfinitePopularFoods,
  useInfiniteFoodsByCategory,
} from "../../../services/food/queries/food-queries";
import { LazyFoodList } from "../components/LazyFoodList";
import { EdamamSearchBar } from "../components/EdamamSearchBar";
import { FoodCategories } from "../components/FoodCategories";
import {
  setSelectedFood,
  addToRecentSearches,
  selectSearchQuery,
  selectUIState,
} from "../store/foodSlice";
import { startLogging } from "../store/foodLogSlice";
import { RootState } from "@/store";
import { SimplifiedFoodItem, EdamamModelConverter } from "@/types/edamam-api";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

export default function FoodScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const storedSearchQuery = useSelector((state: RootState) =>
    selectSearchQuery(state)
  );
  const { selectedCategory } = useSelector((state: RootState) =>
    selectUIState(state)
  );
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  // Use infinite React Query hooks for lazy loading
  const searchInfiniteQuery = useInfiniteFoodSearch(currentSearchQuery);
  const popularInfiniteQuery = useInfinitePopularFoods();
  const categoryInfiniteQuery = useInfiniteFoodsByCategory(
    selectedCategory || ""
  );

  const handleSearch = useCallback((query: string) => {
    setCurrentSearchQuery(query);
  }, []);

  const handleCategoryPress = useCallback((category: string) => {
    setCurrentSearchQuery(""); // Clear search when selecting category
  }, []);
  const handleFoodPress = useCallback(
    (food: SimplifiedFoodItem) => {
      dispatch(setSelectedFood(food));
      dispatch(addToRecentSearches(food));

      // Start logging process
      dispatch(startLogging({ food }));
    },
    [dispatch]
  );

  // Determine which query to use
  const currentQuery = useMemo(() => {
    if (currentSearchQuery) {
      return searchInfiniteQuery;
    } else if (selectedCategory && selectedCategory !== "popular") {
      return categoryInfiniteQuery;
    } else {
      return popularInfiniteQuery;
    }
  }, [
    currentSearchQuery,
    selectedCategory,
    searchInfiniteQuery,
    categoryInfiniteQuery,
    popularInfiniteQuery,
  ]);

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = currentQuery;

  // Monitor performance for lazy loading
  const totalItems = useMemo(() => {
    return (
      data?.pages?.reduce(
        (acc: number, page: any) => acc + page.hints.length,
        0
      ) || 0
    );
  }, [data]);

  const performanceMonitor = usePerformanceMonitor(totalItems);
  // Generate dynamic header content
  const { headerTitle, headerSubtitle } = useMemo(() => {
    if (currentSearchQuery) {
      return {
        headerTitle: `Search Results for "${currentSearchQuery}"`,
        headerSubtitle: `Found ${totalItems} results`,
      };
    } else if (selectedCategory && selectedCategory !== "popular") {
      return {
        headerTitle: `${
          selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
        } Foods`,
        headerSubtitle: `Browse ${selectedCategory} items`,
      };
    } else {
      return {
        headerTitle: "Popular Foods",
        headerSubtitle: "Discover trending food items",
      };
    }
  }, [currentSearchQuery, selectedCategory, totalItems]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <SafeAreaView style={styles.container}>
      <VStack className="flex-1">
        {/* <HStack className="p-4 bg-white border-b border-gray-200 items-center">
          <Pressable>
            <Text className="text-blue-500 mr-2">&lt; Index</Text>
          </Pressable>
          <Text className="flex-1 text-center font-medium">Food Search</Text>
          <Pressable onPress={() => router.push("/firebase-test")}>
            <Text className="text-blue-500">Test Mode</Text>
          </Pressable>
        </HStack> */}
        <EdamamSearchBar
          onSearch={handleSearch}
          placeholder="Search for foods..."
        />

        <FoodCategories onCategoryPress={handleCategoryPress} />
        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{headerTitle}</Text>
            <Text style={styles.sectionSubtitle}>{headerSubtitle}</Text>
          </View>
          <LazyFoodList
            data={data}
            onFoodPress={handleFoodPress}
            loading={isLoading}
            error={error?.message || null}
            onLoadMore={handleLoadMore}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </View>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#f9f9f9",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
  },
});
