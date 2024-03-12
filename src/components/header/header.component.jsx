import React from 'react';
import { Link } from 'react-router-dom';

import { auth,signOut } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { useSelector } from 'react-redux';

import './header.styles.scss';



const Header = () => {
const currentUser = useSelector((state) => state.user.currentUser);

return (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      
      {currentUser ? (
        <div className='option' onClick={() => signOut(auth)}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);
}

export default Header;