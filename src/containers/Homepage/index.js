import React, { useContext, useEffect, useState } from 'react';

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
import Snackbar from '../../components/Snackbar/index';

import styles from './HomepageStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Homepage = ({ classes }) => {
  const [bestStreak, setBestStreak] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showNextVerb, setShowNextVerb] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [verb, setVerb] = useState({
    answer: '',
    infinitive: '',
    infinitiveEnglish: '',
    moodEnglish: '',
    person: '',
    tenseEnglish: ''
  });
  const { difficulty, latam, subjArr, tenseArr } = useContext(SettingsContext);
  const personObj = {
    form1s: 'Yo',
    form2s: 'Tú',
    form3s: 'El/Ella',
    form1p: 'Nosotros',
    form2p: 'Vosotros',
    form3p: 'Ellos/Ellas'
  };

  const { data, loading } = useQuery(VERB_QUERY[difficulty], {
    variables: { latam, subjArr, tenseArr }
  });

  const createLog = useMutation(CREATE_LOG);

  const handleSubmit = async event => {
    event.preventDefault();
    if (submitted) {
      setSubmitted(false);
      setCorrect(false);
      setShowNextVerb(true);
      setUserAnswer('');
    } else {
      setSubmitted(true);
      setShowNextVerb(false);
      handleStreak();
    }
  };

  const handleStreak = () => {
    if (verb.answer === userAnswer) {
      setCorrectCount(correctCount + 1);
      setTotalAnswers(totalAnswers + 1);
      setCorrect(true);
      if (correctCount >= bestStreak) {
        setBestStreak(bestStreak + 1);
      }
    } else if (verb.answer !== userAnswer) {
      setCorrectCount(0);
      setTotalAnswers(totalAnswers + 1);
    }
  };

  useEffect(() => {
    const getRandomVerb = () => {
      const verbLength = Object.keys(data.verbs).length;
      const randomNum = Math.floor(Math.random() * verbLength);
      const randomPerson = Math.floor(Math.random() * 5); // this grabs the 6 yo, tu, ellos etc that we want to use
      const randomVerb = data.verbs[randomNum];
      setVerb({
        answer: Object.values(randomVerb)[randomPerson],
        infinitive: randomVerb.infinitive,
        infinitiveEnglish: randomVerb.infinitiveEnglish,
        moodEnglish: randomVerb.moodEnglish,
        person: Object.keys(randomVerb)[randomPerson],
        tenseEnglish: randomVerb.tenseEnglish
      });
    };
    if (!loading && showNextVerb) {
      getRandomVerb();
    }
  }, [data, loading, showNextVerb]);

  if (loading) {
    return null;
  } else {
    return (
      <>
        <Header />
        <Grid container align="center" direction="row" justify="center">
          <Grid item className={classes.grid} sm={6}>
            <Card className={classes.card}>
              <CardContent>
                <CardActions disableSpacing>
                  <Grid container justify="space-between">
                    <Grid item xs={4}>
                      <Typography className={classes.streakText}>
                        Current Streak: {correctCount}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.streakText}>
                        Best Streak: {bestStreak}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.streakText}>
                        {`Percentage: ${
                          correctCount / totalAnswers
                            ? Math.round((correctCount / totalAnswers) * 100)
                            : 0
                        }%`}
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
                      {`${verb.infinitive.charAt(0).toUpperCase() +
                        verb.infinitive.slice(1)} (${verb.infinitiveEnglish})`}
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
                <form className={classes.form} onSubmit={handleSubmit}>
                  <TextField
                    autoFocus
                    className={classes.input}
                    error={submitted && !correct}
                    onChange={
                      submitted
                        ? null
                        : event => setUserAnswer(event.target.value)
                    }
                    placeholder="Enter conjugated verb..."
                    value={userAnswer}
                    variant="outlined"
                  />
                </form>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Snackbar open={correct} setOpen={setCorrect} text="Correct!" />
      </>
    );
  }
};

export default withStyles(styles)(Homepage);
