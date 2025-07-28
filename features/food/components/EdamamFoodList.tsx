import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { SimplifiedFoodItem } from '@/types/edamam-api';

interface EdamamFoodListProps {
  foods: SimplifiedFoodItem[];
  onFoodPress: (food: SimplifiedFoodItem) => void;
  loading?: boolean;
  error?: string | null;
}

const EdamamFoodItem: React.FC<{ 
  item: SimplifiedFoodItem; 
  onPress: (food: SimplifiedFoodItem) => void;
}> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.foodItem} onPress={() => onPress(item)}>
    {item.image ? (
      <Image source={{ uri: item.image }} style={styles.foodImage} />
    ) : (
      <View style={styles.placeholderImage}>
        <Text style={styles.placeholderText}>🍽️</Text>
      </View>
    )}
    
    <View style={styles.foodInfo}>
      <Text style={styles.foodName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.foodCategory}>{item.category}</Text>
      
      <View style={styles.nutritionRow}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{item.calories}</Text>
          <Text style={styles.nutritionLabel}>cal</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{item.protein}g</Text>
          <Text style={styles.nutritionLabel}>protein</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{item.carbs}g</Text>
          <Text style={styles.nutritionLabel}>carbs</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{item.fat}g</Text>
          <Text style={styles.nutritionLabel}>fat</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export const EdamamFoodList: React.FC<EdamamFoodListProps> = ({ 
  foods, 
  onFoodPress, 
  loading = false, 
  error = null 
}) => {
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Searching for foods...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (foods.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No foods found</Text>
        <Text style={styles.emptySubtext}>Try a different search term</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={foods}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <EdamamFoodItem item={item} onPress={onFoodPress} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  foodItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 32,
  },
  foodInfo: {
    flex: 1,
    marginLeft: 16,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  foodCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4285F4',
  },
  nutritionLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
});
