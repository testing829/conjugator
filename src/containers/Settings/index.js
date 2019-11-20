import React, { useContext, useState } from 'react';

import { useMutation } from 'react-apollo-hooks';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { Context } from '../../contexts/index';
import { CREATE_SETTING } from '../../gql/settings.gql';
import Difficulty from './Difficulty';
import Latam from './Latam';
import Tenses from './Tenses';
import Snackbar from '../../components/Snackbar/index';

import styles from './SettingsStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Settings = ({ classes }) => {
  const [open, setOpen] = useState(false);

  const { difficulty, latam, loggedIn, subjArr, tenseArr } = useContext(
    Context
  );

  const [createSetting, { data }] = useMutation(CREATE_SETTING);

  const handleUpdate = async () => {
    // console.log('TCL: Settings -> loggedIn', loggedIn);
    // console.log(
    //   'TCL: Settings -> difficulty, latam, subjArr, tenseArr ',
    //   difficulty,
    //   latam,
    //   subjArr,
    //   tenseArr,
    //   tenseArr.includes('Present')
    // );
    // if (loggedIn) {
    //   try {
    //     await createSetting({
    //       variables: {
    //         difficulty,
    //         latam,
    //         present:
    //       }
    //     })
    //   } catch (err) {
    //     console.log('Error creating setting:', err);
    //   }
    // }
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
