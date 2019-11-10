import React, { useContext } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { Context } from '../../contexts/index';

import styles from './SettingsStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Difficulty = ({ classes }) => {
  const { difficulty, setDifficulty } = useContext(Context);

  return (
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
        <ListItemText>Frequently used regular and irregular verbs</ListItemText>
        <Checkbox
          checked={difficulty === 3}
          onClick={() => {
            setDifficulty(3);
          }}
        />
        <ListItemText>All verbs</ListItemText>
      </ListItem>
    </List>
  );
};

export default withStyles(styles)(Difficulty);
