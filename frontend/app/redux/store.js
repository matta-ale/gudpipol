'use client';

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice'; // Importa el reducer

export const store = configureStore({
  reducer: {
    products: productsReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })//.concat(/* otro middleware si lo tienes */),
});
