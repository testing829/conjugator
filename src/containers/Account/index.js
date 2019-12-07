import React, { useContext, useState } from 'react';

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
import WeekChart from './Week';
import MonthChart from './Month';
import YearChart from './Year';

function Account({ history }) {
  const [value, setValue] = useState(0);
  const { setLoggedIn } = useContext(Context);

  const { data, loading } = useQuery(AM_I_LOGGED_IN);

  const cancelAccount = () => {
    history.push('/cancel-account');
  };

  const logOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    history.push('/login');
  };

  if (loading) return <CircularProgress />;
  else if (!data.me) {
    history.push('/sign-up');
  }

  return (
    <>
      <Typography
        align="center"
        color="primary"
        variant="h4"
        style={{ marginTop: '5%' }}
      >
        Learning progress
      </Typography>

      <Box style={{ margin: '3% 10%' }}>
        <Paper style={{ margin: '5% 20%' }}>
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
      <Grid container justify="flex-end">
        <Grid item xs={2}>
          <Button color="primary" variant="outlined" onClick={cancelAccount}>
            Cancel Account
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button color="primary" variant="outlined" onClick={logOut}>
            Log out
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Account;
