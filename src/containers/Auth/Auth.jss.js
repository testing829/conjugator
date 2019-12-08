const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },

  errorMessage: {
    color: '#d32f2f',
    marginTop: theme.spacing(2)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  navLink: {
    textDecoration: 'none'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '100%'
  },
  subtitle: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5)
  },
  switch: {
    paddingRight: theme.spacing(1)
  },
  userDetails: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(8)
  }
});

export default styles;
