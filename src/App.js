import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles';
import {BrowserRouter as Router} from 'react-router-dom'

import Root from "./components/Root";
import configureStore from "./store/configureStore";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const store = configureStore();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Root />
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
