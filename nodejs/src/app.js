const express = require('express')
require('./db/mongoose.js')
const UserRouter = require('./routers/user')
const TransactionRouter = require('./routers/transaction')

const app = express()
const port = process.env.port || 3001

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.header('Access-Control-Allow-Headers', '*'); // If needed
    res.header('Access-Control-Allow-Credentials', true); // If needed
    next();
});
app.use([UserRouter, TransactionRouter])

app.listen(port, () => {
    console.log('Server runs on '+ port)
})



