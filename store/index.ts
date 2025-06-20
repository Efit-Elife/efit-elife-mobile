import { configureStore } from '@reduxjs/toolkit';
import foodReducer from '../features/food/store/foodSlice';
import foodLogReducer from '../features/food/store/foodLogSlice';

export const store = configureStore({
  reducer: {
    food: foodReducer,
    foodLog: foodLogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
