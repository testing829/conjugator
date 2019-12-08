import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

import Button from '@material-ui/core/Button';

const ChargeMoney = ({ classes, email, handleSubmit, fullName, password }) => {
  const onToken = token => {
    handleSubmit(token);
  };

  return (
    <StripeCheckout
      ComponentClass="div"
      currency="USD"
      description="$5.99 p/m"
      email={email}
      locale="auto"
      name="Conjugator"
      panelLabel="Subscribe"
      stripeKey={process.env.REACT_APP_STRIPE_API_KEY}
      token={onToken}
    >
      <Button
        className={classes.submit}
        color="primary"
        disabled={!email || !fullName || !password}
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
