import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RoomsListPage } from "./pages/RoomsListPage";
import { RoomPage } from "./pages/RoomPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/rooms/:id" exact>
          <RoomPage />
        </Route>
        <Route path="/" exact>
          <RoomsListPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
