import React from 'react';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { useSelector} from 'react-redux';
import { selectCartItems,selectCartTotal } from '../../redux/cart/cartSlice';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import './checkout.styles.scss';

const CheckoutPage = () => {
   const cartItems = useSelector(selectCartItems);
   const total = useSelector(selectCartTotal);
return (
  <div className='checkout-page'>
    <div className='checkout-header'>
      <div className='header-block product'>
        <span>Product</span>
      </div>
      <div className='header-block description'>
        <span>Description</span>
      </div>
      <div className='header-block quantity'>
        <span>Quantity</span>
      </div>
      <div className='header-block price'>
        <span>Price</span>
      </div>
      <div className='header-block remove-button'>
        <span>Remove</span>
      </div>
    </div>
    
    {cartItems && cartItems.map(cartItem =>(
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />))    
    }
    <div className='total'>{`TOTAL: ${total}`}</div>
    <StripeCheckoutButton price={total}/>

 </div>
)
}

export default CheckoutPage;
