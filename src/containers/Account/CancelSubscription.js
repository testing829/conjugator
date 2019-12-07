import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from './AccountStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const CancelSubscription = ({ classes, history }) => {
  const handleDelete = () => {};

  const backHome = () => {
    history.push('/');
  };

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
