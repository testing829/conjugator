import React, { useState } from 'react';

import WeekChart from './Week';
import MonthChart from './Month';
import YearChart from './Year';

import Typography from '@material-ui/core/Typography';

function Charts() {
  const [value, setValue] = useState('0');

  const handleDropdown = e => {
    setValue(e.target.value);
  };

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
      <div
        style={{
          margin: '7% 10%'
        }}
      >
        <select value={value} onChange={handleDropdown}>
          <option value="0">Week</option>
          <option value="1">Month</option>
          <option value="2">Year</option>
        </select>
        <div
          style={{
            padding: '0 15px',
            marginTop: '15px',
            borderRadius: '4px',
            backgroundColor: '#fff'
          }}
        >
          {value === '0' && <WeekChart />}
          {value === '1' && <MonthChart />}
          {value === '2' && <YearChart />}{' '}
        </div>
      </div>
    </>
  );
}

export default Charts;
