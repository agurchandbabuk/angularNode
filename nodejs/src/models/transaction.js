const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema(
    {
        transUserId : {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        transType: {
            type: String,
            enum: ['Deposit', 'Withdraw', 'NEFT', 'IMPS', 'RTGS'],
            required: true
        },
        transAmt: {
            type: Number,
            require: true
        },
        tranDesc: {
            type: String,
            default: ''
        },
        transDate: {
            type: Date,
            required: true
        }
    }
)

const transaction = mongoose.model('transaction', transactionSchema)

module.exports = transaction