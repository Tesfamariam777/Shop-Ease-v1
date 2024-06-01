import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shopSlice';
const ShopPage = () => {
  const dispatch = useDispatch();
  useEffect( () => {
    dispatch(fetchCollectionsStart());
  },[dispatch])
  return (
    <div className='shop-page'>
      {/* Outlet will render the nested route components */}
      <Outlet />
    </div>
  );
};

export default ShopPage;