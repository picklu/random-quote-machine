// Material-Ui styles
const {
  colors,
  CssBaseline,
  MuiThemeProvider,
  Typography,
  Container,
  makeStyles,
  createMuiTheme,
  Box,
  Icon,
  Link
} = MaterialUI;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: colors.red.A400
    },
    background: {
      default: colors.grey[100]
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

// React hoooks
const { useState } = React;

const RandomQuoteMachine = () => {
  const [loading, setLoading] = useState(true);

  const handleClick = e => {
    setLoading(!loading);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Hello, World!</h1>
      {loading ? <p>Loading...</p> : <p>Loaded!!!</p>}
      <button onClick={handleClick}>
        {loading ? 'Click Me!' : 'Clicked!'}
      </button>
    </div>
  );
};

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <RandomQuoteMachine />
  </MuiThemeProvider>
);

const mountingNode = document.getElementById('app');

ReactDOM.render(<App />, mountingNode);
