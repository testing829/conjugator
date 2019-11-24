import React from 'react';

import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const Sidebar = ({ open, loggedIn, logOut, setOpen }) => {
  return (
    <Drawer anchor="right" onClose={() => setOpen(false)} open={open}>
      <List>
        <ListItem justify="flex-end">
          <ListItemIcon onClick={() => setOpen(false)}>
            <CloseIcon />
          </ListItemIcon>
        </ListItem>
        <Divider />

        <NavLink
          exact
          to="/settings"
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <ListItem>
            <Button color="inherit" onClick={() => setOpen(false)}>
              Settings
            </Button>
          </ListItem>
        </NavLink>
        <NavLink
          exact
          to="/feedback"
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <ListItem>
            <Button color="inherit" onClick={() => setOpen(false)}>
              Feedback
            </Button>
          </ListItem>
        </NavLink>
        {loggedIn ? (
          <NavLink
            exact
            to="/stats"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ListItem>
              <Button color="inherit" onClick={() => setOpen(false)}>
                Stats
              </Button>
            </ListItem>
          </NavLink>
        ) : null}
        {loggedIn ? (
          <NavLink
            exact
            to="/"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ListItem>
              <Button
                color="inherit"
                onClick={() => {
                  logOut();
                  setOpen(false);
                }}
              >
                Log Out
              </Button>
            </ListItem>
          </NavLink>
        ) : (
          <NavLink
            exact
            to="/sign-up"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ListItem>
              <Button color="inherit" onClick={() => setOpen(false)}>
                Sign Up
              </Button>
            </ListItem>
          </NavLink>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
