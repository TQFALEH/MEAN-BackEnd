const router = require("express").Router();
const adminController = require("../Controllers/adminController");
const cors = require("cors");
const cookieParser = require("cookie-parser");

router.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);
router.use(cookieParser());
router.get('/companies',adminController.findAllCompanies);
router.get('/company/:id',adminController.fetchCompany)
router.get('/users',adminController.findAllUsers)
router.post("/addCompany", adminController.addCompany);
router.delete('/company/:id',adminController.deleteCompany)
router.put('/company/update/:id',adminController.updateCompany)

module.exports = router;
