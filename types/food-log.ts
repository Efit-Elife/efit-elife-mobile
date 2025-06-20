/**
 * Food Logging Types
 */

export type MealTime = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodLogEntry {
  id: string;
  foodId: string;
  foodName: string;
  mealTime: MealTime;
  servingSize: number;
  servingUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  loggedAt: Date;
  notes?: string;
  image?: string;
}

export interface DailyFoodLog {
  date: string; // YYYY-MM-DD format
  breakfast: FoodLogEntry[];
  lunch: FoodLogEntry[];
  dinner: FoodLogEntry[];
  snack: FoodLogEntry[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
}

export interface FoodLogSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  count: number;
}

export interface MealTimeConfig {
  mealTime: MealTime;
  label: string;
  icon: string;
  color: string;
  timeRange: string;
}

export const MEAL_TIME_CONFIGS: Record<MealTime, MealTimeConfig> = {
  breakfast: {
    mealTime: 'breakfast',
    label: 'Breakfast',
    icon: '🌅',
    color: '#FF9500',
    timeRange: '6:00 - 11:00'
  },
  lunch: {
    mealTime: 'lunch',
    label: 'Lunch',
    icon: '☀️',
    color: '#34C759',
    timeRange: '11:00 - 15:00'
  },
  dinner: {
    mealTime: 'dinner',
    label: 'Dinner',
    icon: '🌙',
    color: '#5856D6',
    timeRange: '17:00 - 22:00'
  },
  snack: {
    mealTime: 'snack',
    label: 'Snacks',
    icon: '🍎',
    color: '#FF3B30',
    timeRange: 'Anytime'
  }
};
