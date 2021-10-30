const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// saltRound for password hashing
const saltRounds = 12;

require("../db/conn");
const User = require("../model/userSchema");

// including the authenticate mddleware
const authenticate = require("../middleware/authenticate");

// create an endpoint or route for the home page
// router.get("/", (req, res) => {
//   res.send("<h1>Hello from the Home Page.....This is the Express router</h1>");
// });

//get the data of the form filled by the user
//using promises

// router.post("/register", (req, res) => {
//   // data in the json format
//   data = req.body;
//   // console.log(data);
//   // console.log(req.body.name);
//   // console.log(req.body.email);

//   // destructuring the data object
//   const { name, email, phone, work, password, cpassword } = req.body;
//   // console.log(name, "\n", email);

//   // server side validation
//   if (
//     !name ||
//     !email ||
//     !phone ||
//     !work ||
//     !password ||
//     !cpassword ||
//     !(password === cpassword)
//   ) {
//     // console.log("Please fill the form properly");
//     return res.status(422).json({ Error: "Please fill the data properly" });
//   }

//   // check in the database that email already exist
//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ Error: "Email already exists" });
//       }
//       // if email is a unique one then add the user in the database
//       // create a document for the user

//       // use bcrypt hashing technique to hash the  password
//       // using bcrypt to hash the password

//       bcrypt.hash(password, saltRounds, (err, hash) => {
//         if (err) throw err;
//         // console.log("inside bcrypt");
//         const user = new User({
//           name: name,
//           email: email,
//           phone: phone,
//           work: work,
//           password: hash
//
//         });
//         // console.log(hash);
//         user
//           .save()
//           .then(() => {
//             res.status(200).json({ result: "User registered  successfully" });
//           })
//           .catch((err) => {
//             res.status(422).json({ Error: err });
//           });
//       });
//     })
//     .catch((error) => {
//       res.status(422).json({ Error: error });
//     });
// });

// registration using async await

router.post("/register", async (req, res) => {
  data = req.body;

  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ Error: "Please fill the data properly" });
  }

  if (password !== cpassword) {
    return res.status(422).json({ Error: "Password din't match" });
  }
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(422).json({ Error: "Email already exist" });
    }

    const user = new User({ name, phone, email, work, password });

    // here we will use 'pre' middleware to hash the password will define that middleware in the userSchema

    await user.save();
    res.status(200).json({ result: "User Registered Successfully" });
  } catch (err) {
    res.status(422).json(err);
  }
});

//create a route for login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let userExist;
  if (!email || !password) {
    res.status(422).json({ error: "Please fill the form properly" });
  }

  try {
    userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(422).json({ error: "user does not exist" });
    } else {
      bcrypt.compare(password, userExist.password, (err, result) => {
        if (!result) {
          return res.status(422).json({ error: "Wrong Credentials" });
        }
        //generate access token or JWT for this user
        //syntax   jwt.sign(payload,secretKey,expiry,callbackFunction);
        // console.log(userExist);
        jwt.sign(
          { userExist },
          "secretKey",

          (err, token) => {
            if (err) throw err;

            res.cookie("jwtoken", token, {
              expires: new Date(Date.now() + 100000000000), //time in millisecond  100second
              httpOnly: true,
            });
            // console.log(token);
            res.status(201).json({
              Success: "User logged in successfully",
              access_token: token,
            });
          }
        );
      });
    }
  } catch (err) {
    res.status(422).json(err);
  }
});

//creating routes for about page to get the data from the backend and display on about page
router.get("/display-about-data", authenticate, (req, res) => {
  // console.log("Hello from the backend of about page");
  res.send(req.rootUser);
});

//creating routes for home page to get the data from the backend and display on home page
router.get("/home-data", authenticate, (req, res) => {
  // console.log("Hello from the backend of home page");
  res.send(req.rootUser);
});

module.exports = router;
