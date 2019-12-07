import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useQuery, useMutation } from 'react-apollo-hooks';

import { CANCEL_SUBSCRIPTION, GET_MY_INFO } from '../../gql/users.gql';

import styles from './AccountStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const CancelSubscription = ({ classes, history }) => {
  const { data } = useQuery(GET_MY_INFO);
  const [cancelSubscription, { data: confirmDel }] = useMutation(
    CANCEL_SUBSCRIPTION
  );

  const handleDelete = async () => {
    try {
      await cancelSubscription({
        variables: {
          id: data.me.stripeSubId
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  const backHome = () => {
    history.push('/');
  };

  if (confirmDel) {
    return (
      <Grid container justify="center">
        <Grid item xs={5} className={classes.cancelContainer}>
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
      <Grid item xs={5} className={classes.cancelContainer}>
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
