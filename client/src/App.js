import React, {useEffect } from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';

import './App.scss';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import CollectionPageContainer from './pages/collection/collection.container';
import CollectionsOverviewContainer from './components/collections-overview/collections-overview.container';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutPage  from './pages/checkout/checkout.component';
import { checkUserSession } from './redux/user/userSlice';

const App = () => {
  let currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />}>
          <Route index element={<CollectionsOverviewContainer />} />
          <Route path=":collectionId" element={<CollectionPageContainer />} />  
        </Route>
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path="/signin" element={currentUser ? <Navigate to="/" /> : <SignInAndSignUpPage />} />
       
      </Routes>
    </div>
  );
};

export default App;
