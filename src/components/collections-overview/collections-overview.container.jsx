import React from 'react';
import { useSelector } from 'react-redux';


import { selectIsCollectionFetching } from '../../redux/shop/shopSlice';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const CollectionsOverviewContainer = () => {
    const isLoading = useSelector(selectIsCollectionFetching);

  const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);

  return <CollectionsOverviewWithSpinner isLoading={isLoading} />;
};

export default CollectionsOverviewContainer;
