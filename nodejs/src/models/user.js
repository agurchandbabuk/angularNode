const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 4,
            maxlenth: 15
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is not valid')
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlenth: 15
        },
        fullname: {
            type: String,
            required: true,        
        },
        dob: {
            type: Date,
            required: true
        },
        banking: {
            balance: {
                type: Number,
                default: 0
            }
        }
    }
)

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User