/*eslint-disable */
import React, { useContext, useEffect, useState } from 'react';

import moment from 'moment';
import { useMutation, useQuery } from 'react-apollo-hooks';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
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

import { Context } from '../../contexts/index';
import { CREATE_LOG, MY_LOGS, MY_LOGS_BY_DATE } from '../../gql/logs.gql';
import { FIFTY_PERCENT_OFF, MONTH_FREE } from '../../gql/coupons.gql';
import { GET_MY_INFO } from '../../gql/users.gql';
import { VERB_QUERY } from '../../gql/verbs.gql';

import AccentButtons from './AccentButtons';
import PromoAchievedDialog from './PromoAchievedDialog';
import TransformVerbEng from './TransformVerbEng';
import Snackbar from '../../components/Snackbar/index';

import styles from './HomepageStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Homepage = ({ classes }) => {
  const [bestStreak, setBestStreak] = useState(0);
  const [billingDate, setBillingDate] = useState();
  const [correct, setCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [monthlyProgress, setMonthlyProgress] = useState(0);
  const [promoAchieved, setPromoAchieved] = useState(false);
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
    pronoun: '',
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

  const { data, loading } = useQuery(VERB_QUERY[difficulty], {
    variables: { latam, tenseArr, subjArr }
  });
  const {
    data: myLogs,
    refetch: refetchMyLogs,
    loading: loadingMyLogs
  } = useQuery(MY_LOGS);
  const {
    data: myLogsSinceBill,
    refetch: refetchMyLogsByDate,
    loading: loadingMyLogsByDate
  } = useQuery(MY_LOGS_BY_DATE, {
    skip: !billingDate,
    variables: {
      date: billingDate
    }
  });
  const { data: myInfo } = useQuery(GET_MY_INFO);
  const [createLog, { data: logData }] = useMutation(CREATE_LOG);
  const [fiftyOff] = useMutation(FIFTY_PERCENT_OFF);
  const [monthFree] = useMutation(MONTH_FREE);

  const handleSubmit = async event => {
    event.preventDefault();
    if (submitted) {
      setSubmitted(false);
      setCorrect(false);
      setShowNextVerb(true);
      setUserAnswer('');
      if (myInfo.me && monthlyProgress === 500) {
        fiftyOff({
          variables: {
            id: myInfo.me.stripeSubId
          }
        });
        setPromoAchieved(true);
      }
      if (myInfo.me && monthlyProgress === 1000) {
        monthFree({
          variables: {
            id: myInfo.me.stripeSubId
          }
        });
        setPromoAchieved(true);
      }
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
      setMonthlyProgress(monthlyProgress + 1);
      setTotalCorrect(totalCorrect + 1);
      if (correctCount >= bestStreak) {
        setBestStreak(bestStreak + 1);
      }
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
          verbPerson: verb.pronoun
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
      setVerb({
        answer: Object.values(randomVerb)[randomPerson],
        englishAnswer: randomVerb.verbEnglish,
        infinitive: randomVerb.infinitive,
        moodEnglish: randomVerb.moodEnglish,
        pronoun: Object.keys(randomVerb)[randomPerson],
        tenseEnglish: randomVerb.tenseEnglish
      });
    };
    if (!loading && showNextVerb) {
      getRandomVerb();
    }
  }, [data, loading, showNextVerb]);

  const getBillingDate = () => {
    if (myLogs && myLogs.myLogs) {
      if (myLogs.myLogs[0]) {
        const accountCreatedDay = moment(
          myLogs.myLogs[0].user.createdAt
        ).date();
        const todaysDay = moment(new Date()).date();
        const difference = todaysDay - accountCreatedDay;
        if (difference > 0) {
          const billingDateTemp = moment()
            .subtract(difference, 'day')
            .format('YYYY-MM-DD');
          setBillingDate(billingDateTemp);
        } else {
          const billingDateTemp = moment()
            .subtract(1, 'month')
            .subtract(difference, 'day')
            .format('YYYY-MM-DD');
          setBillingDate(billingDateTemp);
        }
      }
    }
  };

  const getMonthlyProgress = () => {
    if (myLogsSinceBill) {
      let correctCountSinceBill = 0;
      for (let i = 0; i < myLogsSinceBill.myLogs.length; i++) {
        if (myLogsSinceBill.myLogs[i].correct === true) {
          correctCountSinceBill += 1;
        }
      }
      setMonthlyProgress(correctCountSinceBill);
    }
  };

  useEffect(() => {
    getBillingDate();
    refetchMyLogsByDate();
  }, [myLogs]);

  useEffect(() => {
    getMonthlyProgress();
  }, [myLogsSinceBill]);

  useEffect(() => {
    refetchMyLogs();
  }, []);

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
          align="center"
          className={classes.container}
          container
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
                  {correctCount} / 35
                </Typography>
              </Grid>
            </Grid>

            <LinearProgress
              className={correctCount < 35 ? null : classes.progressBar}
              value={correctCount < 35 ? correctCount * 2.86 : 0}
              variant="determinate"
            />
            <Card className={classes.card}>
              <CardContent>
                <CardActions disableSpacing>
                  <Grid container justify="space-between">
                    {/* <Grid item xs={4}>
                      <Typography className={classes.streakText}>
                        Best Streak: {bestStreak}
                      </Typography>
                    </Grid> */}
                    <Grid item xs={4}>
                      <Typography className={classes.streakText}>
                        Monthly Progress:{' '}
                        {loadingMyLogs || loadingMyLogsByDate ? (
                          <CircularProgress size={15} />
                        ) : (
                          monthlyProgress
                        )}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.streakText}>
                        {`Session score: ${
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
                  <Grid item>
                    <Typography className={classes.verbText}>
                      {`${verb.infinitive.charAt(0).toUpperCase() +
                        verb.infinitive.slice(1)}`}{' '}
                      (
                      <TransformVerbEng verb={verb} />)
                    </Typography>
                  </Grid>
                  <Grid item>
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
                      <Collapse
                        in={submitted && !correct}
                        style={{ width: '100px' }}
                      >
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
                                    {personObj[verb.pronoun]}
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
                          {submitted ? (
                            <ArrowForwardIcon style={{ paddingLeft: '5px' }} />
                          ) : null}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <PromoAchievedDialog
          monthlyProgress={monthlyProgress}
          promoAchieved={promoAchieved}
          setPromoAchieved={setPromoAchieved}
        />
        <Snackbar
          duration={10000000}
          open={correct}
          setOpen={setCorrect}
          text="Correct!"
        />
      </>
    );
  }
};

export default withStyles(styles)(Homepage);
