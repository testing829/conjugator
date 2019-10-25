import React, { useState } from 'react';

import Latam from './Latam';
import Difficulty from './Difficulty';
import Tenses from './Tenses';
import Snackbar from '../../components/Snackbar/index';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import styles from './SettingsStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Settings = ({ classes }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Paper className={classes.paper} elevation={10}>
        <Latam />
        <Difficulty />
        <Tenses />
        <Grid container justify="flex-end">
          <Grid item>
            <Button color="primary" size="large" onClick={() => setOpen(true)}>
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar open={open} setOpen={setOpen} text="Updated" />
    </>
  );
};

export default withStyles(styles)(Settings);
