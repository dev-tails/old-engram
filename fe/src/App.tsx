import './App.css';

import DateFnsUtils from '@date-io/date-fns';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router } from 'react-router-dom';

import { initializePlugins } from './Plugins';
import Routes from './routes/Routes';

let theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {},
});

function App() {
  initializePlugins();

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <div className="App">
          <DndProvider backend={HTML5Backend}>
            <Router>
              <Routes />
            </Router>
          </DndProvider>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
