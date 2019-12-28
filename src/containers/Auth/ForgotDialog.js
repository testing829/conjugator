import React, { useState } from 'react';

import { useMutation } from 'react-apollo-hooks';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';

import { FORGOT_PASSWORD, LOGIN } from '../../gql/users.gql';

const DialogComponent = ({ open, placeholder, setOpen, subtitle, title }) => {
  const [email, setEmail] = useState();
  console.log('TCL: DialogComponent -> email', email);

  const [sendResetEmail, { data }] = useMutation(FORGOT_PASSWORD);
  console.log('TCL: DialogComponent -> data', data);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    sendResetEmail({
      variables: {
        email: email.toLowerCase().trim()
      }
    });
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography variant="subtitle1">{subtitle}</Typography>
      </DialogContent>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          onChange={event => setEmail(event.target.value)}
          placeholder={placeholder}
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
