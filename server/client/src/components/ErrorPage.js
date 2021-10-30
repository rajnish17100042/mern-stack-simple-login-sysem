import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <br />
      <br />
      <h1>404 Error Page Not Found</h1>
      <h1>
        <NavLink to="/">Go to Home Page </NavLink>
      </h1>
    </>
  );
};

export default ErrorPage;
