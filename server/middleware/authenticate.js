const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async (req, res, next) => {
  // console.log("inside authenticate function");

  try {
    //   get the token from the cookie
    // console.log("inside try block of authenticate middleware");
    // console.log(req);
    const token = req.cookies.jwtoken;
    // console.log(token);

    // let's verify the token and t=get the user details
    const verifyToken = jwt.verify(token, "secretKey");
    // console.log(verifyToken);

    //now check in the database if the user is present
    const rootUser = await User.findOne({ _id: verifyToken.userExist._id });
    // console.log(rootUser);

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    if (!rootUser) {
      return res.send.json(401)("No user found in the database");
    }

    // console.log("user exist in the database");

    // if everything is fine then call next function which will send user data to frontend
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json("Authentication failed: No user found");
  }
};

module.exports = authenticate;
