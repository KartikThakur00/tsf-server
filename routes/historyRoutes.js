const express = require("express");
const { transactionHistory } = require("../controllers/historyController.js");

const router = express.Router();

router.get("/", transactionHistory);

module.exports = router;