import { createSlice,createSelector } from '@reduxjs/toolkit';
import SHOP_DATA from './shop.data';
import memoize from 'lodash.memoize';

// Define the initial state using SHOP_DATA
const initialState = {
  collections: SHOP_DATA
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    // Reducers to update the state can be added here if needed
  }
});

//selectors

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  )
);

// Export the actions and reducer
// export const {} = shopSlice.actions;
export default shopSlice.reducer;
