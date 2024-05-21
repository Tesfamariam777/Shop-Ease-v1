import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';
import { signOutStart } from '../../redux/user/userSlice';



const Header = () => {
  const dispatch = useDispatch();
  let  currentUser = useSelector(state => state.user.currentUser);
  let hidden = useSelector(state => state.cart.hidden);

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
        <div className='option' onClick={() => dispatch(signOutStart())}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);
}

export default Header;