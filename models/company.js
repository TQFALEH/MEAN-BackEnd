const mongoose = require("mongoose");

const company = mongoose.Schema({
  arabicName: {
    type: String,
    required: true,
  },
  englishName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("company", company);
