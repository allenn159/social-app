import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// Check if user is logged in
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  return (
    <Route
      {...rest}
      render={() => (userAuth ? <Component {...rest} /> : <Redirect to="/" />)}
    />
  );
};

export default ProtectedRoute;
