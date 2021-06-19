import './App.css';

import DateFnsUtils from '@date-io/date-fns';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { initializePlugins } from './Plugins';
import rootReducer from './redux/reducers';
import Routes from './routes/Routes';
import { initGoogleUtils } from './utils/GoogleUtils';

let theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {},
});

function App() {
  initializePlugins();
  initGoogleUtils();

  const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <div className="App">
          <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
              <Router>
                <Routes />
              </Router>
            </DndProvider>
          </Provider>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
