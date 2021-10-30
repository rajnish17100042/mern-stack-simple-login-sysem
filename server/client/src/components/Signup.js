import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    //client side validation

    const { name, email, phone, work, password, cpassword } = user;
    if (!name || !email || !phone || !work || !password || !cpassword) {
      return window.alert("Please fill the form properly ");
    }
    if (password !== cpassword) {
      return window.alert("Password is not matching");
    }

    try {
      let response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
      });

      let result = await response.json();

      if (response.status === 422 || !result) {
        window.alert("Invalid Registration");
        console.log("Invalid Registration");
      } else {
        window.alert("User Registered Successfully");
        console.log("User Registered Successfully");
        // redirect user to login page
        history.push("/login");
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
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <input
            type="text"
            placeholder="Enter Your Name"
            name="name"
            id="name"
            required
            value={user.name}
            onChange={handleInput}
          />

          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            id="email"
            required
            value={user.email}
            onChange={handleInput}
          />

          <input
            type="tel"
            placeholder="Enter mobile Number"
            name="phone"
            id="phone"
            required
            value={user.phone}
            onChange={handleInput}
          />

          <input
            type="text"
            placeholder="Enter your Profession"
            name="work"
            id="work"
            required
            value={user.work}
            onChange={handleInput}
          />

          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            required
            value={user.password}
            onChange={handleInput}
          />

          <input
            type="password"
            placeholder="Confirm your Password"
            name="cpassword"
            id="cpassword"
            required
            value={user.cpassword}
            onChange={handleInput}
          />

          <hr />
          <p>
            By creating an account you agree to our{" "}
            <NavLink to="/">Terms & Privacy</NavLink>.
          </p>

          <button type="submit" className="registerbtn" onClick={registerUser}>
            Register
          </button>
        </div>

        <div className="container signin">
          <p>
            Already have an account? <NavLink to="/login">login here</NavLink>.
          </p>
        </div>
      </form>
    </>
  );
};

export default Signup;
