const express = require('express')
const router = express.Router()
const TransactionModel = require('../models/transaction')
const UserModel = require('../models/user')

router.post('/transaction/add', async (req, res) => {
    const data = req.body
    try {
        const user = await UserModel.findById(data.transUserId)
        if (!user) {
            return res.status(500).send({ error: true, message: 'Not a valid user id!'})
        }

        //save the transaction
        const transaction = await new TransactionModel(data).save()

        //update the balance
        if ( data.transType !== 'Deposit') {
            user.banking.balance -= data.transAmt
        } else {
            user.banking.balance += data.transAmt
        }
        await user.save()

        res.status(401).send(transaction)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/transaction/user/:id', async (req, res) => {
    const user_id = req.params.id

    try {
        const transactions = await TransactionModel.find( { transUserId: user_id} ).sort({_id: -1})
        if (!transactions) {
            return res.status(400).send({'error': true, 'message': 'No transactions found!'})
        }
        res.send(transactions)
    } catch (error) {
        res.status(500).send(error)
    }    
})

router.delete('/transaction/user/delete/:transId', async (req, res) => {
    const transId = req.params.transId
    try {
        const transaction = await TransactionModel.findByIdAndDelete(transId)
        if (!transaction) {
            return res.status(500).send({error: true, message: "Invalid transaction Id"})
        }
        const user = await UserModel.findById(transaction.transUserId)
        
         //update the balance
        if ( transaction.transType !== 'Deposit') {            
            user.banking.balance += transaction.transAmt
        } else {
            user.banking.balance -= transaction.transAmt
        }
        await user.save()

        res.send(transaction)           
    } catch (error) {
        res.status(500).send(error)
    } 
})

module.exports = router