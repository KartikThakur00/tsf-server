const express = require("express");
const {
  getCustomers,
  getToCustomers,
  getFromCustomers,
  transferMoney,
} = require("../controllers/customerController.js");

const router = express.Router();

router.get("/", getCustomers);

router.get("/:id", getToCustomers);
router.get("/:id1/:id2", getFromCustomers);
router.put("/:id1/:id2", transferMoney);

module.exports = router;