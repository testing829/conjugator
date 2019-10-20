const styles = theme => ({
  card: {
    backgroundColor: '#fafafa',
    display: 'flex',
    height: theme.spacing(45),
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(2)
  },
  form: {
    width: '100%'
  },
  grid: {
    marginTop: theme.spacing(8)
  },
  input: {
    textAlign: 'center',
    width: '40%'
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  streakText: {
    color: theme.palette.primary.main
  },
  verbGrid: {
    height: '100%',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
  },
  verbText: {
    color: theme.palette.primary.dark,
    width: '100%'
  }
});

export default styles;
