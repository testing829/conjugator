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
      description="1 month free and then $5.99 p/m"
      email={email}
      locale="auto"
      name="Conjugator"
      panelLabel="Start trial"
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
        Start Free Trial
      </Button>
    </StripeCheckout>
  );
};

export default ChargeMoney;
