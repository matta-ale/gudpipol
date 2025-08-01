'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  myProducts: [],
  allProducts: [],
  allCollections: [],
  homeStatus: {
    page: 1,
    order: 'ascending',
    originFilter: 'all',
    genreFilter: 'all',
    loading: false,
    firstRender: true,
  },
  cart: {
    productQuantity: 0,
  },
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
    const filteredData = data.filter(
      (product) => product.collection.name === collection
    );
    return filteredData;
  }
);

export const getFavoriteProducts = createAsyncThunk(
  'products/getFavoriteProducts',
  async () => {
    const { data } = await axios.get('/products');
    const favoriteData = data.filter(
      (product) => product.isDestacado === true
    );
    return favoriteData;
  }
);

// Extrae colecciones únicas desde allProducts ya filtrados
export const getCollections = createAsyncThunk(
  'products/getCollections',
  async (_, { getState }) => {
    const { allProducts } = getState().products;

    const uniqueMap = new Map();

    allProducts.forEach((product) => {
      const name = product.collection?.name;
      if (name && !uniqueMap.has(name)) {
        uniqueMap.set(name, product.collection);
      }
    });

    return Array.from(uniqueMap.values());
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.myProducts = [...action.payload];
        state.allProducts = [...action.payload];
        state.homeStatus = { ...state.homeStatus, loading: false };
      })
      .addCase(getFilteredProducts.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.myProducts = [...action.payload];
        state.loadingProducts = false;
      })
      .addCase(getFilteredProducts.rejected, (state) => {
        state.loadingProducts = false;
      })
      .addCase(getFavoriteProducts.fulfilled, (state, action) => {
        state.myProducts = [...action.payload];
        state.homeStatus = { ...state.homeStatus, loading: false };
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        state.allCollections = [...action.payload];
        state.homeStatus.loading = false;
      });
  },
});

export const { setPage, setLoading, setFirstRender } = productsSlice.actions;

export default productsSlice.reducer;
