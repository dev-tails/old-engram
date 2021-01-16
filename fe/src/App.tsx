import "./App.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes/Routes";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
