import React, { useState } from 'react';

import { useMutation } from 'react-apollo-hooks';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { CREATE_FEEDBACK } from '../../gql/feedback.gql';
import Snackbar from '../../components/Snackbar/index';

import styles from './FeedbackStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Feedback = ({ classes }) => {
  const [email, setEmail] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [text, setText] = useState();

  const [createFeedback] = useMutation(CREATE_FEEDBACK);

  const sendFeedback = async () => {
    try {
      await createFeedback({
        variables: {
          email,
          text
        }
      });
      setOpenSnackbar(true);
    } catch (err) {
      console.log('Error sending feedback', err);
    }
  };

  return (
    <Grid
      container
      align="center"
      className={classes.gridContainer}
      justify="center"
    >
      <Grid item className={classes.gridContainer}>
        <Card className={classes.card}>
          <form onSubmit={sendFeedback}>
            <CardHeader
              className={classes.header}
              title={
                <Typography variant="h4">Send us your feedback!</Typography>
              }
              subheader={
                <Typography className={classes.subtitle} variant="subtitle1">
                  Do you have any suggestions or have found a bug? Let us know
                  if the field below.
                </Typography>
              }
            />
            <CardContent>
              <TextField
                autoComplete="email"
                autoFocus
                className={classes.emailInput}
                fullWidth
                id="email"
                name="email"
                onChange={event => setEmail(event.target.value)}
                placeholder="Your email address"
                required
                variant="outlined"
              />
              <TextField
                className={classes.input}
                multiline
                placeholder="Describe your experience here.."
                onChange={event => setText(event.target.value)}
                rows="15"
                variant="outlined"
              />
            </CardContent>
            <CardActions>
              <Grid container justify="flex-end">
                <Grid item xs={12}>
                  <Button
                    className={classes.button}
                    color="primary"
                    onClick={sendFeedback}
                    size="medium"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </form>
        </Card>
        <Snackbar
          open={openSnackbar}
          setOpen={setOpenSnackbar}
          text={'Thanks for your feedback!'}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Feedback);
