import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hidden: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleHiddenCart(state,action) {
      state.hidden = !state.hidden;
    },
  },
});

export const { toggleHiddenCart } = cartSlice.actions;

export default cartSlice.reducer; 
