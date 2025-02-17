import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Home from './pages/Home';
import AddNewPost from './pages/AddNewPost';
import { PostProvider } from './components/Posts'; // Import PostProvider
import DetailPage from './pages/DetailPage';

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
            <Route exact path="/AddNewPost">
              <AddNewPost />
            </Route>
            <Route path="/DetailPage/:id" component={DetailPage} />
          </Switch>
        </Router>
      </PostProvider>
    </ThemeProvider>
  );
}

export default App;