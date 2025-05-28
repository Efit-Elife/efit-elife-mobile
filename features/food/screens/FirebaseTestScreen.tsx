import React, { useState } from 'react';
import { SafeAreaView } from '../../../components/ui/safe-area-view';
import { VStack } from '../../../components/ui/vstack';
import { Button, ButtonText } from '../../../components/ui/button';
import { Text } from '../../../components/ui/text';
import { ScrollView } from '../../../components/ui/scroll-view';
import { testFirebaseConnection, listTestFoodItems } from '../utils/firebase-test';
import { seedInitialFoodItems, getAllFoodItems, FoodItem } from '../utils/food-api';

export default function FirebaseTestScreen() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      const testResult = await testFirebaseConnection();
      setResult(testResult);
    } catch (error: any) {
      setResult(`Error: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleListFoodItems = async () => {
    setIsLoading(true);
    try {
      const items = await listTestFoodItems();
      if (typeof items === 'string') {
        setResult(items);
        setFoodItems([]);
      } else {
        setResult(`Retrieved ${items.length} food items`);
        setFoodItems(items);
      }
    } catch (error: any) {
      setResult(`Error: ${error?.message || 'Unknown error'}`);
      setFoodItems([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSeedFoodItems = async () => {
    setIsLoading(true);
    try {
      await seedInitialFoodItems();
      setResult('Successfully seeded initial food items!');
      
      // Now get and display the food items
      const items = await getAllFoodItems();
      setFoodItems(items);
    } catch (error: any) {
      setResult(`Error seeding food data: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <VStack className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-6">Firebase Connection Test</Text>
        
        <Button 
          action="primary" 
          variant="solid" 
          size="lg"
          onPress={handleTestConnection}
          className="mb-4"
          disabled={isLoading}
        >
          <ButtonText>{isLoading ? 'Testing...' : 'Test Firebase Connection'}</ButtonText>
        </Button>        <Button 
          action="secondary" 
          variant="outline" 
          size="lg"
          onPress={handleListFoodItems}
          className="mb-4"
          disabled={isLoading}
        >
          <ButtonText>{isLoading ? 'Loading...' : 'List Test Food Items'}</ButtonText>
        </Button>
        
        <Button 
          action="positive" 
          variant="solid" 
          size="lg"
          onPress={handleSeedFoodItems}
          className="mb-6"
          disabled={isLoading}
        >
          <ButtonText>{isLoading ? 'Seeding...' : 'Seed Food Database'}</ButtonText>
        </Button>

        {result && (
          <VStack className="bg-gray-50 p-4 rounded-lg mb-4">
            <Text className="font-medium">Result:</Text>
            <Text className="text-sm">{result}</Text>
          </VStack>
        )}

        {foodItems.length > 0 && (
          <VStack className="flex-1">
            <Text className="font-medium mb-2">Food Items in Database:</Text>
            <ScrollView className="flex-1">
              {foodItems.map((item, index) => (
                <VStack 
                  key={item.id || index}
                  className="bg-gray-50 p-3 mb-2 rounded-lg"
                >
                  <Text className="font-medium">{item.name}</Text>
                  <Text className="text-sm text-gray-500">{item.calories} cal</Text>
                  <Text className="text-xs mt-1">{item.description || 'No description'}</Text>
                  <Text className="text-xs text-gray-400 mt-1">ID: {item.id}</Text>
                </VStack>
              ))}
            </ScrollView>
          </VStack>
        )}
      </VStack>
    </SafeAreaView>
  );
}
