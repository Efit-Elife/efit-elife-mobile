import React, { useState, useEffect } from 'react';
import { VStack } from '../../../components/ui/vstack';
import { ScrollView } from '../../../components/ui/scroll-view';
import { FoodSearch } from './FoodSearch';
import { FoodItem } from './FoodItem';
import { Text } from '../../../components/ui/text';
import { Spinner } from '../../../components/ui/spinner';
import { getAllFoodItems, searchFoodItems, FoodItem as FoodItemType } from '../utils/food-api';

// Fallback data in case Firebase is not available
const FALLBACK_FOOD_DATA = [
  { id: '1', name: 'Pizza', calories: 285 },
  { id: '2', name: 'Cheese Pizza', calories: 265 },
  { id: '3', name: 'Frozen Pizza', calories: 288 },
  { id: '4', name: 'Pepperoni Pizza', calories: 292 },
  { id: '5', name: 'Sausage Pizza', calories: 295 },
  { id: '6', name: 'Stuffed Cheese Pizza', calories: 274 },
  { id: '7', name: 'Veggy Cheese Pizza', calories: 254 },
  { id: '8', name: 'Thick Crust Cheese Pizza', calories: 271 },
  { id: '9', name: 'Thick Crust Pepperoni Pizza', calories: 280 },
  { id: '10', name: 'Thin Crust Pizza', calories: 245 },
];

export const FoodList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foodItems, setFoodItems] = useState<FoodItemType[]>([]);
  const [filteredFood, setFilteredFood] = useState<FoodItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch food items when component mounts
  useEffect(() => {
    const fetchFoodItems = async () => {
      setIsLoading(true);
      try {
        const items = await getAllFoodItems();
        setFoodItems(items);
        setFilteredFood(items);
      } catch (err: any) {
        console.error('Error fetching food items:', err);
        setError('Unable to load food items. Using fallback data.');
        setFoodItems(FALLBACK_FOOD_DATA);
        setFilteredFood(FALLBACK_FOOD_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    
    try {
      if (!searchQuery.trim()) {
        setFilteredFood(foodItems);
        return;
      }
      
      // Try to use Firebase search
      try {
        const searchResults = await searchFoodItems(searchQuery);
        setFilteredFood(searchResults);
      } catch (err) {
        // Fallback to local filtering if Firebase search fails
        console.log('Firebase search failed, falling back to local filtering');
        const filtered = foodItems.filter(food => 
          food.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredFood(filtered);
      }
    } catch (err: any) {
      setError(`Search error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddFood = (id: string) => {
    console.log(`Added food with id: ${id}`);
    // Here you would implement logic to add the food to the user's selection or meal plan
  };
  return (
    <VStack className="flex-1 bg-white">
      <FoodSearch
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />
      
      {isLoading ? (
        <VStack className="flex-1 items-center justify-center">
          <Spinner size="large" color="#4285F4" />
          <Text className="mt-4 text-gray-500">Loading food items...</Text>
        </VStack>
      ) : error ? (
        <VStack className="flex-1 items-center justify-center p-4">
          <Text className="text-error-500">{error}</Text>
        </VStack>
      ) : (
        <ScrollView className="flex-1">
          <VStack>
            {filteredFood.length > 0 ? (
              filteredFood.map(food => (
                <FoodItem
                  key={food.id}
                  name={food.name}
                  calories={food.calories}
                  onAdd={() => handleAddFood(food.id || '')}
                />
              ))
            ) : (
              <VStack className="items-center justify-center py-8">
                <Text className="text-gray-500">No food items found</Text>
              </VStack>
            )}
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
};
