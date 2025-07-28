import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { EdamamApi } from '@/services/food/api/edamam-api';
import { EdamamModelConverter, FoodHint } from '@/types/edamam-api';

export default function EdamamTestScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const testApiConnection = async () => {
    setIsLoading(true);
    setResult('Testing API connection...');
      try {
      const response = await EdamamApi.searchFood('apple');
      const foods = response.hints.map((hint: FoodHint) => EdamamModelConverter.toSimplifiedFoodItem(hint));
      
      setResult(`✅ Success! Found ${foods.length} food items:\n\n${foods.slice(0, 3).map((food) => 
        `• ${food.name} (${food.calories} cal)`
      ).join('\n')}`);
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}`);
    }finally {
      setIsLoading(false);
    }
  };

  const testPopularFoods = async () => {
    setIsLoading(true);
    setResult('Testing popular foods...');
      try {
      const response = await EdamamApi.getPopularFoods();
      const foods = response.hints.map((hint: FoodHint) => EdamamModelConverter.toSimplifiedFoodItem(hint));
      
      setResult(`✅ Success! Found ${foods.length} popular foods:\n\n${foods.slice(0, 3).map((food) => 
        `• ${food.name} (${food.calories} cal)`
      ).join('\n')}`);
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}`);
    }finally {
      setIsLoading(false);
    }
  };

  const testCategorySearch = async () => {
    setIsLoading(true);
    setResult('Testing category search...');
      try {
      const response = await EdamamApi.searchByCategory('fruits');
      const foods = response.hints.map((hint: FoodHint) => EdamamModelConverter.toSimplifiedFoodItem(hint));
      
      setResult(`✅ Success! Found ${foods.length} fruit items:\n\n${foods.slice(0, 3).map((food) => 
        `• ${food.name} (${food.calories} cal)`
      ).join('\n')}`);
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}`);
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Edamam API Test</Text>
          <Text style={styles.subtitle}>Test the food database integration</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]} 
            onPress={testApiConnection}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Testing...' : 'Test Basic Search'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={testPopularFoods}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Testing...' : 'Test Popular Foods'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.tertiaryButton]} 
            onPress={testCategorySearch}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Testing...' : 'Test Category Search'}
            </Text>
          </TouchableOpacity>
        </View>

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Result:</Text>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    padding: 24,
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4285F4',
  },
  secondaryButton: {
    backgroundColor: '#0F9D58',
  },
  tertiaryButton: {
    backgroundColor: '#F4B400',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    margin: 24,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4285F4',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  resultText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
