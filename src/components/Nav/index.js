import React, { useContext, useState } from 'react';

import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Context } from '../../contexts/index';
import LanguagePopover from './LanguagePopver';
import Sidebar from './Sidebar';

import { makeStyles } from '@material-ui/core/styles';

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
  const [open, setOpen] = useState(false);
  const { loggedIn } = useContext(Context);
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box className={classes.title}>
          <Typography variant="h6">
            <NavLink
              exact
              to={`/${language}`}
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
              to={`/${language}`}
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
              to={`/${language}/settings`}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button className={classes.navItem} color="inherit">
                Settings
              </Button>
            </NavLink>
            <NavLink
              exact
              activeStyle={{ textDecoration: 'underline' }}
              to={`/${language}/feedback`}
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
                to={`/${language}/account`}
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
                to={`/${language}/sign-up`}
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
      <Sidebar
        language={language}
        loggedIn={loggedIn}
        open={open}
        setOpen={setOpen}
      />
    </AppBar>
  );
}
