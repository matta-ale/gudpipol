// features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Cada item tendrá un { id, name, price, quantity, image }
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
        
      if (existingItem) {
        existingItem.color = newItem.color || '#463F34'
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
        });
      }
      

      state.totalQuantity += newItem.quantity || 1;
      state.totalPrice += newItem.price * (newItem.quantity || 1);
    },

    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity += 1;
        state.totalPrice += existingItem.price;
        existingItem.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
        const id = action.payload;
        const existingItem = state.items.find((item) => item.id === id);
        if (existingItem && existingItem.quantity > 1) {
          state.totalQuantity -= 1;
          state.totalPrice -= existingItem.price;
          existingItem.quantity -= 1;
        }
      },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    updateColor: (state, action) => {
      const {id,color} = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      existingItem.color = color
    },

  },
});

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
