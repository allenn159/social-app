import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Users/Register/Register";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
