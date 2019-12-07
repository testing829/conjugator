import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

import Button from '@material-ui/core/Button';

const ChargeMoney = ({ classes, email, handleSubmit }) => {
  const onToken = token => {
    handleSubmit(token);
  };

  return (
    <StripeCheckout // This component uses the token created above to make a one time payment
      amount={599}
      ComponentClass="div"
      currency="USD"
      description="Purchase your subscription"
      email={email}
      locale="auto"
      name="Conjugator"
      stripeKey={process.env.REACT_APP_STRIPE_API_KEY}
      token={onToken}
    >
      <Button
        className={classes.submit}
        color="primary"
        fullWidth
        type="submit"
        variant="contained"
      >
        Subscribe
      </Button>
    </StripeCheckout>
  );
};

export default ChargeMoney;
