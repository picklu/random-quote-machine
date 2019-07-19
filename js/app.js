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
      default: '#556cd6'
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'white',
    borderRadius: '5px',
    fontSize: '1.5rem',
    height: '400px',
    marginTop: '100px',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'space-between'
  },
  quoteContainer: {
    fontSize: 'inherit',
    flex: 3,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  quote: {
    fontSize: 'inherit',
    fontStyle: 'italic',
    textAlign: 'Justify'
  },
  author: {
    fontSize: 'inherit',
    textAlign: 'right'
  },
  buttonContainer: {
    marginTop: '2rem',
    flex: '1',
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  button: {
    // marginTop: '1rem'
  },
  buttonBtn: {
    fontSize: 'inherit'
  },
  buttonIcon: {
    fontSize: '2.2rem'
  }
  // footer: {
  //   textAlign: 'center',
  //   color: 'white'
  // }
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
  const classes = useStyles();

  return (
    <Box className={classes.quoteContainer}>
      <Typography id='text' color='primary' className={classes.quote}>
        {props.quote.quote}
      </Typography>
      <Typography id='author' color='primary' className={classes.author}>
        -- {props.quote.author}
      </Typography>
    </Box>
  );
};

// Buttons component
const Buttons = props => {
  const classes = useStyles();

  return (
    <Box
      width='100%'
      display='flex'
      flexDirection='row'
      flexWrap='wrap'
      justifyContent='space-around'
      className={classes.buttonContainer}
    >
      <Box className={classes.button}>
        <Link
          id='tweet-quote'
          color='primary'
          target='_blank'
          href={`https://twitter.com/intent/tweet?text=${props.quoteText}`}
          className={classes.buttonIcon}
        >
          <Icon className={clsx(classes.buttonIcon, 'fab fa-twitter')} />
        </Link>
      </Box>
      <Box className={classes.button}>
        <Button
          id='new-quote'
          variant='contained'
          color='primary'
          className={classes.buttonBtn}
          onClick={props.handleRandomIndex}
        >
          Quote
        </Button>
      </Box>
    </Box>
  );
};

// Footer
const Footer = () => {
  const classes = useStyles();

  return (
    <Box textAlign='center' color='white' margin={2}>
      <Typography>&copy; 2019 picklu</Typography>
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
    <React.Fragment>
      <Container maxWidth='sm' id='quote-box' className={classes.root}>
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
    </React.Fragment>
  );
};

// Main app
const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <RandomQuoteMachine />
      <Footer />
    </MuiThemeProvider>
  );
};

// Mouting app to the DOM
ReactDOM.render(<App />, document.getElementById('app'));
