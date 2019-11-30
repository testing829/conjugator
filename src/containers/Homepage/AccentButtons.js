import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import withWidth from '@material-ui/core/withWidth';
import styles from './HomepageStyles.jss';
import { withStyles } from '@material-ui/core/styles';

const AccentButtons = ({ addAccent, classes, width }) => {
  let accents;
  if (width === 'sm' || width === 'xs') {
    accents = ['á', 'é', 'í', 'ñ', 'ú'];
  } else {
    accents = ['á', 'é', 'í', 'ñ', 'ó', 'ú'];
  }

  return (
    <Grid container justify="flex-start">
      <Grid item xs={12}>
        {accents.map((accent, index) => {
          return (
            <Button
              key={`${accent}-${index}`}
              className={classes.accentButton}
              onClick={() => addAccent(accent)}
              size="small"
              style={{ padding: 0 }}
            >
              {accent}
            </Button>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default withWidth()(withStyles(styles)(AccentButtons));
