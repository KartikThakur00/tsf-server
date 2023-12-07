const Transaction = require("../models/Transaction");

// Get all transactions history
const transactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.status(200).json({ transactions });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

module.exports =  { transactionHistory}
