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
  Button,
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
    tertiary: {
      main: 'ff2255'
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
    backgroundColor: 'white',
    width: '500px',
    height: '300px',
    marginTop: '200px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quoteContainer: {
    width: '100%',
    height: '70%',
    display: 'flex',
    flexDirection: 'column'
  },
  quote: {
    justifyContent: 'center',
    alignItem: 'left'
  },
  author: {
    justifyItem: 'center',
    alignItem: 'right'
  },
  button: {
    margin: '20px'
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

// Quote component
const Quote = props => {
  return (
    <Box>
      <Typography color='primary'>{props.quote.quote}</Typography>
      <Typography color='primary'>{props.quote.author}</Typography>
    </Box>
  );
};

// Buttons component
const Buttons = props => {
  const classes = useStyles();
  return (
    <Box>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={props.handleShareFacebook}
      >
        Facebook
      </Button>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={props.handleShareTwitter}
      >
        Twitter
      </Button>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={props.handleRandomIndex}
      >
        New Quote
      </Button>
    </Box>
  );
};

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

  const handleRandomIndex = () => {
    setIndex(getRandomIndex(quotes.length));
  };

  const handleShareFacebook = () => {
    console.log('Will share with facebook');
  };

  const handleShareTwitter = () => {
    console.log('Will share with twitter');
  };

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      {loading && <CircularProgress />}
      {error && <Typography color='error'>{error.message}</Typography>}
      {!loading && !error && <Quote quote={quotes[index]} />}
      <Buttons
        handleRandomIndex={handleRandomIndex}
        handleShareFacebook={handleShareFacebook}
        handleShareTwitter={handleShareTwitter}
      />
    </Container>
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
