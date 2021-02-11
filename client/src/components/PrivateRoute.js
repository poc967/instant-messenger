import React from "react";
import { Link, Redirect } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn, ...props }) => {
  return isLoggedIn ? <Link to="#" {...props} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
