import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  startAt, 
  endAt,
  limit,
  writeBatch
} from 'firebase/firestore';
import { firebaseFirestore } from '../../../config/firebase';

// The main collection name for food items
const FOOD_COLLECTION = 'food-items';

/**
 * Interface for a food item
 */
export interface FoodItem {
  id?: string;
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  category?: string;
  image?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get all food items from Firestore
 */
export const getAllFoodItems = async (): Promise<FoodItem[]> => {
  try {
    const foodCollection = collection(firebaseFirestore, FOOD_COLLECTION);
    const snapshot = await getDocs(foodCollection);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<FoodItem, 'id'>
    }));
  } catch (error) {
    console.error('Error fetching food items:', error);
    throw error;
  }
};

/**
 * Search food items by name
 */
export const searchFoodItems = async (queryText: string): Promise<FoodItem[]> => {
  try {
    const foodCollection = collection(firebaseFirestore, FOOD_COLLECTION);
    const q = query(
      foodCollection,
      orderBy('name'),
      startAt(queryText),
      endAt(queryText + '\uf8ff')
    );
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<FoodItem, 'id'>
    }));
  } catch (error) {
    console.error('Error searching food items:', error);
    throw error;
  }
};

/**
 * Add a new food item to Firestore
 */
export const addFoodItem = async (foodItem: Omit<FoodItem, 'id'>): Promise<string> => {
  try {
    const now = new Date().toISOString();
    const itemWithTimestamps = {
      ...foodItem,
      createdAt: now,
      updatedAt: now
    };
    
    const foodCollection = collection(firebaseFirestore, FOOD_COLLECTION);
    const docRef = await addDoc(foodCollection, itemWithTimestamps);
    return docRef.id;
  } catch (error) {
    console.error('Error adding food item:', error);
    throw error;
  }
};

/**
 * Delete a food item from Firestore
 */
export const deleteFoodItem = async (id: string): Promise<void> => {
  try {
    const docRef = doc(firebaseFirestore, FOOD_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting food item:', error);
    throw error;
  }
};

/**
 * Seed the database with initial food items if empty
 */
export const seedInitialFoodItems = async (): Promise<void> => {
  try {
    // Check if collection is empty first
    const foodCollection = collection(firebaseFirestore, FOOD_COLLECTION);
    const q = query(foodCollection, limit(1));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      console.log('Food collection already has data, skipping seed');
      return;
    }
    
    // Initial food items to seed
    const initialFoodItems: Omit<FoodItem, 'id'>[] = [
      { name: 'Pizza', calories: 285, protein: 12, carbs: 36, fat: 10, category: 'Fast Food' },
      { name: 'Cheese Pizza', calories: 265, protein: 15, carbs: 33, fat: 8, category: 'Fast Food' },
      { name: 'Frozen Pizza', calories: 288, protein: 11, carbs: 38, fat: 11, category: 'Fast Food' },
      { name: 'Pepperoni Pizza', calories: 292, protein: 14, carbs: 34, fat: 12, category: 'Fast Food' },
      { name: 'Sausage Pizza', calories: 295, protein: 14, carbs: 35, fat: 13, category: 'Fast Food' },
      { name: 'Stuffed Cheese Pizza', calories: 274, protein: 16, carbs: 38, fat: 9, category: 'Fast Food' },
      { name: 'Veggy Cheese Pizza', calories: 254, protein: 13, carbs: 36, fat: 7, category: 'Fast Food' },
      { name: 'Thick Crust Cheese Pizza', calories: 271, protein: 14, carbs: 39, fat: 9, category: 'Fast Food' },
      { name: 'Thick Crust Pepperoni Pizza', calories: 280, protein: 15, carbs: 37, fat: 10, category: 'Fast Food' },
      { name: 'Thin Crust Pizza', calories: 245, protein: 12, carbs: 30, fat: 8, category: 'Fast Food' },
      { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, category: 'Protein' },
      { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8, category: 'Grain' },
      { name: 'Salmon', calories: 208, protein: 20, carbs: 0, fat: 13, category: 'Protein' },
      { name: 'Avocado', calories: 240, protein: 3, carbs: 12, fat: 22, category: 'Fruit' },
      { name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0.4, category: 'Dairy' }
    ];
    
    // Add each food item
    const batch = writeBatch(firebaseFirestore);
    const now = new Date().toISOString();
    
    initialFoodItems.forEach(item => {
      const docRef = doc(collection(firebaseFirestore, FOOD_COLLECTION));
      batch.set(docRef, {
        ...item,
        createdAt: now,
        updatedAt: now
      });
    });
    
    await batch.commit();
    console.log('Successfully seeded initial food items');
  } catch (error) {
    console.error('Error seeding food items:', error);
    throw error;
  }
};