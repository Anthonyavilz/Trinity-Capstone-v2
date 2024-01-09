require('dotenv').config()

const jwt = require('jsonwebtoken')
const { SECRET } = process.env
const { TotkUser } = require('../../models/ToTK-Models/totkModels')
const bcrypt = require('bcryptjs')

const createToken = (username, id) => {
    return jwt.sign({username, id}, SECRET, {expiresIn: '2 days'})
}

module.exports = {
    totkLogin: async (req, res) => {
        try {
            const {username, password} = req.body
            const foundUser = await TotkUser.findOne({where: {username: username}})
            if (foundUser) {
                const isAuthenticated = bcrypt.compareSync(password, foundUser.password)
                
                if (isAuthenticated) {
                    const token = createToken(foundUser.dataValues.username, foundUser.dataValues.user_id)
                    console.log('token', token)
                    const exp = Date.now() + 1000 * 60 * 60 * 48
                    res.status(200).send({username: foundUser.dataValues.username, userId: foundUser.dataValues.user_id, token, exp})
                } else {
                    res.status(400).send('Password incorrect')
                }
            } else {
                res.status(400).send('User does not exist')
            }
        } catch (err) {
            console.log('Login failed')
            res.status(400).send(err)
        }
    },

    totkRegister: async (req, res) => {
        try {
            const {first_name, last_name,username, password} = req.body
            const foundUser = await TotkUser.findOne({where: {username: username}})
            if (foundUser) {
                res.status(400).send('User already exist')
                // this is sent to the fron end where because we already have the user existing, the .send is where the message will send but it won't show up in the in console
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                const newUser = await TotkUser.create({first_name: first_name, last_name: last_name ,username: username, password: hash})
                console.log('user created', newUser)
                const token = createToken(newUser.dataValues.username, newUser.dataValues.user_id)
                console.log('token in register', token)
                const exp = Date.now() + 1000 * 60 * 60 * 48
                console.log('the new user', {username: newUser.dataValues.username, userId: newUser.dataValues.user_id, token, exp})
                res.status(200).send({username: newUser.dataValues.username, userId: newUser.dataValues.user_id, token, exp})
            }
            
        } catch (err) {
            console.log('Register Error')
            res.status(400).send(err)
        }
    },

    userDatabase: async (req, res) => {
        try {
            const users = await TotkUser.findAll()
            console.log('success in userDatabase', users)
            res.status(200).send(users)
        } catch (error) {
            res.status(400).send('error in userDatabase')
        }
    }
}