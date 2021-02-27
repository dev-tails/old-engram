import './App.css';

import DateFnsUtils from '@date-io/date-fns';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes/Routes';

let theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {},
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <div className="App">
          <Router>
            <Routes />
          </Router>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
