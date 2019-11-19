import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { AM_I_LOGGED_IN } from '../../gql/logs.gql';
import { Context } from '../../contexts/index';

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
  const { setLoggedIn } = useContext(Context);

  const { data, loading, refetch } = useQuery(AM_I_LOGGED_IN);

  const logOut = () => {
    localStorage.clear();
    refetch();
    setLoggedIn(false);
  };

  if (loading)
    return (
      <Toolbar position="static">
        <Toolbar> </Toolbar>
      </Toolbar>
    );

  return (
    <AppBar position="static">
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
            to="/settings"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <Button className={classes.navItem} color="inherit">
              Settings
            </Button>
          </NavLink>
          <NavLink
            exact
            to="/feedback"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <Button className={classes.navItem} color="inherit">
              Feedback
            </Button>
          </NavLink>
          {data && Object.values(data).length ? (
            <NavLink
              exact
              to="/account"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button className={classes.navItem} color="inherit">
                Account
              </Button>
            </NavLink>
          ) : null}
          {data && Object.values(data).length ? (
            <NavLink
              exact
              to="/"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button
                className={classes.navItem}
                color="inherit"
                onClick={logOut}
              >
                Log Out
              </Button>
            </NavLink>
          ) : (
            <NavLink
              exact
              to="/sign-up"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button className={classes.navItem} color="inherit">
                Sign Up
              </Button>
            </NavLink>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
