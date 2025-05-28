# Firebase Integration Testing Guide

This guide helps you test the Firebase integration in the E-Fit E-Life app.

## How to Test Firebase Connection

1. **Navigate to the Firebase Test Screen**:
   - Open the app and go to the Food tab
   - Tap on "Test Firebase" in the top-right corner

2. **Use the Firebase Test Screen**:
   - Tap "Test Firebase Connection" to verify basic connectivity
   - Tap "Seed Food Database" to populate the food database with initial items
   - Tap "List Test Food Items" to see test food items

3. **View Real Food Data**:
   - After seeding the database, go back to the Food tab
   - The food list should now display items from Firebase instead of mock data
   - Try searching for food items to test the Firebase search functionality

## Troubleshooting Firebase Connection

If you encounter issues with Firebase connectivity:

1. **Check your firebase config**:
   - Verify the Firebase configuration in `config/firebase/index.ts`
   - Make sure the project IDs and API keys are correct

2. **Verify Google Services Files**:
   - Ensure `google-services.json` is properly placed in the project root
   - Check that Firebase is properly initialized

3. **Check Network Connectivity**:
   - Make sure the device/emulator has internet access
   - Firebase requires an internet connection to work

4. **Check Firebase Console**:
   - Log into the Firebase console (firebase.google.com)
   - Verify that your project is set up correctly
   - Check that Firestore is enabled for your project

## Firebase Data Structure

The app uses the following Firestore collections:

1. **food-items**: The main collection for all food items
   - Fields: name, calories, protein, carbs, fat, category, etc.

2. **food-items-test**: A test collection used only for connection testing

## Next Steps

After confirming your Firebase connection works:

1. Implement user-specific food tracking
2. Add authentication integration
3. Create meal planning and calorie tracking features

Remember to handle Firebase errors gracefully and provide fallback UI when Firebase is unavailable.
