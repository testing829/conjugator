import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import styles from './SnackbarStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const SimpleSnackbar = ({ open, setOpen, text }) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        autoHideDuration={3000}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <SnackbarContent
          message={<span id="client-snackbar">{text}</span>}
          style={{ backgroundColor: '#43A047' }}
        />
      </Snackbar>
    </>
  );
};

export default withStyles(styles)(SimpleSnackbar);
