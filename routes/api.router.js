const express = require('express')
const UserAuthentication = require('../controllers/UserAuthentication')
const authorRouter = require('./author.router')
const bookRouter = require('./book.router')
const commandRouter = require('./command.router')
const projectRouter = require('./project.router')

const auth = new UserAuthentication()

const api = express.Router()

api.route('/check/auth/:email').get(auth.checkAuth())
api.route('/registration').post(auth.registerUser())
api.route('/login').post(auth.loginUser())

api.use('/entities/book', bookRouter)
api.use('/entities/author', authorRouter)
api.use('/entities/project', projectRouter)
api.use('/entities/command', commandRouter)
module.exports = api
