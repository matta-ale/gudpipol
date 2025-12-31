'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allProducts: [],
  myProducts: [],          // listados generales / filtrados
  favoriteProducts: [],    // SOLO destacados
  allCollections: [],
  loadingProducts: false,
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const { data } = await axios.get('/products');
    return data;
  }
);

export const getFilteredProducts = createAsyncThunk(
  'products/getFilteredProducts',
  async (collection) => {
    const { data } = await axios.get('/products');
    return data.filter(
      (product) => product.collection?.name === collection
    );
  }
);

export const getFavoriteProducts = createAsyncThunk(
  'products/getFavoriteProducts',
  async () => {
    const { data } = await axios.get('/products');
    return data.filter((product) => product.isDestacado === true);
  }
);

// Colecciones únicas desde allProducts
export const getCollections = createAsyncThunk(
  'products/getCollections',
  async (_, { getState }) => {
    const { allProducts } = getState().products;

    const map = new Map();

    allProducts.forEach((product) => {
      const collection = product.collection;
      if (collection?.name && !map.has(collection.name)) {
        map.set(collection.name, collection);
      }
    });

    return Array.from(map.values());
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // TODOS LOS PRODUCTOS
      .addCase(getProducts.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.myProducts = action.payload;
        state.loadingProducts = false;
      })

      // FILTRADOS
      .addCase(getFilteredProducts.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.myProducts = action.payload;
        state.loadingProducts = false;
      })
      .addCase(getFilteredProducts.rejected, (state) => {
        state.loadingProducts = false;
      })

      // FAVORITOS
      .addCase(getFavoriteProducts.fulfilled, (state, action) => {
        state.favoriteProducts = action.payload;
      })

      // COLECCIONES
      .addCase(getCollections.fulfilled, (state, action) => {
        state.allCollections = action.payload;
      });
  },
});

export default productsSlice.reducer;
