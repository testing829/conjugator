import React, { useContext } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { Context } from '../../contexts/index';
import { useQuery } from 'react-apollo-hooks';
import { MY_SETTING } from '../../gql/settings.gql';

import styles from './SettingsStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Latam = ({ handleUpdate }) => {
  const { latam, setLatam } = useContext(Context);
  const { data } = useQuery(MY_SETTING);
  console.log('TCL: Latam -> data', data);

  // if (data && data.me) setLatam(data.me.setting.latam);

  return (
    <List>
      <ListSubheader>Latam Spanish or Spain Spanish</ListSubheader>
      <ListItem>
        <Checkbox checked={!latam} onClick={() => setLatam(!latam)} />
        <ListItemText>Include "Vosotros"</ListItemText>
      </ListItem>
    </List>
  );
};

export default withStyles(styles)(Latam);
