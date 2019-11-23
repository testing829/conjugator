import React, { useContext, useEffect, useState } from 'react';

import { useMutation, useQuery } from 'react-apollo-hooks';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { Context } from '../../contexts/index';
import { CREATE_SETTING, MY_SETTING } from '../../gql/settings.gql';
import Difficulty from './Difficulty';
import Latam from './Latam';
import Tenses from './Tenses';
import Snackbar from '../../components/Snackbar/index';

import styles from './SettingsStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Settings = ({ classes }) => {
  const [open, setOpen] = useState(false);

  const {
    changeSubj,
    difficulty,
    latam,
    loggedIn,
    setDifficulty,
    subjArr,
    tenseArr,
    setLatam,
    updateTense
  } = useContext(Context);

  const [createSetting] = useMutation(CREATE_SETTING);
  const { data } = useQuery(MY_SETTING);
  console.log('TCL: Settings -> data', data);

  const handleUpdate = async () => {
    if (loggedIn) {
      try {
        await createSetting({
          variables: {
            difficulty,
            latam,
            present: tenseArr.includes('Present'),
            preterite: tenseArr.includes('Preterite'),
            imperfect: tenseArr.includes('Imperfect'),
            future: tenseArr.includes('Future'),
            conditional: tenseArr.includes('Conditional'),
            presentPerfect: tenseArr.includes('Present Perfect'),
            futurePerfect: tenseArr.includes('Future Perfect'),
            pastPerfect: tenseArr.includes('Past Perfect'),
            conditionalPerfect: tenseArr.includes('Conditional Perfect'),
            subjPresent: subjArr.includes('Present'),
            subjImperfect: subjArr.includes('Imperfect'),
            subjPresentPerfect: subjArr.includes('Present Perfect')
          }
        });
      } catch (err) {
        console.log('Error creating setting:', err);
      }
    }
    setOpen(true);
  };

  // useEffect(() => {
  //   if (data && data.me) {
  //     // setLatam(me.setting.latam);
  //   }
  // }, [data, setLatam]);

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
