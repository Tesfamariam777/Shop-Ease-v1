import React from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { useDispatch } from 'react-redux';
import { toggleHiddenCart } from '../../redux/cart/cartSlice';
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../../redux/cart/cartSlice';

function CartIcon() {
  const dispatch = useDispatch();
  const totalItemsQuantity = useSelector(selectCartItemsCount);
  
  return (
    <div className='cart-icon' onClick={() => dispatch(toggleHiddenCart())}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{totalItemsQuantity}</span>
    </div>
  )
}

export default CartIcon 