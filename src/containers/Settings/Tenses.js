import React, { useContext, useEffect, useState } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import withWidth from '@material-ui/core/withWidth';

import { Context } from '../../contexts/index';

import styles from './SettingsStyles.jss';
import { withStyles } from '@material-ui/core/styles';

function Tenses({ classes, width }) {
  const {
    changeSubj,
    present,
    setPresent,
    pret,
    setPret,
    updateTense
  } = useContext(Context);

  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    if (width === 'sm' || width === 'xs') {
      setSmallScreen(true);
    }
  }, [width]);

  return (
    <List>
      <ListSubheader>Tenses</ListSubheader>
      <ListItem>
        <Checkbox
          checked={present}
          onClick={() => {
            setPresent(!present);
            updateTense('Present');
          }}
        />
        <ListItemText className={classes.tensesItem}>Present</ListItemText>

        <Checkbox
          checked={pret}
          onClick={() => {
            setPret(!pret);
            updateTense('Preterite');
          }}
        />
        <ListItemText className={classes.tensesItem}>Preterite</ListItemText>

        <Checkbox onClick={() => updateTense('Imperfect')} />
        <ListItemText className={classes.tensesItem}>Imperfect</ListItemText>

        <Checkbox onClick={() => updateTense('Future')} />
        <ListItemText className={classes.tensesItem}>Future</ListItemText>
      </ListItem>

      <ListItem>
        <Checkbox onClick={() => updateTense('Conditional')} />
        <ListItemText className={classes.tensesItem}>Conditional</ListItemText>

        <Checkbox onClick={() => updateTense('Present Perfect')} />
        <ListItemText className={classes.tensesItem}>
          Present Perfect
        </ListItemText>

        <Checkbox onClick={() => updateTense('Future Perfect')} />
        <ListItemText className={classes.tensesItem}>
          Future Perfect
        </ListItemText>

        <Checkbox onClick={() => updateTense('Past Perfect')} />
        <ListItemText className={classes.tensesItem}>Past Perfect</ListItemText>
      </ListItem>

      <ListItem>
        <Checkbox onClick={() => updateTense('Conditional Perfect')} />
        <ListItemText className={classes.tensesItem}>
          Conditional Perfect
        </ListItemText>

        <Checkbox onClick={() => changeSubj('Subjunctive Present')} />
        <ListItemText className={classes.tensesItem}>
          Subjunctive Present
        </ListItemText>

        <Checkbox onClick={() => changeSubj('Subjunctive Imperfect')} />
        <ListItemText className={classes.tensesItem}>
          Subjunctive Imperfect
        </ListItemText>

        <Checkbox onClick={() => changeSubj('Subjunctive Present Perfect')} />
        <ListItemText className={classes.tensesItem}>
          Subjunctive Present Perfect
        </ListItemText>
      </ListItem>
    </List>
  );
}

export default withWidth()(withStyles(styles)(Tenses));
