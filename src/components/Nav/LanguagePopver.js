import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import {
  usePopupState,
  bindToggle,
  bindPopper
} from 'material-ui-popup-state/hooks';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import Icon from '@material-ui/core/Icon';

import FrenchFlag from './france.svg';
import SpanishFlag from './spain.svg';

const styles = theme => ({
  navItem: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      margin: 0
    }
  },
  typography: {
    padding: theme.spacing.unit * 2
  }
});

const PopperPopupState = ({ classes, language }) => {
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'demoPopper'
  });

  let flag;
  if (language === 'spanish') flag = SpanishFlag;
  console.log('TCL: PopperPopupState -> language', language);
  if (language === 'french') flag = FrenchFlag;

  return (
    <div>
      <Button
        className={classes.navItem}
        color="inherit"
        {...bindToggle(popupState)}
      >
        <Icon
          style={{
            height: '20%',
            width: '80%'
          }}
        >
          <img
            alt="spanish-flag"
            src={flag}
            style={{
              display: 'flex'
            }}
          />
        </Icon>
      </Button>
      <Popper {...bindPopper(popupState)} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography className={classes.typography}>Spanish</Typography>
              <Typography className={classes.typography}>French</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

PopperPopupState.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PopperPopupState);
