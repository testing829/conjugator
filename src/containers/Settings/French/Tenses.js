import React, { useContext } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import StarBorder from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';

import { Context } from '../../../contexts/index';
import { createHashHistory } from 'history';

const Tenses = ({ data }) => {
  const history = createHashHistory();
  const me = data ? data.me : null;
  const { changeSubj, subjArr, tenseArr, updateTense } = useContext(Context);

  const language = history.location.pathname.split('/')[1];

  const redirect = () => {
    history.push(`/${language}/sign-up`);
  };

  return (
    <>
      <ListSubheader>Tenses</ListSubheader>
      <Grid container>
        <Grid item xs={12} md={4}>
          <List>
            <ListItem>
              <Checkbox
                checked={tenseArr.includes('Present')}
                onClick={() => {
                  updateTense('Present');
                }}
              />
              <ListItemText primary="Présent" secondary={'Parle'} />
            </ListItem>
            <ListItem>
              <Checkbox
                checked={tenseArr.includes('Future')}
                disabled={!me}
                onClick={() => updateTense('Future')}
              />
              <ListItemText primary="Futur" secondary={'Parlerai'} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={redirect}>
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <Checkbox
                checked={subjArr.includes('Present Perfect')}
                disabled={!me}
                onClick={() => changeSubj('Present Perfect')}
              />
              <ListItemText
                primary="Subjonctif Imparfait"
                secondary={'Parlasse'}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={redirect}>
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} md={4}>
          <List>
            <ListItem>
              <Checkbox
                checked={tenseArr.includes('Preterite')}
                onClick={() => {
                  updateTense('Preterite');
                }}
              />
              <ListItemText primary="Passé Simple" secondary={'Parlai'} />
            </ListItem>
            <ListItem>
              <Checkbox
                checked={tenseArr.includes('Conditional')}
                disabled={!me}
                onClick={() => updateTense('Conditional')}
              />
              <ListItemText
                primary="Conditionnel Présent"
                secondary={'Parlerais'}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={redirect}>
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} md={4}>
          <List>
            <ListItem>
              <Checkbox
                disabled={!me}
                checked={tenseArr.includes('Imperfect')}
                onClick={() => updateTense('Imperfect')}
              />
              <ListItemText primary="Imparfait" secondary={'Parlais'} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={redirect}>
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Checkbox
                checked={tenseArr.includes('Present Perfect')}
                disabled={!me}
                onClick={() => updateTense('Present Perfect')}
              />

              <ListItemText primary="Subjonctif Present" secondary={'Parle'} />

              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={redirect}>
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default Tenses;
