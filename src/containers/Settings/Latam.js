import React, { useContext } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { SettingsContext } from '../../contexts/index';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  section: {
    padding: 0,
    marginTop: 10,
    backgroundColor: '#fafafa'
  }
};

function Latam({ classes }) {
  const { latam, toggleLatam } = useContext(SettingsContext);
  return (
    <List className={classes.section}>
      <ListSubheader>Latam Spanish or Spain Spanish</ListSubheader>
      <ListItem style={{ height: '64px' }}>
        <Checkbox onClick={() => toggleLatam(!latam)} />
        <ListItemText>Include "Vosotros"</ListItemText>
      </ListItem>
    </List>
  );
}

export default withStyles(styles)(Latam);
