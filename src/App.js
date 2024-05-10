import React, {useEffect } from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import CollectionPageContainer from './pages/collection/collection.container';
import CollectionsOverviewContainer from './components/collections-overview/collections-overview.container';
import { auth, onAuthStateChanged,createUserProfileDocument,onSnapshot,addCollectionAndDocuments} from './firebase/firebase.utils';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCurrentUser } from './redux/user/userSlice';
import CheckoutPage  from './pages/checkout/checkout.component';

const App = () => {
  let currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, (snapShot) => {
         dispatch(setCurrentUser({
          id: snapShot.id,
          ...snapShot.data()
        })) 
        });
      } else {
        dispatch(setCurrentUser(userAuth));
      }
    });
    
    return () => {
      unsubscribeFromAuth();
    };
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
