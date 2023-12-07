const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    fromName : {
        type : String,
        required: true
    },
    toName : {
        type : String,
        required: true
    },
    transferAmount : {
        type : Number,
        required: true
    }
})

module.exports =  mongoose.model('Transaction', transactionSchema);