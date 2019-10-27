import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './contexts/index';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5754d6',
      dark: '#0b2ba4',
      light: '#8e81ff'
    },
    background: {
      default: '#fff'
    }
  },
  typography: {
    fontFamily: ['-apple-system', '"Helvetica Neue"'].join(',')
  }
});

ReactDOM.render(
  <BrowserRouter>
    <Provider>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
