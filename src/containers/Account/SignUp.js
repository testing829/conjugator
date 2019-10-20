import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { CREATE_USER } from '../../gql/users.gql';
import Snackbar from '../../components/Snackbar/index';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  errorMessage: {
    color: '#d32f2f',
    marginTop: theme.spacing(2)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [fullName, setFullName] = useState('');
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [shortPassword, setShortPassword] = useState(false);

  const [createUser, { data }] = useMutation(CREATE_USER);

  const delay = 1000;
  const classes = useStyles();

  const handleSubmit = async event => {
    event.preventDefault();
    if (password.length < 8) {
      setShortPassword(true);
    }
    try {
      createUser({
        variables: {
          name: fullName,
          email,
          password
        }
      });
    } catch (err) {
      // onError(({ graphQLErrors, networkError }) => {
      //   if (graphQLErrors)
      //     graphQLErrors.map(({ message, locations, path }) =>
      //       console.log(
      //         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      //       )
      //     );

      //   if (networkError) console.log(`[Network error]: ${networkError}`);
      // });
      setError(true);
    }
  };

  useEffect(() => {
    const redirect = () => {
      localStorage.setItem('jwt', data.createUser.token);
      setOpen(true);
      setTimeout(() => {
        history.push('/');
      }, delay);
    };

    if (!error && data) {
      redirect();
    }
  }, [data, error, history]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
                  variant="outlined"
                />
              </Grid>
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
            <Button
              className={classes.submit}
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <NavLink to={'/login'}>Already have an account? Login</NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Snackbar open={open} setOpen={setOpen} text={'Signed Up!'} />
      </Container>
    </>
  );
};

export default SignUp;