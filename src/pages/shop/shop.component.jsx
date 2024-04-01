import { Outlet } from 'react-router-dom';

const ShopPage = () => {
  return (
    <div className='shop-page'>
      {/* Outlet will render the nested route components */}
      <Outlet />
    </div>
  );
};

export default ShopPage;