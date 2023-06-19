const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

module.exports = {
  //Sign up and store the user to MongoDB with Hashing the password
  signup: async (req, res) => {
    // geting our data from frontend
    const { name, email, password } = req.body;
    // encrypting our password to store in database
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    try {
      // storing our user data into database
      const response = await User.create({
        name: name,
        email: email,
        password: hash,
      });
      const user = await User.findOne({ email: response.email });
      const token = jwt.sign({ _id: user._id }, "secret");

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // one day
      });
      res.status(201).json({
        messege: "Success",
      });
    } catch (error) {
      console.log(error._message);
      if (error.code === 11000) {
        return res
          .status(401)
          .json({ status: "error", messege: "Email already exists" });
      } else {
        return res
          .status(401)
          .json({ status: "error", messege: error._message });
      }
    }
  },
  // Sign in and check the user validation
  signin: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        messege: "User not found ",
      });
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(404).json({
        messege: "Invalid credentials",
      });
    }
    const token = jwt.sign({ _id: user._id }, "secret");

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // one day
    });
    res.status(201).json({
      messege: "Success",
    });
  },

  getUser: async (req, res) => {
    try {
      const cookie = req.cookies["jwt"];
      const claims = jwt.verify(cookie, "secret");
      if (!claims) {
        return res.status(401).json({
          messege: "Unauthenticated",
        });
      }
      const user = await User.findOne({ _id: claims._id });
      const { password, ...userData } = await user.toJSON();
      res.send({userData:userData,status:true});
    } catch (error) {
      return res.send(false);
    }
  },

  logout: (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(201).json({
      messege: "logged out",
    });
  },
};
