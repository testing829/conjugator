import React, { useContext, useEffect, useState } from 'react';

import { useMutation, useQuery } from 'react-apollo-hooks';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import AccentButtons from './AccentButtons';
import { CREATE_LOG } from '../../gql/logs.gql';
import { VERB_QUERY } from '../../gql/verbs.gql';
import { Context } from '../../contexts/index';
import TransformVerbEng from './TransformVerbEng';
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
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [verb, setVerb] = useState({
    answer: '',
    englishAnswer: '',
    infinitive: '',
    moodEnglish: '',
    person: '',
    tenseEnglish: ''
  });
  const { difficulty, latam, subjArr, tenseArr } = useContext(Context);

  const personObj = {
    form1s: 'Yo',
    form2s: 'Tú',
    form3s: 'El/Ella',
    form1p: 'Nosotros',
    form2p: 'Vosotros',
    form3p: 'Ellos/Ellas'
  };

  const engPersonObj = {
    form1s: 'I',
    form2s: 'You',
    form3s: 'He/she',
    form1p: 'We',
    form2p: 'You all',
    form3p: 'They'
  };

  const { data, loading } = useQuery(VERB_QUERY[difficulty], {
    variables: { latam, tenseArr, subjArr }
  });

  const [createLog, { data: logData }] = useMutation(CREATE_LOG);

  const handleSubmit = async event => {
    event.preventDefault();
    if (submitted) {
      setSubmitted(false);
      setCorrect(false);
      setShowNextVerb(true);
      setUserAnswer('');
    } else {
      setSubmitted(true);
      logAnswer(userAnswer, verb);
      setShowNextVerb(false);
      handleStreak();
    }
  };

  const handleStreak = () => {
    if (verb.answer.trim() === userAnswer.toLowerCase().trim()) {
      setCorrect(true);
      setCorrectCount(correctCount + 1);
      setTotalCorrect(totalCorrect + 1);
      if (correctCount >= bestStreak) {
        setBestStreak(bestStreak + 1);
      }
    } else {
      setCorrectCount(0);
    }
    setTotalAnswers(totalAnswers + 1);
  };

  const logAnswer = async (userAnswer, verb) => {
    const answer = userAnswer.toLowerCase();
    try {
      await createLog({
        variables: {
          correct: answer === verb.answer ? true : false,
          correctAnswer: verb.answer,
          tense: verb.tenseEnglish,
          userAnswer: answer,
          verbInfinitive: verb.infinitive,
          verbPerson: verb.person
        }
      });
    } catch (err) {
      console.log('Error logging:', err, logData);
    }
  };

  const addAccent = accent => {
    setUserAnswer(userAnswer + accent);
  };

  useEffect(() => {
    const getRandomVerb = () => {
      const verbsLength = Object.keys(data.verbs).length;
      const randomNum = Math.floor(Math.random() * verbsLength);
      const randomPerson = Math.floor(Math.random() * 5); // this grabs the 6 yo, tu, ellos etc that we want to use
      const randomVerb = data.verbs[randomNum];

      console.log('randomVerb English', randomVerb.verbEnglish);
      // const verbEnglish = randomVerb.verbEnglish.split(' ');

      const test = TransformVerbEng(
        randomVerb.verbEnglish,
        Object.keys(randomVerb)[randomPerson],
        verb.tenseEnglish
      );
      // console.log('TCL: getRandomVerb -> test', test);

      setVerb({
        answer: Object.values(randomVerb)[randomPerson],
        infinitive: randomVerb.infinitive,
        // englishAnswer: verbEnglish[1].replace(/,/g, ''),
        // infinitiveEnglish: randomVerb.infinitiveEnglish,
        englishAnswer: test,
        moodEnglish: randomVerb.moodEnglish,
        person: Object.keys(randomVerb)[randomPerson],
        tenseEnglish: randomVerb.tenseEnglish
      });
    };
    if (!loading && showNextVerb) {
      getRandomVerb();
    }
  }, [data, loading, showNextVerb, verb.tenseEnglish]);

  if (loading) {
    return (
      <Grid container align="center" direction="row" justify="center">
        <Grid item className={classes.loading} sm={6}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  } else {
    return (
      <>
        <Grid
          className={classes.container}
          container
          align="center"
          direction="row"
          justify="center"
        >
          <Grid item sm={6}>
            <Grid container>
              <Grid item xs={6}>
                <Typography
                  align="left"
                  className={classes.dailyGoal}
                  color="primary"
                >
                  Daily Goal
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  align="right"
                  className={classes.dailyProgress}
                  color="primary"
                >
                  {correctCount} / 10
                </Typography>
              </Grid>
            </Grid>

            <LinearProgress
              className={correctCount < 10 ? null : classes.progressBar}
              value={correctCount < 10 ? correctCount * 10 : 0}
              variant="determinate"
            />
            <Card className={classes.card}>
              <CardContent>
                <CardActions disableSpacing>
                  <Grid container justify="space-between">
                    <Grid item xs={4}>
                      <Typography className={classes.streakText}>
                        Best Streak: {bestStreak}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.streakText}>
                        {`Percentage: ${
                          totalCorrect / totalAnswers
                            ? Math.round((totalCorrect / totalAnswers) * 100)
                            : 0
                        }%`}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardActions>
              </CardContent>
              <CardContent className={classes.verbContent}>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  justify="space-around"
                  wrap="nowrap"
                >
                  <Grid item={6}>
                    <Typography className={classes.verbText}>
                      {/* {`${verb.infinitive.charAt(0).toUpperCase() +
                        verb.infinitive.slice(1)} (${
                        engPersonObj[verb.person]
                      } ${verb.englishAnswer}`}
                      {engPersonObj[verb.person] === 'He/she' &&
                      verb.tenseEnglish === 'Present'
                        ? 's)'
                        : ')'} */}
                      {`${verb.infinitive.charAt(0).toUpperCase() +
                        verb.infinitive.slice(1)} (${verb.englishAnswer})`}
                    </Typography>
                  </Grid>
                  <Grid item={6}>
                    <Typography className={classes.verbText}>
                      {verb.tenseEnglish}{' '}
                      {verb.moodEnglish === 'Subjunctive'
                        ? `(${verb.moodEnglish})`
                        : null}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions className={classes.inputContainer} disableSpacing>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Collapse in={submitted && !correct}>
                        {submitted && !correct ? (
                          <Typography
                            className={classes.wrongAnswer}
                            variant="body1"
                          >
                            {`${verb.answer.charAt(0).toUpperCase() +
                              verb.answer.slice(1)}`}
                          </Typography>
                        ) : null}
                      </Collapse>
                    </Grid>
                    <Grid item xs={12}>
                      <AccentButtons addAccent={addAccent} />
                      <Grid container>
                        <Grid item xs={12}>
                          <TextField
                            autoFocus
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography color="primary" variant="h6">
                                    {personObj[verb.person]}
                                  </Typography>
                                </InputAdornment>
                              )
                            }}
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
                        </Grid>
                      </Grid>

                      <Grid>
                        <Button
                          className={
                            submitted
                              ? classes.submittedButton
                              : classes.submitButton
                          }
                          onClick={handleSubmit}
                          variant="contained"
                        >
                          {submitted ? 'Next' : 'Answer'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
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
