import React, { useContext, useState } from 'react';

import { useQuery } from 'react-apollo-hooks';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { AM_I_LOGGED_IN } from '../../gql/logs.gql';
import { Context } from '../../contexts/index';
import Difficulty from './Difficulty';
import Latam from './Latam';
import Tenses from './Tenses';
import Snackbar from '../../components/Snackbar/index';

import styles from './SettingsStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Settings = ({ classes }) => {
  const [open, setOpen] = useState(false);

  const { data } = useQuery(AM_I_LOGGED_IN);
  const { difficulty, latam, subjArr, tenseArr } = useContext(Context);

  const handleUpdate = () => {
    console.log('TCL: Settings -> data', data);
    console.log(
      'TCL: Settings -> difficulty, latam, subjArr, tenseArr ',
      difficulty,
      latam,
      subjArr,
      tenseArr
    );
    setOpen(true);
  };

  return (
    <>
      <Paper className={classes.paper} elevation={10}>
        <Latam />
        <Difficulty />
        <Tenses />
        <Grid container justify="flex-end">
          <Grid item>
            <Button color="primary" size="large" onClick={handleUpdate}>
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
