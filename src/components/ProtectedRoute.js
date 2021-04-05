import { Redirect, Route } from "react-router-dom";
import React from 'react';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("authToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signup" />
        )
      }
    />
  );
};

export default ProtectedRoute;
