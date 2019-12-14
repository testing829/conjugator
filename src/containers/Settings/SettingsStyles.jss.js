const styles = theme => ({
  button: {
    marginRight: 100,
    marginTop: 20,
    width: 120,
    height: 40
  },
  buttonUpdated: {
    marginRight: 100,
    marginTop: 20,
    width: 120,
    height: 40,
    backgroundColor: 'green',
    '&:hover': {
      backgroundColor: '#1B5E20'
    }
  },
  paper: {
    backgroundColor: '#FFFF',
    margin: '1.7% auto',
    padding: theme.spacing(2),
    width: '80%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  tensesItem: {
    width: '25%'
  },
  updateButton: {
    margin: theme.spacing(1)
  }
});

export default styles;
