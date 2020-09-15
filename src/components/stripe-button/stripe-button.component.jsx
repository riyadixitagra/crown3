import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
   const priceForStripe = price * 100;
   const publishableKey = 'pk_test_51HRLgpAXSZdOH3bcxqavFJyGsqtU5Wtn7BKNpzKnucCg36cI0vFJzuDuFyjLMOBNMMIWGV7KXp1WEl2LQJshOdM100ZXOgVNtZ';


   const onToken = token => {
      console.log(token);
      alert('Payement Successful');
   }

   return(
      <StripeCheckout
      label = 'Pay Now'
      name = 'CROWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
      />
   );
};

export default StripeCheckoutButton;