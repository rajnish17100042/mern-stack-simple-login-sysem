const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const cors = require("cors");
// include express module in our app
const express = require("express");

// now create an app variable which will store all the functions and methods defined by the express module
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn");
const port = process.env.PORT || 5000;

//adding middleware so that the application can understand the json data recieved at the endpoint(/register)
app.use(express.json());

//adding middleware for the cookie parser to use the cookies
app.use(cookieParser());

// use cors to send the data from one port to other
//no need to use cors if proxy is used in the frontend
// app.use(cors());

//user collection is imported here
const User = require("./model/userSchema");

//using middleware to use the route we created
app.use(require("./router/auth"));

//for production
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running at the port ${port}`);
});
