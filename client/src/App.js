import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Users/Register/Register";
import Login from "./components/Users/Login/Login";
import NavBar from "./components/NavBar/";
import AddCategory from "./components/Categories/AddCategory";
import Category from "./components/Categories/Category";
import CreatePost from "./components/Posts/CreatePost";
import ProtectedRoute from "./components/NavBar/ProtectedRoute/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/add-category" component={AddCategory} />
        <ProtectedRoute exact path="/category/:id" component={Category} />
        <ProtectedRoute exact path="/create-post/:id" component={CreatePost} />
      </Switch>
    </Router>
  );
}

export default App;
