import './App.css';

import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { initializePlugins } from './Plugins';
import rootReducer from './redux/reducers';
import Routes from './routes/Routes';
import { initializeFeatureFlags } from './utils/FeatureFlagUtils';

let theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});

function App() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function init() {
      await initializeFeatureFlags();
      initializePlugins();
      setInitialized(true);
    }

    init();
  }, []);

  if (!initialized) {
    return null;
  }

  const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {/* <CssBaseline /> */}
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
