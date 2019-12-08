/*eslint-disable */
import React, { useContext, useEffect } from 'react';

import StripeCheckout from 'react-stripe-checkout';
import { useMutation } from 'react-apollo-hooks';

import { Context } from '../../contexts/index';
import { CREATE_USER } from '../../gql/users.gql';

const ChargeMoney = ({
  classes,
  children,
  email,
  error,
  history,
  fullName,
  password,
  setError,
  setShortPassword
}) => {
  const { setLoggedIn } = useContext(Context);
  const [createUser, { data }] = useMutation(CREATE_USER);

  const onToken = async token => {
    if (token && token.id) {
      if (password.length < 8) {
        setShortPassword(true);
      }
      try {
        await createUser({
          variables: {
            name: fullName,
            email: email.toLowerCase(),
            password,
            stripeSource: token.id
          }
        });
      } catch (err) {
        setError(true);
      }
    }
  };

  useEffect(() => {
    const redirect = () => {
      localStorage.setItem('jwt', data.createUser.token);
      setLoggedIn(true);
      setOpen(true);
      history.push('/');
    };

    if (!error && data) {
      redirect();
    }
  }, [data]);

  return (
    // <Button
    //   className={classes.submit}
    //   color="primary"
    //   disabled={!email || !fullName || !password}
    //   fullWidth
    //   type="submit"
    //   variant="contained"
    // >
    <StripeCheckout
      amount={599}
      // ComponentClass="button"
      className={classes.submit}
      currency="USD"
      description="$5.99 p/m"
      email={email}
      locale="auto"
      name="Conjugator"
      panelLabel="Subscribe"
      stripeKey={process.env.REACT_APP_STRIPE_API_KEY}
      token={onToken}
    >
      {children}
    </StripeCheckout>
    // </Button>
  );
};

export default ChargeMoney;
