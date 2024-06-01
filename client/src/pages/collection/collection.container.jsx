import React from 'react';
import { useSelector } from 'react-redux';

import { selectIsCollectionsLoaded } from '../../redux/shop/shopSlice';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const CollectionPageContainer = () => {
  let isLoading = !useSelector(selectIsCollectionsLoaded);
  
  const CollectionPageWithSpinner = WithSpinner(CollectionPage);

  return <CollectionPageWithSpinner isLoading={isLoading} />;
};

export default CollectionPageContainer;
