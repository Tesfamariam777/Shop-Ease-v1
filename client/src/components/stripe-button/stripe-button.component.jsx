import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51P2VQuP4aEANH44CGsLS8PaGsMtUyGpZ33pQ3H24lImUkR5W0jjiyuTNavnsiD1VZbJd2JmjVXygWhBQyXvnwrqm00KdMqznU9';

  const onToken = token => {
    // fetch('/payment', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     amount: priceForStripe,
    //     token: token
    //   })
    // })
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   alert('Successful payment');
    // })
    // .catch(error => {
    //   console.error('Payment Error:', error);
    //   alert(
    //     'There was an issue with your payment! Please make sure you use the provided credit card.'
    //   );
    // });
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token: token
      }
    })
      .then(response => {
        alert('succesful payment');
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        alert(
          'There was an issue with your payment! Please make sure you use the provided credit card.'
        );
      });
  };
  

  return (
    <StripeCheckout
      label='Pay Now'
      name='Shop Ease Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;