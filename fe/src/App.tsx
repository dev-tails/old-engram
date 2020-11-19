import React from "react";
import "./App.css";
import Routes from "./routes/Routes";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1C1C1C",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes></Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
