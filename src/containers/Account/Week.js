/*eslint-disable */
import React, { useState, useEffect } from 'react';

import moment from 'moment';
import { useQuery } from 'react-apollo-hooks';

import { MY_LOGS_BY_DATE } from '../../gql/logs.gql';

import CircularProgress from '@material-ui/core/CircularProgress';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function WeekChart() {
  const [weekCorrect, setWeekCorrect] = useState([]);
  const [weekTotal, setWeekTotal] = useState([]);

  const oneWeekAgo = moment()
    .subtract(7, 'd')
    .format('YYYY-MM-DD');

  const { data, loading, refetch } = useQuery(MY_LOGS_BY_DATE, {
    variables: {
      date: oneWeekAgo
    }
  });

  useEffect(() => {
    refetch();
  }, []);

  // getDay() returns 0-6; Sun-Sat
  // we update the temp arrays based on the count of answers
  // Sun-Sat and then setState with the updated array
  useEffect(() => {
    if (data && data.myLogs) {
      let tempWeekTotal = [0, 0, 0, 0, 0, 0, 0];
      let tempWeekCor = [0, 0, 0, 0, 0, 0, 0];

      data.myLogs.map(val => {
        const aDate = new Date(val.createdAt);
        const theDay = aDate.getDay();
        tempWeekTotal[theDay] += 1;
        if (val.correct === true) {
          tempWeekCor[theDay] += 1;
        }
        setWeekCorrect(tempWeekCor);
        setWeekTotal(tempWeekTotal);
      });
    }
  }, [data]);

  const weekData = [
    { name: 'Mon', correct: weekCorrect[1], answers: weekTotal[1] },
    { name: 'Tue', correct: weekCorrect[2], answers: weekTotal[2] },
    { name: 'Wed', correct: weekCorrect[3], answers: weekTotal[3] },
    { name: 'Thu', correct: weekCorrect[4], answers: weekTotal[4] },
    { name: 'Fri', correct: weekCorrect[5], answers: weekTotal[5] },
    { name: 'Sat', correct: weekCorrect[6], answers: weekTotal[6] },
    { name: 'Sun', correct: weekCorrect[0], answers: weekTotal[0] }
  ];

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const correct = () => {
    const correct = weekData.map(weekData => weekData.correct);
    return correct.reduce(reducer);
  };

  const answers = () => {
    const answers = weekData.map(weekData => weekData.answers);
    return answers.reduce(reducer);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div
      style={{
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {/* <div style={{ width: '100px' }}>
        <div>
          <h2>{`${((correct() / answers()) * 100).toFixed(1)} %`}</h2>
          <p>Percent</p>
        </div>
        <div>
          <h2>{correct()}</h2>
          <p>Correct answers</p>
        </div>
        <div>
          <h2>{answers()}</h2>
          <p>Total answers</p>
        </div>
      </div> */}
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <AreaChart width={600} height={200} data={weekData} syncId="anyId">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 15, right: 15 }} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="answers" />
            <Area type="monotone" dataKey="correct" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeekChart;
