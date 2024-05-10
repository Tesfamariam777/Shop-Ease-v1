import { createSlice,createSelector } from '@reduxjs/toolkit';
import { convertCollectionsSnapshotToMap,db} from '../../firebase/firebase.utils';
import {collection,getDocs} from 'firebase/firestore'
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


export const fetchCollectionsStartAsync = () => async dispatch => {
  try {
    dispatch(fetchCollectionsStart());
    const collectionRef = collection(db, 'collections');
    const snapshot = await getDocs(collectionRef);
    const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    dispatch(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    dispatch(fetchCollectionsFailure(error.message));
  }
};




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

// Export the actions and reducer
// export const {} = shopSlice.actions;
