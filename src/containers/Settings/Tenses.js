import React, { useContext } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { Context } from '../../contexts/index';

import styles from './SettingsStyles.jss';
import { withStyles } from '@material-ui/core/styles';

function Tenses({ classes }) {
  const { changeSubj, subjArr, tenseArr, updateTense } = useContext(Context);

  return (
    <List>
      <ListSubheader>Tenses</ListSubheader>
      <ListItem>
        <Checkbox
          checked={tenseArr.includes('Present')}
          onClick={() => {
            updateTense('Present');
          }}
        />
        <ListItemText className={classes.tensesItem}>Present</ListItemText>

        <Checkbox
          checked={tenseArr.includes('Preterite')}
          onClick={() => {
            updateTense('Preterite');
          }}
        />
        <ListItemText className={classes.tensesItem}>Preterite</ListItemText>

        <Checkbox
          checked={tenseArr.includes('Imperfect')}
          onClick={() => updateTense('Imperfect')}
        />
        <ListItemText className={classes.tensesItem}>Imperfect</ListItemText>

        <Checkbox
          checked={tenseArr.includes('Future')}
          onClick={() => updateTense('Future')}
        />
        <ListItemText className={classes.tensesItem}>Future</ListItemText>
      </ListItem>

      <ListItem>
        <Checkbox
          checked={tenseArr.includes('Conditional')}
          onClick={() => updateTense('Conditional')}
        />
        <ListItemText className={classes.tensesItem}>Conditional</ListItemText>

        <Checkbox
          checked={tenseArr.includes('Present Perfect')}
          onClick={() => updateTense('Present Perfect')}
        />
        <ListItemText className={classes.tensesItem}>
          Present Perfect
        </ListItemText>

        <Checkbox
          checked={tenseArr.includes('Future Perfect')}
          onClick={() => updateTense('Future Perfect')}
        />
        <ListItemText className={classes.tensesItem}>
          Future Perfect
        </ListItemText>

        <Checkbox
          checked={tenseArr.includes('Past Perfect')}
          onClick={() => updateTense('Past Perfect')}
        />
        <ListItemText className={classes.tensesItem}>Past Perfect</ListItemText>
      </ListItem>

      <ListItem>
        <Checkbox
          checked={tenseArr.includes('Conditional Perfect')}
          onClick={() => updateTense('Conditional Perfect')}
        />
        <ListItemText className={classes.tensesItem}>
          Conditional Perfect
        </ListItemText>

        <Checkbox
          checked={subjArr.includes('Present')}
          onClick={() => changeSubj('Present')}
        />
        <ListItemText className={classes.tensesItem}>
          Subjunctive Present
        </ListItemText>

        <Checkbox
          checked={subjArr.includes('Imperfect')}
          onClick={() => changeSubj('Imperfect')}
        />
        <ListItemText className={classes.tensesItem}>
          Subjunctive Imperfect
        </ListItemText>

        <Checkbox
          checked={subjArr.includes('Present Perfect')}
          onClick={() => changeSubj('Present Perfect')}
        />
        <ListItemText className={classes.tensesItem}>
          Subjunctive Present Perfect
        </ListItemText>
      </ListItem>
    </List>
  );
}

export default withStyles(styles)(Tenses);
