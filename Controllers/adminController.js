const User = require("../models/users");
const Company = require("../models/company");
const cors = require("cors");
const company = require("../models/company");

module.exports = {
  findAllCompanies: async (req, res) => {
    try {
      const companies = await Company.find({}, {});
      console.log(companies);
      res.send(companies);
    } catch (error) {
      console.log(error);
    }
  },
  findAllUsers: async (req, res) => {
    try {
      const users = await User.find({}, {});
      console.log(users);
      res.send(users);
    } catch (error) {
      console.log(error);
    }
  },

  fetchCompany: async (req, res) => {
    try {
      const company = await Company.findOne({ _id: req.params.id }, { __v: 0 });
      console.log(company);
      res.send(company);
    } catch (error) {
      console.log(error);
    }
  },
  addCompany: async (req, res) => {
    const { arabicName, englishName, image, budget } = req.body;
    try {
      const company = await new Company({
        arabicName: arabicName,
        englishName: englishName,
        image: image,
        budget: budget,
      });
      company
        .save()
        .then((company) => {
          console.log("Company added");
          res.send(company);
        })
        .catch((err) => {
          res.send(err.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteCompany: async (req, res) => {
    Company.findByIdAndDelete(req.params.id)
      .then((company) => {
        if (!company) {
          return res.send(company).json({
            message: "No company found ",
          });
        } else {
          //   console.log(company);
          res.send(company);
        }
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  },

  updateCompany: async (req, res) => {
    const { arabicName, englishName, image, budget } = req.body;
    try {
      const company = await Company.findOneAndUpdate(
        { _id: req.params.id },
        {
          arabicName: arabicName,
          englishName: englishName,
          budget: budget,
          image: image,
        }
      );
      console.log(company);
      res.send(company);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
};
