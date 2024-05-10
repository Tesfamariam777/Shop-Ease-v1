import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shopSlice';
const ShopPage = () => {
  const dispatch = useDispatch();
  useEffect( () => {
    dispatch(fetchCollectionsStartAsync());
  },[])
  return (
    <div className='shop-page'>
      {/* Outlet will render the nested route components */}
      <Outlet />
    </div>
  );
};

export default ShopPage;