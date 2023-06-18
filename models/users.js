const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");

const userModel = mongoose.Schema({
  name: { type: String, required: [true, "Please enter your name"], min: 3 },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "This email is alredy used "],
    lowercase: true,
    validate: [isEmail, "Please enter valid email "],
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [6, "Minimum password length is 6 characters "],
  },
  role: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userModel);
