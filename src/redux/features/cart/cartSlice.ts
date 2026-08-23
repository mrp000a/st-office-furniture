import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  Cart,
  CartItemInput,
} from "./cartTypes";

type CartState = {
  cart: Cart | null;
  loading: boolean;
};

const initialState: CartState = {
  cart: null,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    /**
     * Set the complete cart.
     *
     * Used when:
     * - Loading cart from database
     * - Loading cart from localStorage
     * - After synchronizing guest cart with database
     */
    setCart: (
      state,
      action: PayloadAction<Cart>
    ) => {
      state.cart = action.payload;
    },

    /**
     * Clear the entire cart.
     */
    clearCart: (state) => {
      state.cart = null;
    },

    /**
     * Add a product to cart.
     *
     * Works for both:
     * - Guest users
     * - Logged-in users
     */
    addItem: (
      state,
      action: PayloadAction<CartItemInput>
    ) => {
      const newItem = action.payload;

      // Create a guest cart if no cart exists
      if (!state.cart) {
        state.cart = {
          items: [],
          _count: {
            items: 0,
          },
        };
      }

      const existingItem = state.cart.items.find(
        (item) =>
          item.productId === newItem.productId
      );

      if (existingItem) {
        existingItem.qty += newItem.qty;
      } else {
        state.cart.items.push({
          ...newItem,

          // Frontend-only ID for guest cart
          id: Date.now(),

          // Guest cart doesn't have a database cart
          cartId: undefined,

          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      // Number of different items
      state.cart._count.items =
        state.cart.items.length;
    },

    /**
     * Remove an item from cart.
     */
    removeItem: (
      state,
      action: PayloadAction<number>
    ) => {
      if (!state.cart) return;

      state.cart.items =
        state.cart.items.filter(
          (item) =>
            item.id !== action.payload
        );

      state.cart._count.items =
        state.cart.items.length;
    },

    /**
     * Update quantity.
     */
    updateQuantity: (
      state,
      action: PayloadAction<{
        itemId: number;
        qty: number;
      }>
    ) => {
      if (!state.cart) return;

      const item = state.cart.items.find(
        (item) =>
          item.id === action.payload.itemId
      );

      if (!item) return;

      // Don't allow zero or negative quantity
      if (action.payload.qty <= 0) {
        state.cart.items =
          state.cart.items.filter(
            (item) =>
              item.id !==
              action.payload.itemId
          );

        state.cart._count.items =
          state.cart.items.length;

        return;
      }

      item.qty = action.payload.qty;

      item.updatedAt =
        new Date().toISOString();
    },

    /**
     * Set loading state.
     */
    setLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCart,
  clearCart,
  addItem,
  removeItem,
  updateQuantity,
  setLoading,
} = cartSlice.actions;

export default cartSlice.reducer;