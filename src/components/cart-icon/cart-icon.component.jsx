import React from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import {toggleHiddenCart} from '../../redux/cart/cartSlice'
import { useDispatch } from 'react-redux';


function CartIcon() {
  const dispatch = useDispatch();

  return (
    <div className='cart-icon' onClick={() => dispatch(toggleHiddenCart())}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>0</span>
    </div>
  )
}

export default CartIcon 