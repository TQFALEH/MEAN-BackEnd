const router = require("express").Router();
const authController = require("../Controllers/authController");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");

router.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  }));
router.use(cookieParser());

router.post("/signup", authController.signup);
router.post("/login", authController.signin);
router.get("/user", authController.getUser);
router.post("/logout", authController.logout);
// router.get("/check",authController.checkUser)

module.exports = router;
