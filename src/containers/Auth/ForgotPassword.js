import React, { useState } from 'react';

import { useMutation } from 'react-apollo-hooks';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { UPDATE_USER } from '../../gql/users.gql';

import styles from './Auth.jss';
import { withStyles } from '@material-ui/core/styles';

const ForgotPassword = ({ classes, history, location }) => {
  const [confirmPassword, setConfirmPassword] = useState();
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [newPassword, setNewPassword] = useState();

  const idIndex = location.pathname.lastIndexOf('/');
  const id = location.pathname.substring(idIndex + 1);
  const language = location.pathname.split('/')[1];

  const [updateUser, { data, error }] = useMutation(UPDATE_USER);

  const handleSubmit = async () => {
    if (newPassword === confirmPassword) {
      setPasswordMismatch(false);

      await updateUser({
        variables: {
          id,
          password: newPassword
        }
      });
    } else {
      setPasswordMismatch(true);
    }
  };

  const goToLogin = () => {
    history.push(`/${language}/login`);
  };

  if (data) {
    return (
      <Grid container>
        <Grid item className={classes.userDetails} xs={12}>
          <Typography className={classes.passwordResetText} variant="h5">
            Password updated
          </Typography>
          <Typography className={classes.passwordResetText} variant="subtitle1">
            Your password has been successfully updated.
          </Typography>
          <Button color="primary" onClick={goToLogin} variant="contained">
            Login
          </Button>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container justify="center">
        <Grid item className={classes.userDetails} xs={9} sm={7} md={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Please create your new password
          </Typography>
          <Grid container className={classes.form} spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="password"
                autoFocus
                fullWidth
                id="newPassword"
                label="New password"
                name="password"
                onChange={event => setNewPassword(event.target.value)}
                required
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="password"
                fullWidth
                id="confirmPassword"
                label="Confirm new password"
                name="password"
                onChange={event => setConfirmPassword(event.target.value)}
                required
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              {passwordMismatch && (
                <Typography className={classes.errorMessage}>
                  Are you sure your password and confirmed password are
                  identical? If the error persists, please send a message on the
                  Feedback page and we'll get back to you right away.
                </Typography>
              )}
              {error && (
                <Typography className={classes.errorMessage}>
                  Unable to update password. Please try again. If the error
                  persists, please send a message on the Feedback page and we'll
                  get back to you right away.
                </Typography>
              )}
              <Button
                className={classes.submit}
                color="primary"
                disabled={!newPassword || !confirmPassword}
                fullWidth
                onClick={handleSubmit}
                type="submit"
                variant="contained"
              >
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

export default withStyles(styles)(ForgotPassword);
