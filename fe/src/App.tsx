import React from "react";
import "./App.css";
import Routes from "./routes/Routes";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { AgendaView } from "./components/AgengaView/AgendaView";

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
        <AgendaView></AgendaView>
      </div>
    </ThemeProvider>
  );
}

export default App;
