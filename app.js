const express = require("express");
const mongoose = require("mongoose");
const cors= require("cors");
const dotenv = require("dotenv");

const customerRoutes = require("./routes/customerRoutes.js");
const historyRoutes = require("./routes/historyRoutes.js");

// import Customer from './models/Customer.js';
// import data from './data.json' assert {type :"json"}

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROOT ROUTE
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Bank API" });
});

/* ROUTES */

app.use("/customers", customerRoutes);
app.use("/history", historyRoutes);

/* MONGOOSE SETUP */

const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl)
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error.message));


module.exports = app;