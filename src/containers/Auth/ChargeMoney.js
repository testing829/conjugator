import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

import Button from '@material-ui/core/Button';

const ChargeMoney = ({ classes, email, handleSubmit }) => {
  const onToken = token => {
    console.log('token', token);
    console.log('token id', token.id);
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
      panelLabel="Pay $5.99 p/m"
      stripeKey="pk_test_unPtQINVSea0kHBCXAokZn3w00giYgCaey"
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
