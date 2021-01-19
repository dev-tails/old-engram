import "./App.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Routes from "./routes/Routes";

let theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {},
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <Routes />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
