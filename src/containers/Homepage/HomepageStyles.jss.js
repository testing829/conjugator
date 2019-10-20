const styles = theme => ({
  card: {
    backgroundColor: '#fafafa',
    display: 'flex',
    // height: theme.spacing(75),
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: theme.spacing(8),
    paddingBottom: theme.spacing(2)
    // [theme.breakpoints.down('sm')]: {
    //   height: theme.spacing(45)
    // }
  },
  form: {
    width: '100%'
  },
  input: {
    width: '50%'
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
  verbContent: {
    display: 'flex',
    alignContent: 'center'
  },
  verbGrid: {
    // height: theme.spacing(25),
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
  },
  verbText: {
    color: theme.palette.primary.dark,
    padding: theme.spacing(2),
    width: '100%'
  },
  wrongAnswer: {
    color: '#f44336',
    marginBottom: theme.spacing(1)
  }
});

export default styles;
