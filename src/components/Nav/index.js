import React from 'react';

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

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <AppBar className={classes.nav} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Conjugator
        </Typography>
        <Box className={classes.navItemContainer}>
          {/* <Link
            activeStyle={{ textDecoration: 'underline' }}
            to={'/'}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
          > */}
          {/* <Button className={classes.navItem} color="inherit">
            Buy / Sell
          </Button> */}
          {/* </Link> */}
          {/* <Link
            activeStyle={{ textDecoration: 'underline' }}
            to={'/learn'}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
          > */}
          <Button className={classes.navItem} color="inherit">
            Settings
          </Button>
          {/* </Link> */}
          {/* <Link
            activeStyle={{ textDecoration: 'underline' }}
            to={'/login'}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
          > */}
          <Button className={classes.navItem} color="inherit">
            Account
          </Button>
          {/* </Link> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
