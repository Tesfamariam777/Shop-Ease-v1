import { createSlice,createSelector } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    hidden: true,
    cartItem: []
};

// Create slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleHiddenCart: (state) => {
    state.hidden = !state.hidden;
    },
    addItem: (state, action) => {
       
      const itemIndex = state.cartItem.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        // Item exists in cart already, increment quantity
        state.cartItem[itemIndex].quantity += 1;
      } else {
        const {id,name,imageUrl,price} = action.payload;
        // Item does not exist in cart yet, add it with quantity: 1
        state.cartItem.push({ id,name,imageUrl,price,quantity: 1 });
      }
    }
  }
});

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItem
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems
      ? cartItems.reduce(
          (accumalatedQuantity, cartItem) =>
            accumalatedQuantity + cartItem.quantity,
          0
        )
      : 0
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems
      ? cartItems.reduce(
          (accumalatedQuantity, cartItem) =>
            accumalatedQuantity + cartItem.quantity * cartItem.price,
          0
        )
      : 0
);

export const { addItem, toggleHiddenCart } = cartSlice.actions;

export default cartSlice.reducer;
