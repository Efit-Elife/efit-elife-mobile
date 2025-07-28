import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory, selectUIState } from "../store/foodSlice";
import { RootState } from "@/store";

const FOOD_CATEGORIES = [
  { id: "popular", label: "Popular", emoji: "🔥" },
  { id: "fruits", label: "Fruits", emoji: "🍎" },
  { id: "vegetables", label: "Vegetables", emoji: "🥕" },
  { id: "proteins", label: "Proteins", emoji: "🍗" },
  { id: "dairy", label: "Dairy", emoji: "🧀" },
  { id: "grains", label: "Grains", emoji: "🌾" },
  { id: "beverages", label: "Beverages", emoji: "🥤" },
  { id: "snacks", label: "Snacks", emoji: "🥨" },
];

interface FoodCategoriesProps {
  onCategoryPress: (category: string) => void;
}

export const FoodCategories: React.FC<FoodCategoriesProps> = ({
  onCategoryPress,
}) => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state: RootState) =>
    selectUIState(state)
  );

  const handleCategoryPress = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;
    dispatch(setSelectedCategory(newCategory));
    onCategoryPress(newCategory || "popular");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FOOD_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategory === category.id && styles.categoryItemSelected,
            ]}
            onPress={() => handleCategoryPress(category.id)}
          >
            <Text style={styles.categoryEmoji}>{category.emoji}</Text>
            <Text
              style={[
                styles.categoryLabel,
                selectedCategory === category.id &&
                  styles.categoryLabelSelected,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000393",
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    minWidth: 80,
  },
  categoryItemSelected: {
    backgroundColor: "#4285F4",
  },
  categoryEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
  },
  categoryLabelSelected: {
    color: "#fff",
  },
});
