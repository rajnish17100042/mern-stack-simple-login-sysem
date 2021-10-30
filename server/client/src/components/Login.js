import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    // destructuring user data
    const { email, password } = user;
    // client side validation
    if (!password || !email) {
      return window.alert("Please fill the data properly");
    }

    try {
      let response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        credentials: "include", // Don't forget to specify this if you need cookies
        body: JSON.stringify(user),
      });

      let result = await response.json();

      if (response.status === 422 || !result) {
        window.alert("Invalid Login");
        console.log("Invalid Login");
      } else {
        window.alert("User Logged in  Successfully");
        console.log("User Logged in  Successfully");
        // redirect user to home page
        history.push("/");
      }
      // console.log(response);
      // console.log(result);
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <>
      <form method="post">
        <div className="container">
          <h1>Login </h1>
          <p>Please fill in this form to login to your account.</p>
          <hr />

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            id="email"
            autoComplete="off"
            required
            value={user.email}
            onChange={handleInput}
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            autoComplete="off"
            required
            value={user.password}
            onChange={handleInput}
          />
          <hr />

          <button type="submit" className="registerbtn" onClick={loginUser}>
            Login
          </button>
        </div>

        <div className="container signin">
          <p>
            Don't have an account? <NavLink to="/signup">Register here</NavLink>
            .
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
