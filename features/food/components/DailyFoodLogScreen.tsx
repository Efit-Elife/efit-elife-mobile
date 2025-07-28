import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { RootState } from "@/store";
import {
  selectCurrentDailyLog,
  selectMealSummary,
  removeFoodEntry,
  setCurrentDate,
  startLogging,
} from "../store/foodLogSlice";
import { MEAL_TIME_CONFIGS, MealTime, FoodLogEntry } from "@/types/food-log";
import { SimplifiedFoodItem } from "@/types/edamam-api";

interface MealSectionProps {
  mealTime: MealTime;
  entries: FoodLogEntry[];
  onAddFood: (mealTime: MealTime) => void;
  onRemoveEntry: (entryId: string) => void;
}

const MealSection: React.FC<MealSectionProps> = ({
  mealTime,
  entries,
  onAddFood,
  onRemoveEntry,
}) => {
  const dispatch = useDispatch();
  const summary = useSelector((state: RootState) =>
    selectMealSummary(state, mealTime)
  );
  const config = MEAL_TIME_CONFIGS[mealTime];

  const renderFoodEntry = ({ item }: { item: FoodLogEntry }) => (
    <View style={styles.foodEntry}>
      <View style={styles.foodEntryInfo}>
        <Text style={styles.foodEntryName}>{item.foodName}</Text>
        <Text style={styles.foodEntryDetails}>
          {item.servingSize} {item.servingUnit}
        </Text>
        {item.notes ? (
          <Text style={styles.foodEntryNotes}>{item.notes}</Text>
        ) : null}
      </View>

      <View style={styles.foodEntryNutrition}>
        <Text style={styles.caloriesText}>{Math.round(item.calories)} cal</Text>
        <View style={styles.macroRow}>
          <Text style={styles.macroText}>P: {Math.round(item.protein)}g</Text>
          <Text style={styles.macroText}>C: {Math.round(item.carbs)}g</Text>
          <Text style={styles.macroText}>F: {Math.round(item.fat)}g</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => {
          Alert.alert(
            "Remove Food",
            `Are you sure you want to remove "${item.foodName}" from your log?`,
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Remove",
                style: "destructive",
                onPress: () => onRemoveEntry(item.id),
              },
            ]
          );
        }}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mealSection}>
      <View
        style={[styles.mealHeader, { backgroundColor: config.color + "10" }]}
      >
        <View style={styles.mealHeaderLeft}>
          <Text style={styles.mealIcon}>{config.icon}</Text>
          <View>
            <Text style={styles.mealTitle}>{config.label}</Text>
            <Text style={styles.mealTime}>{config.timeRange}</Text>
          </View>
        </View>
        <View style={styles.mealSummary}>
          <Text style={styles.mealCalories}>
            {Math.round(summary.calories)} cal
          </Text>
          <Text style={styles.mealCount}>{summary.count} items</Text>
        </View>
      </View>

      {entries.length > 0 ? (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={renderFoodEntry}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.emptyMeal}>
          <Text style={styles.emptyMealText}>No food items yet</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.addFoodButton, { borderColor: config.color }]}
        onPress={() => onAddFood(mealTime)}
      >
        <Text style={[styles.addFoodText, { color: config.color }]}>
          + Add Food
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const DailyFoodLogScreen: React.FC = () => {
  const dispatch = useDispatch();
  const dailyLog = useSelector(selectCurrentDailyLog);
  const currentDate = useSelector(
    (state: RootState) => state.foodLog.currentDate
  );

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
    const dateString = newDate.toISOString().split("T")[0];
    dispatch(setCurrentDate(dateString));
  };

  const handleAddFood = (mealTime: MealTime) => {
    // Navigate to food search and start logging
    // For now, we'll create a dummy food item to test the logging
    const dummyFood: SimplifiedFoodItem = {
      id: "dummy",
      name: "Test Food",
      calories: 100,
      protein: 10,
      carbs: 15,
      fat: 5,
      fiber: 3,
      category: "test",
      measures: [{ label: "serving", weight: 100, uri: "" }],
    };

    dispatch(startLogging({ food: dummyFood, mealTime }));
  };

  const handleRemoveEntry = (entryId: string) => {
    dispatch(removeFoodEntry({ date: currentDate, entryId }));
  };
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <VStack className="flex-1">
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nutrition Log</Text>
          <Text style={styles.headerDate}>{formatDate(selectedDate)}</Text>
        </View>
        {/* Date Navigation */}
        <HStack className="justify-between items-center p-4 bg-[#B0B3FF]">
          <TouchableOpacity
            onPress={() => {
              const yesterday = new Date(selectedDate);
              yesterday.setDate(yesterday.getDate() - 1);
              handleDateChange(yesterday);
            }}
            style={styles.dateNavButton}
          >
            <Text style={styles.dateNavText}>‹ Yesterday</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleDateChange(new Date())}
            style={styles.todayButton}
          >
            <Text style={styles.todayText}>Today</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const tomorrow = new Date(selectedDate);
              tomorrow.setDate(tomorrow.getDate() + 1);
              if (tomorrow <= new Date()) {
                handleDateChange(tomorrow);
              }
            }}
            style={styles.dateNavButton}
          >
            <Text style={styles.dateNavText}>Tomorrow ›</Text>
          </TouchableOpacity>
        </HStack>
        {/* Daily Summary */}
        <View style={styles.dailySummary}>
          <Text style={styles.summaryTitle}>Daily Total</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {Math.round(dailyLog.totalCalories)}
              </Text>
              <Text style={styles.summaryLabel}>Calories</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {Math.round(dailyLog.totalProtein)}g
              </Text>
              <Text style={styles.summaryLabel}>Protein</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {Math.round(dailyLog.totalCarbs)}g
              </Text>
              <Text style={styles.summaryLabel}>Carbs</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {Math.round(dailyLog.totalFat)}g
              </Text>
              <Text style={styles.summaryLabel}>Fat</Text>
            </View>
          </View>
        </View>
        {/* Meal Sections */}
        <FlatList
          data={Object.values(MEAL_TIME_CONFIGS)}
          keyExtractor={(item) => item.mealTime}
          renderItem={({ item }) => (
            <MealSection
              mealTime={item.mealTime}
              entries={dailyLog[item.mealTime]}
              onAddFood={handleAddFood}
              onRemoveEntry={handleRemoveEntry}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000393",
  },
  header: {
    padding: 20,
    backgroundColor: "#B0B3FF",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  headerDate: {
    fontSize: 16,
    color: "#E3F2FD",
  },
  dateNavButton: {
    padding: 8,
  },
  dateNavText: {
    fontSize: 16,
    color: "#4285F4",
  },
  todayButton: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  todayText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  dailySummary: {
    padding: 16,
    backgroundColor: "#B0B3FF",
    margin: 16,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4285F4",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  mealSection: {
    margin: 16,
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  mealHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  mealTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  mealSummary: {
    alignItems: "flex-end",
  },
  mealCalories: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  mealCount: {
    fontSize: 12,
    color: "#666",
  },
  foodEntry: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
  },
  foodEntryInfo: {
    flex: 1,
  },
  foodEntryName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  foodEntryDetails: {
    fontSize: 14,
    color: "#666",
  },
  foodEntryNotes: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
    marginTop: 2,
  },
  foodEntryNutrition: {
    alignItems: "flex-end",
    marginRight: 12,
  },
  caloriesText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4285F4",
  },
  macroRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  macroText: {
    fontSize: 10,
    color: "#666",
    marginLeft: 4,
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyMeal: {
    padding: 24,
    alignItems: "center",
  },
  emptyMealText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
  addFoodButton: {
    margin: 16,
    padding: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 8,
    alignItems: "center",
  },
  addFoodText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
