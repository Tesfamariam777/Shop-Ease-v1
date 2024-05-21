import { createSlice,createSelector } from '@reduxjs/toolkit';
import memoize from 'lodash.memoize';

const initialState = {
  collections: null,
  isFetching: false,
  errorMessage: undefined
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    fetchCollectionsStart(state) {
      state.isFetching = true;
    },
    fetchCollectionsSuccess(state, action) {
      state.isFetching = false;
      state.collections = action.payload;
    },
    fetchCollectionsFailure(state, action) {
      state.isFetching = false;
      state.errorMessage = action.payload;
    }
  }
});

export const {
  fetchCollectionsStart,
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} = shopSlice.actions;

export default shopSlice.reducer;




//selectors

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => (collections ? (Object.keys(collections).map(key => collections[key])) : collections)
);

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  )
);
export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
);


