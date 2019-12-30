/*eslint-disable */
import React, { useEffect, useState } from 'react';

import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeOnIcon from '@material-ui/icons/VolumeUp';

const Speech = ({ proAccount, verb }) => {
  const [speak, setSpeak] = useState(false);
  console.log('TCL: Speech -> speak', speak);
  const [openDialog, setOpenDialog] = useState(false);

  const handleActivate = () => {
    if (proAccount) {
      setSpeak(true);
    } else {
      setOpenDialog(true);
    }
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
    return <VolumeOffIcon color="primary" onClick={handleActivate} />;
  }
};

export default React.memo(Speech);
