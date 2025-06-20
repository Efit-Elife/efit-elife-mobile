import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodLogEntry, DailyFoodLog, MealTime, FoodLogSummary } from '@/types/food-log';
import { SimplifiedFoodItem } from '@/types/edamam-api';

interface FoodLogState {
  dailyLogs: Record<string, DailyFoodLog>; // date string as key
  currentDate: string;
  selectedMealTime: MealTime;
  isLogging: boolean;
  selectedFood: SimplifiedFoodItem | null;
  servingSize: number;
  servingUnit: string;
  notes: string;
}

const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

const initialState: FoodLogState = {
  dailyLogs: {},
  currentDate: getTodayString(),
  selectedMealTime: 'breakfast',
  isLogging: false,
  selectedFood: null,
  servingSize: 1,
  servingUnit: 'serving',
  notes: '',
};

const createEmptyDailyLog = (date: string): DailyFoodLog => ({
  date,
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
  totalCalories: 0,
  totalProtein: 0,
  totalCarbs: 0,
  totalFat: 0,
  totalFiber: 0,
});

const calculateTotals = (dailyLog: DailyFoodLog): DailyFoodLog => {
  const allEntries = [
    ...dailyLog.breakfast,
    ...dailyLog.lunch,
    ...dailyLog.dinner,
    ...dailyLog.snack,
  ];

  const totals = allEntries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat,
      fiber: acc.fiber + entry.fiber,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  return {
    ...dailyLog,
    totalCalories: Math.round(totals.calories * 100) / 100,
    totalProtein: Math.round(totals.protein * 100) / 100,
    totalCarbs: Math.round(totals.carbs * 100) / 100,
    totalFat: Math.round(totals.fat * 100) / 100,
    totalFiber: Math.round(totals.fiber * 100) / 100,
  };
};

const foodLogSlice = createSlice({
  name: 'foodLog',
  initialState,
  reducers: {
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
      if (!state.dailyLogs[action.payload]) {
        state.dailyLogs[action.payload] = createEmptyDailyLog(action.payload);
      }
    },

    setSelectedMealTime: (state, action: PayloadAction<MealTime>) => {
      state.selectedMealTime = action.payload;
    },

    startLogging: (state, action: PayloadAction<{ food: SimplifiedFoodItem; mealTime?: MealTime }>) => {
      state.isLogging = true;
      state.selectedFood = action.payload.food;
      if (action.payload.mealTime) {
        state.selectedMealTime = action.payload.mealTime;
      }
      // Set default serving size and unit
      state.servingSize = 1;
      state.servingUnit = action.payload.food.measures[0]?.label || 'serving';
      state.notes = '';
    },

    cancelLogging: (state) => {
      state.isLogging = false;
      state.selectedFood = null;
      state.servingSize = 1;
      state.servingUnit = 'serving';
      state.notes = '';
    },

    setServingSize: (state, action: PayloadAction<number>) => {
      state.servingSize = Math.max(0.1, action.payload);
    },

    setServingUnit: (state, action: PayloadAction<string>) => {
      state.servingUnit = action.payload;
    },

    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },

    logFood: (state) => {
      if (!state.selectedFood) return;

      const currentDate = state.currentDate;
      if (!state.dailyLogs[currentDate]) {
        state.dailyLogs[currentDate] = createEmptyDailyLog(currentDate);
      }

      const food = state.selectedFood;
      const servingRatio = state.servingSize;

      const entry: FoodLogEntry = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        foodId: food.id,
        foodName: food.name,
        mealTime: state.selectedMealTime,
        servingSize: state.servingSize,
        servingUnit: state.servingUnit,
        calories: Math.round(food.calories * servingRatio * 100) / 100,
        protein: Math.round(food.protein * servingRatio * 100) / 100,
        carbs: Math.round(food.carbs * servingRatio * 100) / 100,
        fat: Math.round(food.fat * servingRatio * 100) / 100,
        fiber: Math.round(food.fiber * servingRatio * 100) / 100,
        loggedAt: new Date(),
        notes: state.notes || undefined,
        image: food.image,
      };

      state.dailyLogs[currentDate][state.selectedMealTime].push(entry);
      state.dailyLogs[currentDate] = calculateTotals(state.dailyLogs[currentDate]);

      // Reset logging state
      state.isLogging = false;
      state.selectedFood = null;
      state.servingSize = 1;
      state.servingUnit = 'serving';
      state.notes = '';
    },

    removeFoodEntry: (state, action: PayloadAction<{ date: string; entryId: string }>) => {
      const { date, entryId } = action.payload;
      const dailyLog = state.dailyLogs[date];
      
      if (!dailyLog) return;

      // Remove from all meal times
      ['breakfast', 'lunch', 'dinner', 'snack'].forEach((mealTime) => {
        const mealTimeKey = mealTime as MealTime;
        dailyLog[mealTimeKey] = dailyLog[mealTimeKey].filter(entry => entry.id !== entryId);
      });

      state.dailyLogs[date] = calculateTotals(dailyLog);
    },

    updateFoodEntry: (state, action: PayloadAction<{ date: string; entryId: string; updates: Partial<FoodLogEntry> }>) => {
      const { date, entryId, updates } = action.payload;
      const dailyLog = state.dailyLogs[date];
      
      if (!dailyLog) return;

      // Find and update the entry in the correct meal time
      ['breakfast', 'lunch', 'dinner', 'snack'].forEach((mealTime) => {
        const mealTimeKey = mealTime as MealTime;
        const entryIndex = dailyLog[mealTimeKey].findIndex(entry => entry.id === entryId);
        
        if (entryIndex !== -1) {
          dailyLog[mealTimeKey][entryIndex] = {
            ...dailyLog[mealTimeKey][entryIndex],
            ...updates,
          };
        }
      });

      state.dailyLogs[date] = calculateTotals(dailyLog);
    },

    clearDayLog: (state, action: PayloadAction<string>) => {
      const date = action.payload;
      state.dailyLogs[date] = createEmptyDailyLog(date);
    },
  },
});

export const {
  setCurrentDate,
  setSelectedMealTime,
  startLogging,
  cancelLogging,
  setServingSize,
  setServingUnit,
  setNotes,
  logFood,
  removeFoodEntry,
  updateFoodEntry,
  clearDayLog,
} = foodLogSlice.actions;

// Selectors
export const selectCurrentDailyLog = (state: any) => {
  const currentDate = state.foodLog.currentDate;
  return state.foodLog.dailyLogs[currentDate] || createEmptyDailyLog(currentDate);
};

export const selectDailyLogByDate = (state: any, date: string) => {
  return state.foodLog.dailyLogs[date] || createEmptyDailyLog(date);
};

export const selectMealSummary = (state: any, mealTime: MealTime): FoodLogSummary => {
  const dailyLog = selectCurrentDailyLog(state);
  const entries = dailyLog[mealTime];
    return entries.reduce(
    (acc: FoodLogSummary, entry: FoodLogEntry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat,
      fiber: acc.fiber + entry.fiber,
      count: acc.count + 1,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, count: 0 }
  );
};

export const selectIsLogging = (state: any) => state.foodLog.isLogging;
export const selectSelectedFood = (state: any) => state.foodLog.selectedFood;
export const selectLoggingState = (state: any) => ({
  servingSize: state.foodLog.servingSize,
  servingUnit: state.foodLog.servingUnit,
  notes: state.foodLog.notes,
  selectedMealTime: state.foodLog.selectedMealTime,
});

export default foodLogSlice.reducer;
