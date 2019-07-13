/***************************************
 *
 * Material-Ui styles
 *
 * *************************************/
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
  Link,
  CircularProgress
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

/***************************************
 *
 * Javascript
 *
 * *************************************/

//  Quotes url pointing to github gist
const QUOTES_URL =
  'https://gist.githubusercontent.com/picklu/43c5637a18321ae0126959257b44df92/raw/666d08e1f585bceb1e8b2712e4bc5e20bd4cb7b6/quotes.json';

const getRandomIndex = limit => {
  return Math.floor(Math.random() * limit);
};

// React hooks
const { useState, useEffect } = React;

// Random quote machine
const RandomQuoteMachine = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [index, setIndex] = useState(0);
  const [quotes, setQuotes] = useState({});

  useEffect(() => {
    axios
      .get(QUOTES_URL)
      .then(response => {
        const quotes = response.data.quotes;
        setQuotes(quotes);
        setIndex(getRandomIndex(quotes.length));
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='h3'>Random Quote</Typography>
      {loading && <CircularProgress />}
      {error && <Typography>{error.message}</Typography>}
      {!loading && !error && <Typography>{quotes[index].quote}</Typography>}
    </div>
  );
};

// Main app
const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <RandomQuoteMachine />
    </MuiThemeProvider>
  );
};

// Mouting app to the DOM
ReactDOM.render(<App />, document.getElementById('app'));
