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
  buttons: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  button: {
    margin: '0'
  },
  icon: {
    margin: '0',
    padding: '0',
    color: 'red'
  }
}));

/***************************************
 *
 * Javascript
 *
 * *************************************/

//  Concatenation of classes
const clsx = (...classes) => {
  return Array.from(classes).join(' ');
};

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
      <Typography id='text' color='primary'>
        {props.quote.quote}
      </Typography>
      <Typography id='author' color='primary'>
        {props.quote.author}
      </Typography>
    </Box>
  );
};

// Buttons component
const Buttons = props => {
  const classes = useStyles();

  return (
    <Box className='buttons'>
      <Link
        id='tweet-quote'
        color='primary'
        target='_blank'
        href={`https://twitter.com/intent/tweet?text=${props.quoteText}`}
        className={classes.button}
      >
        <Icon className={clsx(classes.icon, 'fab fa-twitter')} />
      </Link>
      <Button
        id='new-quote'
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

  const classes = useStyles();
  const quote = quotes[index];

  return (
    <Container id='quote-box' className={classes.root}>
      {loading && <CircularProgress />}
      {error && <Typography color='error'>{error.message}</Typography>}
      {!loading && !error && <Quote quote={quote} />}
      {!loading && !error && (
        <Buttons
          quoteText={quote.quote}
          handleRandomIndex={handleRandomIndex}
        />
      )}
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
