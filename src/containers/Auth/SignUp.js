import React, { useContext, useEffect, useState } from 'react';

import { Elements, StripeProvider } from 'react-stripe-elements';
import { NavLink } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import ChargeMoney from './ChargeMoney';
import { Context } from '../../contexts/index';
import { CREATE_USER } from '../../gql/users.gql';
import Snackbar from '../../components/Snackbar/index';

import styles from './Auth.jss';
import { withStyles } from '@material-ui/core/styles';

const SignUp = ({ classes, history }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [fullName, setFullName] = useState('');
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [shortPassword, setShortPassword] = useState(false);

  const { setLoggedIn } = useContext(Context);
  const [createUser, { data }] = useMutation(CREATE_USER);

  const handleSubmit = async token => {
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
  }, [data, error, history, setLoggedIn]);

  return (
    <>
      <Grid container justify="center">
        <Grid item className={classes.userDetails} xs={9} sm={7} md={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Typography
            className={classes.subtitle}
            align="center"
            variant="subtitle1"
          >
            Sign up get access to all verb tenses, save your settings and track
            your learning progress. 30 days free then $5.99 per month. Cancel
            anytime.
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  autoFocus
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  name="fullname"
                  onChange={event => setFullName(event.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={event => setEmail(event.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="password"
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  onChange={event => setPassword(event.target.value)}
                  required
                  type="password"
                  variant="outlined"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  autoComplete="coupon"
                  fullWidth
                  id="coupon"
                  label="Do you have a promo code?"
                  name="coupon"
                  onChange={event => setcoupon(event.target.value)}
                  type="coupon"
                  variant="outlined"
                />
              </Grid> */}
            </Grid>
            {shortPassword ? (
              <Typography className={classes.errorMessage}>
                Password must be at least 8 characters.
              </Typography>
            ) : null}
            {error ? (
              <Typography className={classes.errorMessage}>
                Unable to sign-up. Your email address may already be registered.
              </Typography>
            ) : null}
            <StripeProvider apiKey={process.env.REACT_APP_STRIPE_API_KEY}>
              <Elements>
                <ChargeMoney
                  classes={classes}
                  email={email}
                  handleSubmit={handleSubmit}
                />
              </Elements>
            </StripeProvider>
            <Grid container justify="flex-end">
              <Grid item>
                <NavLink to={'/login'}>Already have an account? Login</NavLink>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Snackbar open={open} setOpen={setOpen} text={'Signed Up!'} />
    </>
  );
};

export default withStyles(styles)(SignUp);
