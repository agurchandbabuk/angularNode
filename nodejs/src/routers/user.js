const express = require('express')
const router = new express.Router()
const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')

router.post('/user/add', async (req, res) => {
    const data = req.body
    try {
        const user = await new UserModel(data).save()        
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/user/:id', async (req, res) => {
    const user_id = req.params.id
    try {
        const user = await UserModel.findById(user_id)
        if (!user) {
            return res.status(400).send({'error': true, 'message': 'Not a valid user id'})
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }    
})

router.patch('/user/update/:id', async (req, res) => {
    const user_id = req.params.id
    const updates = Object.keys(req.body)
    try {
        const user = await UserModel.findById(user_id)        
        if (!user) {
            return res.status(400).send({'error': true, 'message': 'Not a valid user id'})
        }
        updates.forEach( update => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }    
})

router.get('/users', async (req, res) => {    
    try {
        const users = await UserModel.find()       
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }    
})

router.post('/user/login', async (req, res) => {
    const data = req.body
    try {
        const user = await UserModel.findOne({username: data.username})
        if (!user) {
            return res.status(400).send({'error': true, 'message': 'Not a valid username'})
        }
        const matchPass = bcrypt.compareSync(data.password, user.password)
        if (!matchPass) {
            return res.status(400).send({'error': true, 'message': 'Invalid password'})
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router