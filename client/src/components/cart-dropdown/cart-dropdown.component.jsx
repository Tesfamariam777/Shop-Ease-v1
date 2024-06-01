import React from 'react';
import { useNavigate } from "react-router-dom";
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { useSelector,useDispatch } from 'react-redux';
import { toggleHiddenCart } from '../../redux/cart/cartSlice';


import './cart-dropdown.styles.scss';

const CartDropdown = () => 
{
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let cartItems = useSelector((state) => state.cart.cartItem);
  console.log("dropdown re-render");
  return (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
       cartItems.length ?  (
      cartItems.map(cartItem => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))
       ) : (
        <span className='empty-message'>Your cart is empty</span>
       )
      }
    </div>
    <CustomButton onClick={() => {navigate("/checkout");dispatch(toggleHiddenCart())}}>GO TO CHECKOUT</CustomButton>
  </div>
);
}

export default CartDropdown;