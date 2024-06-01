import React  from 'react';
import { useDispatch } from 'react-redux';
import { clearItem,addItem,removeItem} from '../../redux/cart/cartSlice';
import './checkout-item.styles.scss';


const CheckoutItem = ({cartItem}) => {
  const {imageUrl,name,quantity,price} = cartItem;
  const dispatch = useDispatch();
  
return (
  <div className='checkout-item'>
    <div className='image-container'>
      <img src={imageUrl} alt='item' />
    </div>
    <span className='name'>{name}</span>
  <span className='quantity'>
    {quantity === 1 ? (<div className='arrow disabled'>&#10094;</div>)
    :(<div className='arrow' onClick={() => dispatch(removeItem(cartItem))}>&#10094;</div>)}
    <span className='value'>{quantity}</span>
    <div className='arrow' onClick={() => dispatch(addItem(cartItem))}>
      &#10095;
    </div>
  </span>
  <span className='price'>{price}</span>
  <div className='remove-button' onClick={() => dispatch(clearItem(cartItem))}>
    &#10005;
  </div>
</div>
);
}
export default CheckoutItem;