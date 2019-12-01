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

import { Context } from '../../contexts/index';

import styles from './SettingsStyles.jss';
import { withStyles } from '@material-ui/core/styles';

function Tenses({ classes, data }) {
  const me = data ? data.me : null;
  const { changeSubj, subjArr, tenseArr, updateTense } = useContext(Context);

  return (
    <>
      <ListSubheader>Tenses</ListSubheader>
      <Grid container>
        <Grid item xs={4}>
          <List>
            <ListItem>
              <Checkbox
                checked={tenseArr.includes('Present')}
                onClick={() => {
                  updateTense('Present');
                }}
              />
              <ListItemText primary="Present" secondary={'Hablo'} />
            </ListItem>
            <ListItem>
              <Checkbox
                checked={tenseArr.includes('Future')}
                disabled={!me}
                onClick={() => updateTense('Future')}
              />
              <ListItemText primary="Future" secondary={'Hablaré'} />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Checkbox
                checked={tenseArr.includes('Past Perfect')}
                disabled={!me}
                onClick={() => updateTense('Past Perfect')}
              />
              <ListItemText
                primary="Past Perfect"
                secondary={'Había hablado'}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end">
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
              <ListItemText primary="Subjunctive Present" secondary={'Hable'} />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={4}>
          <List>
            <ListItem>
              <Checkbox
                checked={tenseArr.includes('Preterite')}
                onClick={() => {
                  updateTense('Preterite');
                }}
              />
              <ListItemText primary="Preterite" secondary={'Hablé'} />
            </ListItem>
            <ListItem>
              <Checkbox
                checked={tenseArr.includes('Conditional')}
                disabled={!me}
                onClick={() => updateTense('Conditional')}
              />
              <ListItemText primary="Conditional" secondary={'Hablaría'} />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Checkbox
                checked={tenseArr.includes('Conditional Perfect')}
                disabled={!me}
                onClick={() => updateTense('Conditional Perfect')}
              />
              <ListItemText
                primary="Conditional Present"
                secondary={'Habría hablado'}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Checkbox
                checked={subjArr.includes('Imperfect')}
                disabled={!me}
                onClick={() => changeSubj('Imperfect')}
              />
              <ListItemText
                primary="Subjunctive Imperfect"
                secondary={'Hablara'}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          <List>
            <ListItem>
              <Checkbox
                disabled={!me}
                checked={tenseArr.includes('Imperfect')}
                onClick={() => updateTense('Imperfect')}
              />
              <ListItemText primary="Imperfect" secondary={'Hablaba'} />
              <ListItemSecondaryAction>
                <IconButton edge="end">
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
              <ListItemText
                primary="Present Perfect"
                secondary={'He hablado'}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Checkbox
                checked={tenseArr.includes('Future Perfect')}
                disabled={!me}
                onClick={() => updateTense('Future Perfect')}
              />
              <ListItemText
                primary="Future Perfect"
                secondary={'Habré hablado'}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Checkbox
                checked={subjArr.includes('Present')}
                disabled={!me}
                onClick={() => changeSubj('Present')}
              />
              <ListItemText
                primary="Subjunctive Present"
                secondary={'Haya hablado'}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end">
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
}

export default withStyles(styles)(Tenses);
