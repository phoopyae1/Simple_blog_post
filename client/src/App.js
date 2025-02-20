import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { PostProvider } from './components/PostProvider';
import AddNewPost from './pages/AddNewPost';
import DetailPage from './pages/DetailPage';
import Home from './pages/Home';

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
      <PostProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/posts/new">
              <AddNewPost />
            </Route>
            <Route path="/posts/:id" component={DetailPage} />
          </Switch>
        </Router>
      </PostProvider>
    </ThemeProvider>
  );
}

export default App;