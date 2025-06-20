import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { RootState } from '@/store';
import { 
  selectIsLogging, 
  selectSelectedFood, 
  selectLoggingState,
  setServingSize,
  setServingUnit,
  setNotes,
  setSelectedMealTime,
  logFood,
  cancelLogging
} from '../store/foodLogSlice';
import { MEAL_TIME_CONFIGS, MealTime } from '@/types/food-log';

export const FoodLoggingModal: React.FC = () => {
  const dispatch = useDispatch();
  const isLogging = useSelector(selectIsLogging);
  const selectedFood = useSelector(selectSelectedFood);
  const { servingSize, servingUnit, notes, selectedMealTime } = useSelector((state: RootState) => selectLoggingState(state));

  const [showMealPicker, setShowMealPicker] = useState(false);

  if (!isLogging || !selectedFood) {
    return null;
  }
  const handleSave = () => {
    if (servingSize <= 0) {
      Alert.alert('Error', 'Please enter a valid serving size');
      return;
    }

    dispatch(logFood());
    Alert.alert('Success', 'Food has been logged to your diary');
  };

  const handleCancel = () => {
    dispatch(cancelLogging());
  };

  const calculateNutrition = (value: number) => {
    return Math.round(value * servingSize * 100) / 100;
  };

  const availableMeasures = selectedFood.measures || [{ label: 'serving', weight: 100, uri: '' }];

  return (
    <Modal visible={isLogging} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        <VStack className="flex-1">          {/* Header */}
          <HStack className="justify-between items-center p-4 border-b border-gray-200">
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Log Food</Text>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </HStack>

          {/* Food Info */}
          <View style={styles.foodInfoSection}>
            <Text style={styles.foodName}>{selectedFood.name}</Text>
            <Text style={styles.foodCategory}>{selectedFood.category}</Text>
          </View>

          {/* Meal Time Selection */}          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Meal</Text>
            <TouchableOpacity 
              style={styles.mealTimeButton} 
              onPress={() => setShowMealPicker(true)}
            ><Text style={styles.mealTimeText}>
                {MEAL_TIME_CONFIGS[selectedMealTime as MealTime].icon} {MEAL_TIME_CONFIGS[selectedMealTime as MealTime].label}
              </Text>
              <Text style={styles.mealTimeArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Serving Size */}          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Serving Size</Text>
            <HStack className="items-center justify-between">
              <View style={styles.servingSizeContainer}>
                <TextInput
                  style={styles.servingSizeInput}
                  value={servingSize.toString()}
                  onChangeText={(text) => {
                    const value = parseFloat(text) || 0;
                    dispatch(setServingSize(value));
                  }}
                  keyboardType="numeric"
                  placeholder="1"
                />
              </View>
              
              <TouchableOpacity 
                style={styles.unitButton}                onPress={() => {
                  // Show unit picker - for now just cycle through available measures
                  const currentIndex = availableMeasures.findIndex((m: any) => m.label === servingUnit);
                  const nextIndex = (currentIndex + 1) % availableMeasures.length;
                  dispatch(setServingUnit(availableMeasures[nextIndex].label));
                }}
              >
                <Text style={styles.unitText}>{servingUnit}</Text>
              </TouchableOpacity>
            </HStack>
          </View>

          {/* Nutrition Preview */}          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutrition Preview</Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{calculateNutrition(selectedFood.calories)}</Text>
                <Text style={styles.nutritionLabel}>Calories</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{calculateNutrition(selectedFood.protein)}g</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{calculateNutrition(selectedFood.carbs)}g</Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{calculateNutrition(selectedFood.fat)}g</Text>
                <Text style={styles.nutritionLabel}>Fat</Text>
              </View>
            </View>
          </View>

          {/* Notes */}          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes (optional)</Text>
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={(text) => dispatch(setNotes(text))}
              placeholder="Add notes about this food..."
              multiline
              numberOfLines={3}
            />
          </View>
        </VStack>

        {/* Meal Time Picker Modal */}
        <Modal visible={showMealPicker} transparent animationType="fade">
          <View style={styles.pickerOverlay}>            <View style={styles.pickerContainer}>
              <Text style={styles.pickerTitle}>Select Meal</Text>
              {Object.values(MEAL_TIME_CONFIGS).map((config) => (
                <TouchableOpacity
                  key={config.mealTime}
                  style={[
                    styles.pickerOption,
                    selectedMealTime === config.mealTime && styles.pickerOptionSelected
                  ]}
                  onPress={() => {
                    dispatch(setSelectedMealTime(config.mealTime));
                    setShowMealPicker(false);
                  }}
                >
                  <Text style={styles.pickerOptionText}>
                    {config.icon} {config.label}
                  </Text>
                  <Text style={styles.pickerOptionTime}>{config.timeRange}</Text>
                </TouchableOpacity>
              ))}              <TouchableOpacity 
                style={styles.pickerCancelButton}
                onPress={() => setShowMealPicker(false)}
              >
                <Text style={styles.pickerCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cancelButton: {
    fontSize: 16,
    color: '#FF3B30',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    fontSize: 16,
    color: '#4285F4',
    fontWeight: '600',
  },
  foodInfoSection: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  foodName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  foodCategory: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  mealTimeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  mealTimeText: {
    fontSize: 16,
    color: '#333',
  },
  mealTimeArrow: {
    fontSize: 12,
    color: '#666',
  },
  servingSizeContainer: {
    flex: 1,
    marginRight: 12,
  },
  servingSizeInput: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    textAlign: 'center',
  },
  unitButton: {
    padding: 12,
    backgroundColor: '#4285F4',
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  unitText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4285F4',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  notesInput: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  pickerOption: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  pickerOptionSelected: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#4285F4',
  },
  pickerOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  pickerOptionTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  pickerCancelButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  pickerCancelText: {
    fontSize: 16,
    color: '#FF3B30',
  },
});
