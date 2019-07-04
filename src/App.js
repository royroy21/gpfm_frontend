import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {BrowserRouter as Router} from 'react-router-dom'

import Root from "./components/Root";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Root />
      </Router>
    </ThemeProvider>
  );
}

export default App;
