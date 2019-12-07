import React, { useState } from 'react';

import { AM_I_LOGGED_IN } from '../../gql/logs.gql';
import WeekChart from './Week';
import MonthChart from './Month';
import YearChart from './Year';

import { useQuery } from 'react-apollo-hooks';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

function Charts({ history }) {
  const [value, setValue] = useState(0);

  const { data, loading } = useQuery(AM_I_LOGGED_IN);

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
    </>
  );
}

export default Charts;
