'use client';

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// desde acá
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

//hasta acá se puede hacer en otro archivo e importarlo
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
