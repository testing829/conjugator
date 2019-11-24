/*eslint-disable */
import React, { useContext, useEffect, useState } from 'react';

import { useMutation, useQuery } from 'react-apollo-hooks';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

import { Context } from '../../contexts/index';
import { MY_SETTING, UPSERT_SETTING } from '../../gql/settings.gql';
import Difficulty from './Difficulty';
import Latam from './Latam';
import Tenses from './Tenses';
import Snackbar from '../../components/Snackbar/index';

import styles from './SettingsStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Settings = ({ classes }) => {
  const [open, setOpen] = useState(false);

  const {
    difficulty,
    gotSettingData,
    latam,
    loggedIn,
    setArr,
    setDifficulty,
    setGotSettingData,
    setSubjArr,
    subjArr,
    tenseArr,
    setLatam
  } = useContext(Context);

  const [upsertSetting] = useMutation(UPSERT_SETTING);
  const { data, loading } = useQuery(MY_SETTING);

  const handleUpdate = async () => {
    if (loggedIn) {
      try {
        await upsertSetting({
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

  useEffect(() => {
    if (data && data.me && !gotSettingData) {
      const mySetting = data.me.setting;
      setLatam(mySetting.latam);
      setDifficulty(mySetting.difficulty);
      const dbTensesArr = [];
      const dbSubjArr = [];
      if (mySetting.present) dbTensesArr.push('Present');
      if (mySetting.preterite) dbTensesArr.push('Preterite');
      if (mySetting.imperfect) dbTensesArr.push('Imperfect');
      if (mySetting.future) dbTensesArr.push('Future');
      if (mySetting.conditional) dbTensesArr.push('Conditional');
      if (mySetting.presentPerfect) dbTensesArr.push('Present Perfect');
      if (mySetting.futurePerfect) dbTensesArr.push('Future Perfect');
      if (mySetting.pastPerfect) dbTensesArr.push('Past Perfect');
      if (mySetting.conditionalPerfect) dbTensesArr.push('Conditional Perfect');
      if (mySetting.subjPresent) dbSubjArr.push('Present');
      if (mySetting.subjImperfect) dbSubjArr.push('Imperfect');
      if (mySetting.subjPresentPerfect) dbSubjArr.push('Present Perfect');
      setArr(dbTensesArr);
      setSubjArr(dbSubjArr);

      setGotSettingData(true);
    }
  }, [loading]);

  if (loading && !gotSettingData) return <CircularProgress />;

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
