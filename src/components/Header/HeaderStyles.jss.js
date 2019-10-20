const styles = theme => ({
  colour: {
    color: theme.palette.primary.dark
  },
  divider: {
    margin: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(3)
    }
  }
});

export default styles;
