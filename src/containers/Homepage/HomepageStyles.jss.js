const styles = theme => ({
  accentButton: {
    width: theme.spacing(1)
  },
  card: {
    backgroundColor: '#FFFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      height: '100%'
    }
  },
  container: {
    padding: '2% 0 4% 0',
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
  progressBar: {
    backgroundColor: '#43A047',
    color: '#43A047'
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
    padding: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.down('md')]: {
      fontSize: '32px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
      padding: theme.spacing(2)
    }
  },
  wrongAnswer: {
    color: '#f44336',
    marginBottom: theme.spacing(1)
  }
});

export default styles;
