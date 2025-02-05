import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',      // Changed from '#fff' to '#000'
      light: '#333',     // Changed to a lighter black
      contrastText: '#fff'
    },
    secondary: {
      main: '#f44336'
    },
    typography: {
      fontFamily: 'Quicksand',
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;