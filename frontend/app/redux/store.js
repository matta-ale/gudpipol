'use client';

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products'], // Aquí puedes añadir otros estados que quieras persistir
};

const rootReducer = combineReducers({
  products: productsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(/* otro middleware si lo tienes */),
});

export const persistor = persistStore(store);
