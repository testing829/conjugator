/*eslint-disable */
import React, { useContext, useEffect, useState } from 'react';

import moment from 'moment';
import { useQuery } from 'react-apollo-hooks';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import { Context } from '../../contexts/index';
import { AM_I_LOGGED_IN } from '../../gql/logs.gql';
import { MY_LOGS, MY_LOGS_BY_DATE } from '../../gql/logs.gql';
import MonthChart from './Month';
import Points from './Points';
import WeekChart from './Week';
import YearChart from './Year';

function Account({ history }) {
  const [billingDate, setBillingDate] = useState();
  const [nextBillingDate, setNextBillingDate] = useState();
  const [monthlyProgress, setMonthlyProgress] = useState();
  const [chartData, setChartData] = useState([
    { x: 1, y: 1 },
    { x: 2, y: 1 }
  ]);
  const [percent, setPercent] = useState(0);
  const [value, setValue] = useState(0);

  const { setLoggedIn } = useContext(Context);
  const { data: userData, loading } = useQuery(AM_I_LOGGED_IN);

  const cancelAccount = () => {
    history.push('/cancel-account');
  };

  const logOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    history.push('/login');
  };

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

  const getBillingDate = () => {
    if (myLogs && myLogs.myLogs.length) {
      const accountCreatedDay = moment(myLogs.myLogs[0].user.createdAt).date();
      const todaysDay = moment(new Date()).date();
      const difference = todaysDay - accountCreatedDay;
      let billingDateTemp;
      if (difference >= 0) {
        billingDateTemp = moment()
          .subtract(difference, 'day')
          .format('YYYY-MM-DD');
        setBillingDate(billingDateTemp);
      } else {
        billingDateTemp = moment()
          .subtract(1, 'month')
          .subtract(difference, 'day')
          .format('YYYY-MM-DD');
        setBillingDate(billingDateTemp);
      }
      const nextBillDate = moment(billingDateTemp)
        .add(1, 'month')
        .format('MMM Do');
      setNextBillingDate(nextBillDate);
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
      const percentTemp = (correctCountSinceBill / 1000) * 100;
      setPercent(percentTemp);
      setChartData([
        { x: 1, y: correctCountSinceBill },
        { x: 2, y: 1000 - correctCountSinceBill }
      ]);
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

  if (loading | loadingMyLogs | loadingMyLogsByDate | (chartData === 0))
    return <CircularProgress />;
  else if (!userData.me) {
    history.push('/sign-up');
  }

  return (
    <>
      <Typography
        align="center"
        color="primary"
        variant="h4"
        style={{ padding: '5px', marginTop: '5%' }}
      >
        {`${userData.me.name}'s learning progress`}
      </Typography>

      <Points
        billingDate={billingDate}
        data={chartData}
        percent={percent}
        monthlyProgress={monthlyProgress}
        nextBillingDate={nextBillingDate}
      />

      <Box style={{ margin: '3% 10%' }}>
        <Paper>
          <Tabs
            centered
            indicatorColor="primary"
            textColor="primary"
            value={value}
          >
            <Tab label="Week" onClick={() => setValue(0)} />
            <Tab label="Month" onClick={() => setValue(1)} />
            <Tab label="Year" onClick={() => setValue(2)} />
          </Tabs>
        </Paper>
        <div
          style={{
            padding: '0 15px',
            marginTop: '15px',
            borderRadius: '4px',
            backgroundColor: '#fff'
          }}
        >
          {value === 0 && <WeekChart />}
          {value === 1 && <MonthChart />}
          {value === 2 && <YearChart />}
        </div>
      </Box>
      <Grid container justify="flex-end" style={{ marginBottom: '20px' }}>
        <Grid item xs={5} md={2} style={{ marginRight: '5px' }}>
          <Button color="primary" variant="outlined" onClick={cancelAccount}>
            Cancel Account
          </Button>
        </Grid>
        <Grid item xs={5} md={2} style={{ marginLeft: '5px' }}>
          <Button color="primary" variant="outlined" onClick={logOut}>
            Log out
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Account;
