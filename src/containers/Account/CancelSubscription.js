/*eslint-disable */
import React, { useContext, useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useQuery, useMutation } from 'react-apollo-hooks';

import { Context } from '../../contexts/index';
import {
  CANCEL_SUBSCRIPTION,
  GET_MY_INFO,
  UPDATE_USER
} from '../../gql/users.gql';

import styles from './AccountStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const CancelSubscription = ({ classes, history }) => {
  const [cancelled, setCancelled] = useState(false);
  const { setLoggedIn } = useContext(Context);

  const { data } = useQuery(GET_MY_INFO);
  const [cancelSubscription, { data: confirmDel }] = useMutation(
    CANCEL_SUBSCRIPTION
  );
  const [updateUser, { data: updatedUser }] = useMutation(UPDATE_USER);

  const handleDelete = async () => {
    try {
      await cancelSubscription({
        variables: {
          id: data.me.stripeSubId
        }
      });
      setCancelled(true);
    } catch (err) {
      alert(err);
    }
  };

  const backHome = () => {
    history.push('/');
  };

  const handleUpdate = async () => {
    try {
      await updateUser({
        variables: {
          name: data.me.name,
          email: `${data.me.email}-cancelled`,
          password: data.me.password,
          premium: false
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (confirmDel) {
      handleUpdate();
    }
  }, [confirmDel]);

  useEffect(() => {
    if (updatedUser) {
      localStorage.clear();
      setLoggedIn(false);
    }
  }, [updatedUser]);

  if (cancelled) {
    return (
      <Grid container justify="center">
        <Grid item xs={9} md={5} className={classes.cancelContainer}>
          <Typography align="center" variant="h4" className={classes.title}>
            Your account has been deleted
          </Typography>
          <Typography align="center" variant="body1" className={classes.body}>
            We're sorry to see you go!
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container justify="center">
      <Grid item xs={9} md={5} className={classes.cancelContainer}>
        <Typography align="center" variant="h4" className={classes.title}>
          Are you sure you want to cancel your account?
        </Typography>
        <Typography align="center" variant="body1" className={classes.body}>
          If you cancel your subscription you won't have access to all of the
          tenses, be able to save your settings or track your learning progress.
        </Typography>
        <Typography align="center" variant="body1" className={classes.body}>
          Cancelling your account will mean that your account will be deleted
          and you won't be charged again.
        </Typography>
        <Grid
          container
          justify="space-between"
          className={classes.buttonContainer}
        >
          <Grid item>
            <Button
              color="secondary"
              className={classes.button}
              onClick={handleDelete}
              variant="outlined"
            >
              Delete Account
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              className={classes.button}
              onClick={backHome}
              variant="contained"
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(CancelSubscription);
