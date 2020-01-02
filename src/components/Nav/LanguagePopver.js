import React from 'react';

import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {
  usePopupState,
  bindTrigger,
  bindMenu
} from 'material-ui-popup-state/hooks';

import FrenchFlag from './france.svg';
import SpanishFlag from './spain.svg';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  navItem: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      margin: 0
    }
  },
  typography: {
    color: theme.palette.primary.main,
    padding: theme.spacing.unit,
    textDecoration: 'none'
  }
});

const MenuPopupState = ({ classes, language, location }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu'
  });

  let flag;
  if (language === 'es') flag = SpanishFlag;
  if (language === 'fr') flag = FrenchFlag;

  return (
    <>
      <Button
        className={classes.navItem}
        color="inherit"
        {...bindTrigger(popupState)}
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
      <Menu
        {...bindMenu(popupState)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        getContentAnchorEl={null}
      >
        <NavLink exact to="/es" style={{ textDecoration: 'none' }}>
          <MenuItem
            className={classes.menuItem}
            onClick={() => {
              popupState.close();
            }}
          >
            <Typography className={classes.typography}>Spanish</Typography>
          </MenuItem>
        </NavLink>
        <NavLink exact to="/fr" style={{ textDecoration: 'none' }}>
          <MenuItem
            onClick={() => {
              popupState.close();
            }}
          >
            <Typography className={classes.typography}>French</Typography>
          </MenuItem>
        </NavLink>
      </Menu>
    </>
  );
};
export default withStyles(styles)(MenuPopupState);
