import React from 'react';

import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
  }
}));

export default function Nav() {
  const classes = useStyles();

  return (
    <AppBar className={classes.nav} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <NavLink
            exact
            to="/"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Conjugator
          </NavLink>
        </Typography>
        <Box className={classes.navItemContainer}>
          <NavLink
            exact
            // activeClassName="active-link"
            // className="inactive"
            to="/settings"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <Button className={classes.navItem} color="inherit">
              Settings
            </Button>
          </NavLink>
          <NavLink
            exact
            // activeClassName="active-link"
            // className="inactive"
            to="/login"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <Button className={classes.navItem} color="inherit">
              Account
            </Button>
          </NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
