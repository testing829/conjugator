import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const PromoAchievedDialog = ({
  monthlyProgress,
  promoAchieved,
  setPromoAchieved
}) => {
  const handleClose = () => {
    setPromoAchieved(false);
  };

  if (monthlyProgress > 500) {
    return (
      <Dialog fullWidth open={promoAchieved} onClose={handleClose}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <Typography>
            Congratulations - you've reached 1000 correct conjugations! This
            means that you get 100% off on this month's subscription.
          </Typography>
          <Typography style={{ marginTop: '10px' }}>
            You'll be charged $0 for this month. Great work!
          </Typography>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    );
  } else {
    return (
      <Dialog fullWidth open={promoAchieved} onClose={handleClose}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <Typography>
            Congratulations - you've reached 500 correct conjugations! This
            means that you get 50% off on this month's subscription.
          </Typography>
          <Typography style={{ marginTop: '10px' }}>
            Instead of $5.99, you'll just be charged $2.99 for this month. If
            you reach 1000 correct conjugations, you won't pay a cent!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default PromoAchievedDialog;
