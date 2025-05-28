import { firebaseFirestore } from '../../../config/firebase';

/**
 * Tests the Firebase connection by adding a test food item
 * Returns promise with success message or error
 */
export const testFirebaseConnection = async (): Promise<string> => {
  try {
    // Reference to the "food-items-test" collection
    const foodCollection = firebaseFirestore.collection('food-items-test');
    
    // Create a test food item
    const testFoodItem = {
      name: 'Test Pizza',
      calories: 250,
      createdAt: new Date().toISOString(),
      description: 'Test item to verify Firebase connection'
    };
    
    // Add the food item to Firestore
    const docRef = await foodCollection.add(testFoodItem);
    
    // Return success message with the document ID
    return `Firebase connection successful! Added test food item with ID: ${docRef.id}`;
  } catch (error: any) {
    // Return error message
    console.error('Firebase connection test failed:', error);
    return `Firebase connection failed: ${error.message}`;
  }
};

/**
 * Lists all food items from the test collection
 */
export const listTestFoodItems = async () => {
  try {
    const snapshot = await firebaseFirestore.collection('food-items-test').get();
    
    if (snapshot.empty) {
      return 'No food items found in test collection';
    }
    
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return items;
  } catch (error: any) {
    console.error('Error retrieving test food items:', error);
    return `Error retrieving food items: ${error.message}`;
  }
};
