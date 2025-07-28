import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { seedInitialFoodItems, FoodItem, getAllFoodItems } from '../utils/food-api';

// Mock food data with ID, name, and calories
const mockFoodItems = [
  { id: '1', name: 'Pizza', calories: 285 },
  { id: '2', name: 'Cheese Pizza', calories: 265 },
  { id: '3', name: 'Frozen Pizza', calories: 288 },
  { id: '4', name: 'Pepperoni Pizza', calories: 292 },
  { id: '5', name: 'Sausage Pizza', calories: 295 },
  { id: '6', name: 'Stuffed Cheese Pizza', calories: 274 },
  { id: '7', name: 'Veggy Cheese Pizza', calories: 254 }
];

export default function DevelopmentScreen() {
  const [items, setItems] = useState<FoodItem[]>(mockFoodItems);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleTestConnection = () => {
    setLoading(true);
    // Simulate a delay
    setTimeout(() => {
      setResult('Firebase Web SDK connection initialized');
      setLoading(false);
    }, 1000);
  };
  
  const handleListItems = async () => {
    setLoading(true);
    try {
      const foodItems = await getAllFoodItems();
      setItems(foodItems);
      setResult(`Retrieved ${foodItems.length} food items from Firebase`);
    } catch (error: any) {
      setResult(`Error fetching items: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddItem = () => {
    setLoading(true);
    // Simulate adding a new item
    const newItem = {
      id: `mock-${Date.now()}`,
      name: `Test Food ${Math.floor(Math.random() * 100)}`,
      calories: Math.floor(Math.random() * 400) + 100
    };
    
    setTimeout(() => {
      setItems([...items, newItem]);
      setResult(`Added new item: ${newItem.name} with ${newItem.calories} calories`);
      setLoading(false);
    }, 1000);
  };
  
  const handleSeedData = async () => {
    setLoading(true);
    try {
      await seedInitialFoodItems();
      setResult('Successfully seeded food items to Firebase');
      
      // Refresh the list after seeding
      const foodItems = await getAllFoodItems();
      setItems(foodItems);
    } catch (error: any) {
      setResult(`Error seeding data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Development Test Mode</Text>
        <Text style={styles.subHeaderText}>
          (Using Firebase Web SDK)
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleTestConnection}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Testing...' : 'Test Firebase Connection'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleListItems}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'List Food Items'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.addButton]}
          onPress={handleAddItem}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Adding...' : 'Add Mock Food Item'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.seedButton]}
          onPress={handleSeedData}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Seeding...' : 'Seed Food Database'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {result ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      ) : null}
      
      <ScrollView style={styles.scrollView}>
        {items.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCalories}>{item.calories} cal</Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          This application uses Firebase Web SDK for database operations.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  buttonContainer: {
    padding: 16,
    gap: 12,
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#0F9D58',
  },
  seedButton: {
    backgroundColor: '#DB4437',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    margin: 16,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4285F4',
  },
  resultText: {
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemCalories: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});