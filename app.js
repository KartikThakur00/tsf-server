const express = require("express");
const mongoose = require("mongoose");
const cors= require("cors");
const dotenv = require("dotenv");

const customerRoutes = require("./routes/customerRoutes.js");
const historyRoutes = require("./routes/historyRoutes.js");

// const  Customer= require('./models/Customer.js')
// const data=require('./data.json')

dotenv.config();

const app = express();

app.use(cors());
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

  // Customer.insertMany(data)

module.exports = app;