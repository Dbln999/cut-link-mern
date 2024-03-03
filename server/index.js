const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const linkRoutes = require("./routes/linkRoutes");
const shortRoute = require("./routes/shortRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.use("/auth", authRoutes);
app.use("/link", linkRoutes);
app.use("/", shortRoute);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(process.env.PORT, () => console.log(`Server started on PORT: ${process.env.PORT}`));
  } catch (e) {
    console.log(e);
  }
};
startApp();
