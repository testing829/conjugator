import React, { useCallback, useContext, useEffect, useState } from 'react';

import { useMutation, useQuery } from 'react-apollo-hooks';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { CREATE_LOG } from '../../gql/logs.gql';
import { VERB_QUERY } from '../../gql/verbs.gql';
import Header from '../../components/Header/index';
import { SettingsContext } from '../../contexts/index';

import styles from './HomepageStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Homepage = ({ classes }) => {
  const [verb, setVerb] = useState({
    answer: '',
    infinitive: '',
    infinitiveEnglish: '',
    moodEnglish: '',
    person: '',
    tenseEnglish: ''
  });
  console.log('TCL: Homepage -> verb', verb);
  const { difficulty, latam, subjArr, tenseArr } = useContext(SettingsContext);
  const personObj = {
    form1s: 'Yo',
    form2s: 'Tú',
    form3s: 'El/Ella',
    form1p: 'Nosotros',
    form2p: 'Vosotros',
    form3p: 'Ellos/Ellas'
  };

  console.log(
    'TCL: Homepage -> latam, difficulty, tenseArr, subjArr',
    latam,
    difficulty,
    tenseArr,
    subjArr
  );

  const { loading, data } = useQuery(VERB_QUERY[difficulty], {
    variables: { latam, subjArr, tenseArr }
  });

  const createLog = useMutation(CREATE_LOG);

  useEffect(() => {
    if (!loading) {
      const dataLength = Object.keys(data.verbs).length;
      const randomNum = Math.floor(Math.random() * dataLength);
      const randomVerbNum = Math.floor(Math.random() * 5); // this grabs the 6 yo, tu, ellos etc that we want to use
      const randomVerb = data.verbs[randomNum];

      setVerb({
        answer: Object.values(randomVerb)[randomVerbNum],
        infinitive: randomVerb.infinitive,
        infinitiveEnglish: randomVerb.infinitiveEnglish,
        moodEnglish: randomVerb.moodEnglish,
        person: Object.keys(randomVerb)[randomVerbNum],
        tenseEnglish: randomVerb.tenseEnglish
      });
    }
  }, [data, loading]);

  if (loading) {
    return null;
  } else {
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
                      {`${verb.infinitive} (${verb.infinitiveEnglish})`}
                    </Typography>
                  </Grid>
                  <Grid item={12}>
                    <Typography className={classes.verbText} variant="h5">
                      {personObj[verb.person]}
                    </Typography>
                  </Grid>
                  <Grid item={12}>
                    <Typography className={classes.verbText} variant="h5">
                      {verb.tenseEnglish}
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
  }
};

export default withStyles(styles)(Homepage);
