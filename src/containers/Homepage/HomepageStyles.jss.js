const styles = theme => ({
  accentButton: {
    width: theme.spacing(1)
  },
  card: {
    backgroundColor: '#FFFF',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(2)
  },
  container: {
    padding: '2%',
    height: '92vh',
    backgroundColor: '#FAFAFA'
  },
  form: {
    width: '100%'
  },
  input: {
    width: '80%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  loading: {
    marginTop: '22%'
  },
  streakText: {
    color: theme.palette.primary.main
  },
  submitButton: {
    backgroundColor: '#43A047',
    color: '#FFFF',
    marginTop: theme.spacing(1)
  },
  submittedButton: {
    backgroundColor: '#E0E0E0',
    marginTop: theme.spacing(1)
  },
  verbContent: {
    display: 'flex',
    alignContent: 'center'
  },
  verbText: {
    color: theme.palette.primary.dark,
    fontSize: '40px',
    padding: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.down('md')]: {
      fontSize: '32px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px'
    }
  },
  wrongAnswer: {
    color: '#f44336',
    marginBottom: theme.spacing(1)
  }
});

export default styles;
