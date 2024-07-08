import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: 0,
    items: [],
    isChanged: false,
  },
  reducers: {
    updateCart(state, action) {
      const transformedItems = [];
      for (const key in action.payload) {
        const item = action.payload[key];
        transformedItems.push({ id: key, ...item });
      }
      state.items = transformedItems;
    },

    onAddItem(state, action) {
      state.isChanged = true;
      const existingItem = state.items.find(i => i.id === action.payload.id);

      if (existingItem) {
        existingItem.count += action.payload.count;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice += action.payload.price * action.payload.count;
    },
    onRemoveItem(state, action) {
      state.isChanged = true;
      const existingItem = state.items.find(i => i.id === action.payload);
      if (existingItem.count === 1) {
        state.items = state.items.filter(i => i.id !== action.payload);
      } else {
        existingItem.count--;
      }

      state.totalPrice -= existingItem.price;
    },
    clear() {},
  },
});

export const getCartItems = () => {
  return async dispatch => {
    const res = await fetch(
      "https://products-dc2c8-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
    );
    const data = await res.json();
    dispatch(cartActions.updateCart(data));
  };
};

export const cartActions = cartSlice.actions;

const store = configureStore({ reducer: cartSlice.reducer });

export default store;
