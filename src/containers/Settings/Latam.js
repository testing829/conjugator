import React, { useContext } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { Context } from '../../contexts/index';

import styles from './SettingsStyles.jss';
import { withStyles } from '@material-ui/core/styles';

function Latam({ classes }) {
  const { latam, toggleLatam } = useContext(Context);
  return (
    <List>
      <ListSubheader>Latam Spanish or Spain Spanish</ListSubheader>
      <ListItem>
        <Checkbox checked={latam} onClick={() => toggleLatam(!latam)} />
        <ListItemText>Include "Vosotros"</ListItemText>
      </ListItem>
    </List>
  );
}

export default withStyles(styles)(Latam);
