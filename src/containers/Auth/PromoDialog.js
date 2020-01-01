import React, { useState } from 'react';

import { Tick } from 'react-crude-animated-tick';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

const PromoDialog = ({
  activatePromo,
  setActivatePromo,
  setSuccessfulPromo,
  successfulPromo
}) => {
  const [userCode, setUserCode] = useState('');
  const [error, setError] = useState(false);
  const validCodes = ['oneMonthFree!', 'happy2020'];

  const handleSubmit = () => {
    const foundCode = validCodes.find(code => code === userCode);
    if (foundCode) {
      setSuccessfulPromo(true);
      const delay = 1700;
      setTimeout(() => {
        handleClose();
      }, delay);
    } else setError(true);
  };

  const handleClose = () => {
    setActivatePromo(false);
    setError(false);
  };

  return (
    <Dialog fullWidth open={activatePromo} onClose={handleClose}>
      <DialogTitle>Do you have a promo code?</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          error={error && !successfulPromo}
          label={error && !successfulPromo ? 'Code not found' : 'Promo code'}
          fullWidth
          onChange={event => setUserCode(event.target.value)}
          placeholder="Enter promo code here.."
        />
      </DialogContent>
      <DialogActions>
        {!successfulPromo && (
          <>
            <Button color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}

        {successfulPromo && (
          <Grid container justify="flex-end">
            <Grid item>
              <Tick size={40} />
            </Grid>
          </Grid>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PromoDialog;
