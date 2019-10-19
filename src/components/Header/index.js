import React from 'react';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import styles from './HeaderStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const Header = ({ classes }) => {
  return (
    <>
      <Divider className={classes.divider} />
      <Typography
        align="center"
        className={classes.colour}
        color="primary"
        variant="h4"
      >
        Conjugator
      </Typography>
      <Divider className={classes.divider} />
    </>
  );
};

export default withStyles(styles)(Header);
