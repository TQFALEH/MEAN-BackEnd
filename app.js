const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRouter = require("./Routes/authRoutes");
const adminRouter = require("./Routes/adminRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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
  .connect("mongodb+srv://rescco:0502504451@atlascluster.fgjc8gs.mongodb.net/Store")
  .then(() => {
    app.listen(8000, () => {
      console.log("The Server is running ");
    });
    console.log("MongoDb Connected");
  })
  .catch((err) => {
    console.log(err);
  });

