import React from 'react';

import { useMutation } from 'react-apollo-hooks';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import styles from './Auth.jss';
import { withStyles } from '@material-ui/core/styles';

const ForgotPassword = ({ classes, location }) => {
  const idIndex = location.pathname.lastIndexOf('/');
  const id = location.pathname.substring(idIndex + 1);

  //   const [{ data }] = useQuery(GET_MY_INFO);

  return (
    <Grid container justify="center">
      <Grid item className={classes.userDetails} xs={9} sm={7} md={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login {id}
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
              //   onChange={event => setEmail(event.target.value)}
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
              //   onChange={event => setPassword(event.target.value)}
              required
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            {/* {error ? (
              <Typography className={classes.errorMessage}>
                Unable to login
              </Typography>
            ) : null} */}
            <Button
              className={classes.submit}
              color="primary"
              fullWidth
              //   onClick={handleSubmit}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ForgotPassword);
