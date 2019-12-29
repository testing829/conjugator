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
  container: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3)
    }
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
  errorMessage: {
    color: '#d32f2f',
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 1)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  infoSection: {
    marginTop: '10%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '1%'
    }
  },
  navLink: {
    textDecoration: 'none'
  },
  priceContainer: {
    padding: theme.spacing(0, 1)
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
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
  },
  userDetailsSignUp: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(4)
  }
});

export default styles;
