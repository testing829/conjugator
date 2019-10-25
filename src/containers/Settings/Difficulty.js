import React, { useContext } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { SettingsContext } from '../../contexts/index';

import styles from './SettingsStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Difficulty = ({ classes }) => {
  const {
    beginner,
    setBeginner,
    intermediate,
    setIntermediate,
    advanced,
    setAdvanced,
    setDifficulty
  } = useContext(SettingsContext);

  return (
    <List className={classes.list}>
      <ListSubheader>Difficulty</ListSubheader>
      <ListItem>
        <Checkbox
          checked={beginner}
          onClick={() => {
            setBeginner(true);
            setIntermediate(false);
            setAdvanced(false);
            setDifficulty(0);
          }}
        />
        <ListItemText>Frequently used regular verbs</ListItemText>
        <Checkbox
          checked={intermediate}
          onClick={() => {
            setBeginner(false);
            setIntermediate(true);
            setAdvanced(false);
            setDifficulty(1);
          }}
        />
        <ListItemText>Frequently used regular and irregular verbs</ListItemText>
        <Checkbox
          checked={advanced}
          onClick={() => {
            setBeginner(false);
            setIntermediate(false);
            setAdvanced(true);
            setDifficulty(2);
          }}
        />
        <ListItemText>All verbs</ListItemText>
      </ListItem>
    </List>
  );
};

export default withStyles(styles)(Difficulty);
