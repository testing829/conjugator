import React, { useContext, useState } from 'react';

import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SvgIcon from '@material-ui/core/SvgIcon';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AcUnitIcon from '@material-ui/icons/AcUnit';

import { Context } from '../../contexts/index';
import LanguagePopover from './LanguagePopver';
import Sidebar from './Sidebar';

import { makeStyles } from '@material-ui/core/styles';

import Popover from '@material-ui/core/Popover';
import {
  usePopupState,
  bindTrigger,
  bindPopover
} from 'material-ui-popup-state/hooks';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  navItemContainer: {
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(1)
    }
  },
  navItem: {
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      margin: 0
    }
  },
  title: {
    flexGrow: 1
  },
  formControl: {
    width: '80px',
    margin: '0 50px'
  }
}));

export default function Nav({ language }) {
  console.log('TCL: Nav -> language', language);
  const classes = useStyles();
  const { loggedIn } = useContext(Context);
  const [open, setOpen] = useState(false);

  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });

  return (
    <AppBar position="static">
      <Toolbar>
        <Box className={classes.title}>
          <Typography variant="h6">
            <NavLink
              exact
              to="/"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Conjugator
            </NavLink>
          </Typography>
        </Box>

        <LanguagePopover language={language} />

        <Box className={classes.navItemContainer}>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Hidden smDown>
            <NavLink
              exact
              to="/"
              activeStyle={{ textDecoration: 'underline' }}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button className={classes.navItem} color="inherit">
                Home
              </Button>
            </NavLink>
            <NavLink
              exact
              activeStyle={{ textDecoration: 'underline' }}
              to="/settings"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button className={classes.navItem} color="inherit">
                Settings
              </Button>
            </NavLink>
            <NavLink
              exact
              activeStyle={{ textDecoration: 'underline' }}
              to="/feedback"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button className={classes.navItem} color="inherit">
                Feedback
              </Button>
            </NavLink>
            {loggedIn ? (
              <NavLink
                exact
                activeStyle={{ textDecoration: 'underline' }}
                to="/account"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Button className={classes.navItem} color="inherit">
                  Account
                </Button>
              </NavLink>
            ) : (
              <NavLink
                exact
                activeStyle={{ textDecoration: 'underline' }}
                to="/sign-up"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Button className={classes.navItem} color="inherit">
                  Sign Up
                </Button>
              </NavLink>
            )}
          </Hidden>
        </Box>
      </Toolbar>
      <Sidebar open={open} loggedIn={loggedIn} setOpen={setOpen} />
    </AppBar>
  );
}
