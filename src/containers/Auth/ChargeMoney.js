/*eslint-disable */
import React, { useContext, useEffect } from 'react';

import { createHashHistory } from 'history';

import StripeCheckout from 'react-stripe-checkout';
import { useMutation } from 'react-apollo-hooks';

import { Context } from '../../contexts/index';
import { CREATE_USER } from '../../gql/users.gql';

export const history = createHashHistory();

const ChargeMoney = ({
  classes,
  children,
  email,
  error,
  fullName,
  password,
  setError,
  setOpen,
  successfulPromo
}) => {
  const { setLoggedIn } = useContext(Context);
  const [createUser, { data }] = useMutation(CREATE_USER);

  const onToken = async token => {
    if (token && token.id) {
      try {
        await createUser({
          variables: {
            name: fullName,
            email: email.toLowerCase(),
            password,
            stripeSource: token.id,
            successfulPromo
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
    <StripeCheckout
      amount={successfulPromo ? 0 : 599}
      className={classes.submit}
      currency="USD"
      description={
        successfulPromo ? '1 month free then $5.99 p/m' : '$5.99 p/m'
      }
      email={email}
      locale="auto"
      name="Conjugator"
      panelLabel={successfulPromo ? 'Start free trial' : 'Subscribe'}
      stripeKey={process.env.REACT_APP_STRIPE_API_KEY}
      // stripeKey={process.env.REACT_APP_STRIPE_TEST}
      token={onToken}
    >
      {children}
    </StripeCheckout>
  );
};

export default ChargeMoney;
