import React, { useContext } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { SettingsContext } from '../../contexts/index';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  section: {
    padding: 0,
    marginTop: 10,
    backgroundColor: '#fafafa'
  },
  listItem: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  listItemText: {
    width: '170px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '180px'
    }
  }
});

function Tenses(props) {
  const { classes } = props;
  const {
    changeSubj,
    present,
    setPresent,
    pret,
    setPret,
    updateTense
  } = useContext(SettingsContext);

  return (
    <List className={classes.section} elevation={1}>
      <ListSubheader>Tenses</ListSubheader>

      <ListItem className={classes.listItem}>
        <div className={classes.listItemText}>
          <Checkbox
            checked={present}
            onClick={() => {
              setPresent(!present);
              updateTense('Present');
            }}
          />
          <ListItemText>
            <span>Present</span>
          </ListItemText>
        </div>
        <div className={classes.listItemText}>
          <Checkbox
            checked={pret}
            onClick={() => {
              setPret(!pret);
              updateTense('Preterite');
            }}
          />
          <ListItemText>
            <span>Preterite</span>
          </ListItemText>
        </div>
        <div className={classes.listItemText}>
          <Checkbox onClick={() => updateTense('Imperfect')} />
          <ListItemText>
            <span>Imperfect</span>
          </ListItemText>
        </div>
        <div className={classes.listItemText}>
          <Checkbox onClick={() => updateTense('Future')} />
          <ListItemText>
            <span>Future</span>
          </ListItemText>
        </div>
        <div className={classes.listItemText}>
          <Checkbox onClick={() => updateTense('Conditional')} />
          <ListItemText>
            <span>Conditional</span>
          </ListItemText>
        </div>
        <div className={classes.listItemText}>
          <Checkbox onClick={() => updateTense('Present Perfect')} />
          <ListItemText>
            <span>Present Perfect</span>
          </ListItemText>
        </div>
        <div className={classes.listItemText}>
          <Checkbox onClick={() => updateTense('Future Perfect')} />
          <ListItemText>
            <span>Future Perfect</span>
          </ListItemText>
        </div>
        <div className={classes.listItemText}>
          <Checkbox onClick={() => updateTense('Past Perfect')} />
          <ListItemText>
            <span>Past Perfect</span>
          </ListItemText>
        </div>
        <div className={classes.listItemText}>
          <Checkbox onClick={() => updateTense('Conditional Perfect')} />
          <ListItemText>
            <span>Conditional Perfect</span>
          </ListItemText>
        </div>
        <div className={classes.listItemText}>
          <Checkbox onClick={() => changeSubj('Present')} />
          <ListItemText>
            <span>Subjunctive Present</span>
          </ListItemText>
        </div>
        <div className={classes.listItemText}>
          <Checkbox onClick={() => changeSubj('Imperfect')} />
          <ListItemText>
            <span>Subjunctive Imperfect</span>
          </ListItemText>
        </div>
        <div className={classes.listItemText}>
          <Checkbox onClick={() => changeSubj('Present Perfect')} />
          <ListItemText>
            <span>Subjunctive Present Perfect</span>
          </ListItemText>
        </div>
      </ListItem>
    </List>
  );
}

export default withStyles(styles)(Tenses);
