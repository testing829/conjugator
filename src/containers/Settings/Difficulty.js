import React, { useContext } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import withWidth from '@material-ui/core/withWidth';

import { Context } from '../../contexts/index';

import styles from './SettingsStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Difficulty = ({ classes, width }) => {
  const { difficulty, setDifficulty } = useContext(Context);

  const handleClick = (event) => {
    setDifficulty(event.target.value);
  };

  if (width === 'xs') {
    return (
      <Grid container>
        <Grid item xs={12}>
          <List className={classes.list}>
            <ListSubheader>Difficulty</ListSubheader>
            <ListItem>
              <Checkbox
                // checked={difficulty === 0}
                // onClick={() => {
                //   setDifficulty(0);
                // }}
                onClick={handleClick}
                value={0}
              />
              <ListItemText>Frequently used regular verbs</ListItemText>
            </ListItem>
            <ListItem>
              <Checkbox
                // checked={difficulty === 1}
                // onClick={() => {
                //   setDifficulty(1);
                // }}
                onClick={handleClick}
                value={1}
              />
              <ListItemText>Frequently used irregular verbs</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12}>
          <List>
            <ListItem>
              <Checkbox
                checked={difficulty === 2}
                onClick={() => {
                  setDifficulty(2);
                }}
              />
              <ListItemText>
                Frequently used regular and irregular verbs
              </ListItemText>
            </ListItem>
            <ListItem>
              <Checkbox
                checked={difficulty === 3}
                onClick={() => {
                  setDifficulty(3);
                }}
              />
              <ListItemText>All verbs</ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <List className={classes.list}>
            <ListSubheader>Difficulty</ListSubheader>
            <ListItem>
              <Checkbox
                checked={difficulty === 0}
                onClick={() => {
                  setDifficulty(0);
                }}
              />
              <ListItemText>Frequently used regular verbs</ListItemText>
              <Checkbox
                checked={difficulty === 1}
                onClick={() => {
                  setDifficulty(1);
                }}
              />
              <ListItemText>Frequently used irregular verbs</ListItemText>
              <Checkbox
                checked={difficulty === 2}
                onClick={() => {
                  setDifficulty(2);
                }}
              />
              <ListItemText>
                Frequently used regular and irregular verbs
              </ListItemText>
              <Checkbox
                checked={difficulty === 3}
                onClick={() => {
                  setDifficulty(3);
                }}
              />
              <ListItemText>All verbs</ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    );
  }
};

export default withWidth()(withStyles(styles)(Difficulty));
