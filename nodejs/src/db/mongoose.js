const mongoose = require('mongoose')

mongoose.connect('mongodb://agur:agur123456789123@SG-MyProj-33769.servers.mongodirector.com:27017/abc-retail-bank', {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
})