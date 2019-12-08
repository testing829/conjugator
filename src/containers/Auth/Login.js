import React, { useContext, useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { Context } from '../../contexts/index';
import { LOGIN } from '../../gql/users.gql';
import Snackbar from '../../components/Snackbar/index';

import styles from './Auth.jss';
import { withStyles } from '@material-ui/core/styles';

const Login = ({ classes, history }) => {
  const [email, setEmail] = useState('');

  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');

  const { setLoggedIn } = useContext(Context);
  const [login, { data, error }] = useMutation(LOGIN);

  const delay = 500;

  const handleSubmit = async event => {
    event.preventDefault();

    login({
      variables: {
        email: email.toLowerCase(),
        password
      }
    });
  };

  useEffect(() => {
    const redirect = () => {
      localStorage.setItem('jwt', data.login.token);
      setLoggedIn(true);
      setOpen(true);
      setTimeout(() => {
        history.push('/');
      }, delay);
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
            Login
          </Typography>
          <Grid container className={classes.form} spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                autoFocus
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
            <Grid item xs={12}>
              {error ? (
                <Typography className={classes.errorMessage}>
                  Unable to login
                </Typography>
              ) : null}
              <Button
                className={classes.submit}
                color="primary"
                fullWidth
                onClick={handleSubmit}
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </Grid>
          </Grid>

          <Grid container justify="flex-end">
            <Grid item className={classes.switch}>
              <NavLink to={'/sign-up'} className={classes.navLink}>
                <Typography>Don't have an account? Sign-up</Typography>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} setOpen={setOpen} text={'Successful Login'} />
    </>
  );
};

export default withStyles(styles)(Login);
