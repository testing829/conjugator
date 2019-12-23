/*eslint-disable */
import React from 'react';

import moment from 'moment';
import {
  VictoryAnimation,
  VictoryLabel,
  VictoryPie,
  VictoryTheme
} from 'victory';

import Grid from '@material-ui/core/Grid';
import HeartIcon from '@material-ui/icons/Favorite';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import StarIcon from '@material-ui/icons/Star';

const Points = ({
  billingDate,
  data,
  monthlyProgress,
  percent,
  nextBillingDate
}) => {
  return (
    <Grid container justify="center" style={{ paddingTop: '26px' }}>
      <Grid item xs={12} md={6}>
        <List>
          <ListSubheader>Get rewarded for learning</ListSubheader>
          <ListItem>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Get 500 correct conjugations before ${nextBillingDate} and we'll give you 50% off`}
              secondary="Pay $2.99 this month"
              style={
                monthlyProgress >= 500
                  ? { textDecorationLine: 'line-through' }
                  : null
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Get 1000 correct conjugations before ${nextBillingDate} and we'll give you 100% off`}
              secondary="Pay $0 this month"
              style={
                monthlyProgress >= 1000
                  ? { textDecorationLine: 'line-through' }
                  : null
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HeartIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                monthlyProgress >= 1000
                  ? `You've got ${monthlyProgress} correct conjugations since ${moment(
                      billingDate
                    ).format(
                      'MMM Do'
                    )}. Congratulations! You won't pay anything this month!`
                  : `You've got ${monthlyProgress} correct conjugations since ${moment(
                      billingDate
                    ).format('MMM Do')}. Only ${1000 - monthlyProgress} to go!`
              }
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={0} md={2} style={{ paddingTop: '26px' }}>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={400}
            height={400}
            data={data}
            innerRadius={120}
            cornerRadius={5}
            labels={() => null}
            theme={VictoryTheme.material}
            style={{
              data: {
                fill: ({ datum }) => {
                  return datum.x === 1 ? 'green' : 'transparent';
                }
              }
            }}
          />
          <VictoryAnimation duration={1000} data={data}>
            {() => {
              return (
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={200}
                  y={200}
                  text={`${Math.round(percent)}%`}
                  style={{ fontSize: 45 }}
                />
              );
            }}
          </VictoryAnimation>
        </svg>
      </Grid>
    </Grid>
  );
};

export default Points;
