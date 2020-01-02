/*eslint-disable */
import React, { useState } from 'react';

import { Elements, StripeProvider } from 'react-stripe-elements';
import { NavLink } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import ChargeMoney from './ChargeMoney';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import PromoDialog from './PromoDialog';
import Snackbar from '../../components/Snackbar/index';
import StarIcon from '@material-ui/icons/Star';

import styles from './Auth.jss';
import { withStyles } from '@material-ui/core/styles';

const SignUp = ({ classes, location }) => {
  const [activatePromo, setActivatePromo] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [fullName, setFullName] = useState('');
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  // const [shortPassword, setShortPassword] = useState(false);
  const [successfulPromo, setSuccessfulPromo] = useState(false);

  const language = location.pathname.split('/')[1];

  return (
    <>
      <Grid container justify="center" className={classes.container}>
        <Grid item xs={12} md={5} className={classes.infoSection}>
          <List>
            <ListSubheader disableSticky>
              With an account you can:
            </ListSubheader>
            <ListItem>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary={`Access all verb tenses`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary={`Listen to a native pronounce the verb`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary={`Save your settings`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary={`Track your learning progress`} />
            </ListItem>
          </List>
          <List>
            <ListSubheader disableSticky>
              And you'll be rewarded as you learn!
            </ListSubheader>
            <ListItem>
              <ListItemIcon>
                <MoneyIcon />
              </ListItemIcon>
              <ListItemText
                primary={`Get 500 correct conjugations and we'll give you 50% off`}
                secondary="Pay $2.99 this month"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MoneyIcon />
              </ListItemIcon>
              <ListItemText
                primary={`Get 1000 correct conjugations and we'll give you 100% off`}
                secondary="Pay $0 this month"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item className={classes.userDetailsSignUp} xs={9} sm={7} md={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {/* <Typography
            className={classes.subtitle}
            align="center"
            variant="subtitle1"
          >
            Sign up to get access to all verb tenses, save your settings and
            track your learning progress!
          </Typography> */}
          <Typography
            align="center"
            className={classes.subtitle}
            variant="subtitle1"
          >
            $5.99 per month. Cancel anytime.
          </Typography>
          <Grid container spacing={2} className={classes.form}>
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
            {/* {shortPassword ? (
              <Typography className={classes.errorMessage}>
                Password must be at least 8 characters.
              </Typography>
            ) : null} */}
            {error ? (
              <Typography className={classes.errorMessage}>
                Unable to sign-up. Your email address may already be registered.
              </Typography>
            ) : null}

            <Grid
              container
              justify="space-between"
              className={classes.priceContainer}
            >
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
              {successfulPromo && !activatePromo && (
                <>
                  <Grid item xs={6}>
                    <Typography align="left" color="secondary">
                      Promotion
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right" color="secondary">
                      - $5.99
                    </Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={6}>
                <Typography align="left">Total</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  {successfulPromo && !activatePromo ? '$0' : '$5.99'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
              <Typography>
                Have a promo code?{' '}
                <Link
                  onClick={() => {
                    setActivatePromo(!activatePromo);
                    setSuccessfulPromo(false);
                  }}
                >
                  Click here
                </Link>
              </Typography>
            </Grid>

            <PromoDialog
              activatePromo={activatePromo}
              setActivatePromo={setActivatePromo}
              setSuccessfulPromo={setSuccessfulPromo}
              successfulPromo={successfulPromo}
            />

            <Grid item xs={12}>
              <StripeProvider apiKey={process.env.REACT_APP_STRIPE_API_KEY}>
                <Elements>
                  <ChargeMoney
                    classes={classes}
                    email={email}
                    error={error}
                    fullName={fullName}
                    password={password}
                    setError={setError}
                    setOpen={setOpen}
                    successfulPromo={successfulPromo}
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
                  </ChargeMoney>
                </Elements>
              </StripeProvider>
            </Grid>
          </Grid>

          <Grid container justify="flex-end">
            <Grid item className={classes.switch}>
              <NavLink to={`/${language}/login`} className={classes.navLink}>
                <Typography>Already have an account? Login</Typography>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} setOpen={setOpen} text={'Signed Up!'} />
    </>
  );
};

export default withStyles(styles)(SignUp);
