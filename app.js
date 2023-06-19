const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRouter = require("./Routes/authRoutes");
const adminRouter = require("./Routes/adminRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv  =  require('dotenv').config()



// Middleware For Json
app.use(express.json());
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);
app.use(cookieParser());
app.use("/auth", authRouter);
app.use('/admin',adminRouter)
// MongoDb Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(8000, () => {
      console.log("The Server is running ");
    });
    console.log("MongoDb Connected");
  })
  .catch((err) => {
    console.log(err);
  });

