import React, { useEffect, useState } from "react";

const Home = () => {
  //using hooks to store the user data and initially put it as empty object
  const [userData, setuserData] = useState({});

  const authenticate = async () => {
    try {
      const response = await fetch("/home-data", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      // console.log(response);
      // console.log(data);

      // check the status code sent from the backend
      if (response.status !== 200 || !data) {
        // return window.alert("Sorry! Something is missing");
      } else {
        //console.log("user data exist in the data base and storing it in the state hooks");
        setuserData(data);
      }
    } catch (err) {
      // console.log(err);
      // in case of any error redirect user to the login page
    }
  };

  useEffect(() => {
    // console.log("Hello from the Home Page");
    // check if user is logged in then display user data on the Home Page
    authenticate();
  }, []);

  return (
    <>
      <h1>Hello {userData.name}! from the home side</h1>
    </>
  );
};

export default Home;
