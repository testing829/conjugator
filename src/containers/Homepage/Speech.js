/*eslint-disable */
import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeOnIcon from '@material-ui/icons/VolumeUp';

import { createHashHistory } from 'history';

const Speech = ({ proAccount, verb }) => {
  const history = createHashHistory();
  const [speak, setSpeak] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleActivate = () => {
    if (proAccount) {
      setSpeak(true);
    } else {
      setOpenDialog(true);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const goToSignUp = () => {
    history.push('/sign-up');
  };

  useEffect(() => {
    if ('speechSynthesis' in window && speak) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(verb);
      utterance.lang = 'es-MX';
      utterance.pitch = 1.5;
      utterance.rate = 1.25;
      utterance.volume = 0.8;
      synthesis.speak(utterance);
    }
  }, [verb]);

  if (speak)
    return <VolumeOnIcon color="primary" onClick={() => setSpeak(!speak)} />;
  else {
    return (
      <>
        <VolumeOffIcon color="primary" onClick={handleActivate} />
        <Dialog fullWidth open={openDialog} onClose={handleClose}>
          <DialogTitle>
            <Typography variant="h5">
              Pro feature
              <IconButton style={{ marginBottom: '2px' }}>
                <StarIcon />
              </IconButton>
            </Typography>
          </DialogTitle>

          <DialogContent style={{ marginBottom: '4%' }}>
            <Typography variant="subtitle1">
              To listen to a local pronounce each verb, simply sign-up for an
              account.
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={goToSignUp} variant="contained">
              Sign-up
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
};

export default React.memo(Speech);
