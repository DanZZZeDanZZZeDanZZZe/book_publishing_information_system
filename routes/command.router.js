const express = require('express')
const EntityModelController = require('../controllers/EntityModelController')
const Command = require('../models/Command.model')

const command = new EntityModelController(Command)

const commandRouter = express.Router()

commandRouter.route('/').post(command.addNewEntity())

commandRouter.route('/:email').get(command.getAllEntities())

module.exports = commandRouter
