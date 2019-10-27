import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from './FeedbackStyles.jss';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const Feedback = ({ classes }) => {
  return (
    <Grid
      container
      align="center"
      className={classes.gridContainer}
      justify="center"
    >
      <Grid item className={classes.gridContainer}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.header}
            title={<Typography variant="h4">Send us your feedback!</Typography>}
            subheader={
              <Typography className={classes.subtitle} variant="subtitle1">
                Do you have any suggestions or have found a bug? Let us know if
                the field below.
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
              placeholder="Your email address"
              required
              variant="outlined"
            />
            <TextField
              className={classes.input}
              multiline
              placeholder="Describe your experience here.."
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
                  size="medium"
                  variant="contained"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Feedback);
