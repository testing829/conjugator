import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import StarBorder from '@material-ui/icons/StarBorder';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import { Context } from '../../contexts/index';

import styles from './SettingsStyles.jss';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

function Tenses({ classes }) {
  const { changeSubj, subjArr, tenseArr, updateTense } = useContext(Context);

  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <List>
            <ListSubheader>Tenses</ListSubheader>
            <ListItem>
              <Checkbox />
              <ListItemText primary="Present" secondary={'Hablo'} />
            </ListItem>
            <ListItem>
              <Checkbox disabled />
              <ListItemText primary="Present" secondary={'Hablo'} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  {/* <DeleteIcon /> */}
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Checkbox disabled />
              <ListItemText primary="Present" secondary={'Hablo'} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  {/* <DeleteIcon /> */}
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List>
            <ListSubheader>Tenses</ListSubheader>
            <ListItem>
              <Checkbox />
              <ListItemText primary="Present" secondary={'Hablo'} />
            </ListItem>
            <ListItem>
              <Checkbox disabled />
              <ListItemText primary="Present" secondary={'Hablo'} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Checkbox disabled />
              <ListItemText primary="Present" secondary={'Hablo'} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  {/* <DeleteIcon /> */}
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List>
            <ListSubheader>Tenses</ListSubheader>
            <ListItem>
              <Checkbox disabled />
              <ListItemText primary="Present" secondary={'Hablo'} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  {/* <DeleteIcon /> */}
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Checkbox disabled />
              <ListItemText primary="Present" secondary={'Hablo'} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  {/* <DeleteIcon /> */}
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Checkbox disabled />
              <ListItemText primary="Present" secondary={'Hablo'} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  {/* <DeleteIcon /> */}
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List>
            <ListSubheader>Tenses</ListSubheader>
            <ListItem>
              <Checkbox disabled />
              <ListItemText primary="Present" secondary={'Hablo'} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  {/* <DeleteIcon /> */}
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Checkbox disabled />
              <ListItemText primary="Present" secondary={'Hablo'} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  {/* <DeleteIcon /> */}
                  <StarBorder />
                  <Typography>Pro</Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Checkbox disabled />
              <ListItemText primary="Present" secondary={'Hablo'} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
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

// <List>
// <ListSubheader>Tenses</ListSubheader>
// <ListItem>
//   <ListItemIcon>
//     <DraftsIcon />
//   </ListItemIcon>
//   <Checkbox
//     checked={tenseArr.includes('Present')}
//     onClick={() => {
//       updateTense('Present');
//     }}
//   />
//   <ListItemText className={classes.tensesItem}>Present</ListItemText>
//   <Checkbox
//     checked={tenseArr.includes('Preterite')}
//     onClick={() => {
//       updateTense('Preterite');
//     }}
//   />
//   <ListItemText className={classes.tensesItem}>Preterite</ListItemText>

//   <Button style={{ marginRight: '15px' }}>
//     <ListItemIcon>
//       <StarBorder />
//       <Checkbox />
//       Pro
//     </ListItemIcon>
//   </Button>
//   <Checkbox
//     disabled
//     checked={tenseArr.includes('Imperfect')}
//     onClick={() => updateTense('Imperfect')}
//   />
//   <ListItemText className={classes.tensesItem}>Imperfect</ListItemText>

//   <Checkbox
//     checked={tenseArr.includes('Future')}
//     onClick={() => updateTense('Future')}
//   />
//   <ListItemText className={classes.tensesItem}>Future</ListItemText>
// </ListItem>

// <ListItem>
//   <Checkbox
//     checked={tenseArr.includes('Conditional')}
//     onClick={() => updateTense('Conditional')}
//   />
//   <ListItemText className={classes.tensesItem}>
//     Conditional
//   </ListItemText>

//   <Checkbox
//     checked={tenseArr.includes('Present Perfect')}
//     onClick={() => updateTense('Present Perfect')}
//   />
//   <ListItemText className={classes.tensesItem}>
//     Present Perfect
//   </ListItemText>

//   <Checkbox
//     checked={tenseArr.includes('Future Perfect')}
//     onClick={() => updateTense('Future Perfect')}
//   />
//   <ListItemText className={classes.tensesItem}>
//     Future Perfect
//   </ListItemText>

//   <Checkbox
//     checked={tenseArr.includes('Past Perfect')}
//     onClick={() => updateTense('Past Perfect')}
//   />
//   <ListItemText className={classes.tensesItem}>
//     Past Perfect
//   </ListItemText>
// </ListItem>

// <ListItem>
//   <Checkbox
//     checked={tenseArr.includes('Conditional Perfect')}
//     onClick={() => updateTense('Conditional Perfect')}
//   />
//   <ListItemText className={classes.tensesItem}>
//     Conditional Perfect
//   </ListItemText>

//   <Checkbox
//     checked={subjArr.includes('Present')}
//     onClick={() => changeSubj('Present')}
//   />
//   <ListItemText className={classes.tensesItem}>
//     Subjunctive Present
//   </ListItemText>

//   <Checkbox
//     checked={subjArr.includes('Imperfect')}
//     onClick={() => changeSubj('Imperfect')}
//   />
//   <ListItemText className={classes.tensesItem}>
//     Subjunctive Imperfect
//   </ListItemText>

//   <Checkbox
//     checked={subjArr.includes('Present Perfect')}
//     onClick={() => changeSubj('Present Perfect')}
//   />
//   <ListItemText className={classes.tensesItem}>
//     Subjunctive Present Perfect
//   </ListItemText>
// </ListItem>
// </List>
