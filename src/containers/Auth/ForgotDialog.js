/*eslint-disable */
import React, { useEffect, useState } from 'react';

import { useMutation } from 'react-apollo-hooks';
import { Tick } from 'react-crude-animated-tick';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { FORGOT_PASSWORD } from '../../gql/users.gql';

const DialogComponent = ({ open, placeholder, setOpen, subtitle, title }) => {
  const [email, setEmail] = useState();
  const [sentEmail, setSentEmail] = useState(false);

  const [sendResetEmail, { data, error }] = useMutation(FORGOT_PASSWORD);

  const handleClose = () => {
    setOpen(false);
    setSentEmail(false);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    sendResetEmail({
      variables: {
        email: email.toLowerCase().trim()
      }
    });
  };

  useEffect(() => {
    if (data && !error) {
      setSentEmail(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  }, [data]);

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography variant="subtitle1">{subtitle}</Typography>
      </DialogContent>

      {error && (
        <DialogContent>
          <Typography>
            Are you sure that email exists? Please send a message on the
            Feedback page if you're unable to reset your password.
          </Typography>
        </DialogContent>
      )}

      <DialogContent>
        <TextField
          autoFocus
          error={error}
          fullWidth
          onChange={event => setEmail(event.target.value)}
          placeholder={placeholder}
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" disabled={!email} onClick={handleSubmit}>
          Submit
        </Button>

        {sentEmail && (
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

export default DialogComponent;
