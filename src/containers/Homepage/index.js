import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { GET_USERS } from '../../gql/users.gql';
import Header from '../../components/Header/index';

import { useQuery } from 'react-apollo-hooks';

import styles from './HomepageStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Homepage = ({ classes }) => {
  const { data } = useQuery(GET_USERS);
  console.log('TCL: Homepage -> data', data);
  return (
    <>
      <Header />
      <Grid contanier align="center" direction="row" justify="center">
        <Grid item className={classes.grid} sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <CardActions disableSpacing>
                <Grid container justify="space-between">
                  <Grid item xs={4}>
                    <Typography className={classes.streakText}>
                      Current Streak: 10
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.streakText}>
                      Best Streak: 10
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.streakText}>
                      Percentage: 75%
                    </Typography>
                  </Grid>
                </Grid>
              </CardActions>
              <Grid
                container
                alignItems="center"
                className={classes.verbGrid}
                direction="column"
                justify="space-evenly"
                wrap="nowrap"
              >
                <Grid item={12}>
                  <Typography className={classes.verbText} variant="h5">
                    Hablar (to speak)
                  </Typography>
                </Grid>
                <Grid item={12}>
                  <Typography className={classes.verbText} variant="h5">
                    Present Indicative
                  </Typography>
                </Grid>
                <Grid item={12}>
                  <Typography className={classes.verbText} variant="h5">
                    1st Person
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions className={classes.inputContainer} disableSpacing>
              <TextField
                autoFocus
                className={classes.input}
                placeholder="Enter conjugated verb..."
              />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(Homepage);
