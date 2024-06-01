import React from 'react'
import './collection-item.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cartSlice';
import { useDispatch } from 'react-redux';

function CollectionItem({item}) {
  const { name,imageUrl,price } = item;
  const dispatch = useDispatch();
  return (
    <div className='collection-item'>
        <div
            className='image' 
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
        />
        <div className='collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <CustomButton inverted onClick={() => dispatch(addItem(item))}>Add to cart </CustomButton>
    </div>
  )
}

export default CollectionItem