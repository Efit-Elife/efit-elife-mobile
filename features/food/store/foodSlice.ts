import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SimplifiedFoodItem } from '@/types/edamam-api';

export interface FoodState {
  searchQuery: string;
  searchHistory: string[];
  favoriteCategories: string[];
  recentSearches: SimplifiedFoodItem[];
  selectedFood: SimplifiedFoodItem | null;
  filters: {
    category: string[];
    calorieRange: {
      min: number;
      max: number;
    };
    showOnlyWithImages: boolean;
  };
  ui: {
    isSearching: boolean;
    selectedCategory: string | null;
  };
}

const initialState: FoodState = {
  searchQuery: '',
  searchHistory: [],
  favoriteCategories: [],
  recentSearches: [],
  selectedFood: null,
  filters: {
    category: [],
    calorieRange: {
      min: 0,
      max: 1000,
    },
    showOnlyWithImages: false,
  },
  ui: {
    isSearching: false,
    selectedCategory: null,
  },
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (query && !state.searchHistory.includes(query)) {
        state.searchHistory.unshift(query);
        // Keep only last 10 searches
        if (state.searchHistory.length > 10) {
          state.searchHistory = state.searchHistory.slice(0, 10);
        }
      }
    },
    
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    
    addToRecentSearches: (state, action: PayloadAction<SimplifiedFoodItem>) => {
      const foodItem = action.payload;
      // Remove if already exists
      state.recentSearches = state.recentSearches.filter(item => item.id !== foodItem.id);
      // Add to beginning
      state.recentSearches.unshift(foodItem);
      // Keep only last 20 items
      if (state.recentSearches.length > 20) {
        state.recentSearches = state.recentSearches.slice(0, 20);
      }
    },
    
    setSelectedFood: (state, action: PayloadAction<SimplifiedFoodItem | null>) => {
      state.selectedFood = action.payload;
    },
    
    toggleFavoriteCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.favoriteCategories.indexOf(category);
      if (index > -1) {
        state.favoriteCategories.splice(index, 1);
      } else {
        state.favoriteCategories.push(category);
      }
    },
    
    setCalorieRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.filters.calorieRange = action.payload;
    },
    
    toggleCategoryFilter: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.filters.category.indexOf(category);
      if (index > -1) {
        state.filters.category.splice(index, 1);
      } else {
        state.filters.category.push(category);
      }
    },
    
    setCategoryFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.category = action.payload;
    },
    
    toggleShowOnlyWithImages: (state) => {
      state.filters.showOnlyWithImages = !state.filters.showOnlyWithImages;
    },
    
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.ui.isSearching = action.payload;
    },
    
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.ui.selectedCategory = action.payload;
    },
    
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    
    resetFoodState: () => initialState,
  },
});

export const {
  setSearchQuery,
  addToSearchHistory,
  clearSearchHistory,
  addToRecentSearches,
  setSelectedFood,
  toggleFavoriteCategory,
  setCalorieRange,
  toggleCategoryFilter,
  setCategoryFilter,
  toggleShowOnlyWithImages,
  setIsSearching,
  setSelectedCategory,
  clearFilters,
  resetFoodState,
} = foodSlice.actions;

export default foodSlice.reducer;

// Selectors
export const selectSearchQuery = (state: { food: FoodState }) => state.food.searchQuery;
export const selectSearchHistory = (state: { food: FoodState }) => state.food.searchHistory;
export const selectRecentSearches = (state: { food: FoodState }) => state.food.recentSearches;
export const selectSelectedFood = (state: { food: FoodState }) => state.food.selectedFood;
export const selectFavoriteCategories = (state: { food: FoodState }) => state.food.favoriteCategories;
export const selectFilters = (state: { food: FoodState }) => state.food.filters;
export const selectUIState = (state: { food: FoodState }) => state.food.ui;
