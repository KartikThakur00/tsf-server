const Customer = require("../models/Customer.js");
const Transaction = require("../models/Transaction.js");

// Get all customers

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json({ customers });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

// Get a customer from which you want to transfer money

const getToCustomers = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    const customers = await Customer.find({
      _id: {
        $ne: req.params.id,
      },
    });
    const count = customers.length;
    res.status(200).json({ customer, count, customers });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

// Get a customer to which you want to transfer money

const getFromCustomers = async (req, res) => {
  try {
    const { id1, id2 } = req.params;
    const fromCustomer = await Customer.findById(id1);
    const toCustomer = await Customer.findById(id2);
    res.status(200).json({ fromCustomer, toCustomer });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

// Transfer money from one customer to another

const transferMoney = async (req, res) => {
  try {
    const { id1, id2 } = req.params;
    const sendAmount = parseInt(req.body.sendAmount);
    const fromCustomer = await Customer.findById(id1);
    const toCustomer = await Customer.findById(id2);
    // console.log(fromCustomer.balance);
    // console.log(toCustomer.balance);
    // console.log(sendAmount);
    if (sendAmount <= fromCustomer.balance) {
      if (sendAmount > 0) {
        let frombalanceNew = fromCustomer.balance - sendAmount;
        let tobalanceNew = parseInt(toCustomer.balance + sendAmount);
        await Customer.findByIdAndUpdate(
          id1,
          { balance: frombalanceNew },
          { runValidators: true, new: true }
        );
        await Customer.findByIdAndUpdate(
          id2,
          { balance: tobalanceNew },
          { new: true }
        );
        let newTransaction = new Transaction();
        newTransaction.fromName = fromCustomer.name;
        newTransaction.toName = toCustomer.name;
        newTransaction.transferAmount = sendAmount;
        await newTransaction.save();
        res.status(200).json({ message: "Transaction Successful" });
      } else {
        res.status(200).json({ message: "Invalid Amount" });
      }
    } else {
      res.status(200).json({ message: "Insufficient Balance" });
    }
  } catch (e) {
    res.status(404).json({ message: e.message, er: "error" });
  }
};

module.exports = {
  getCustomers,
  getToCustomers,
  getFromCustomers,
  transferMoney,
};
