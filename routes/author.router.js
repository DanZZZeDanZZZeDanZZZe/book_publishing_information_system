const express = require('express')
const EntityModelController = require('../controllers/EntityModelController')
const Author = require('../models/Author.model')

const author = new EntityModelController(Author)

const authorRouter = express.Router()

authorRouter.route('/').post(author.addNewEntity())

authorRouter.route('/:email').get(author.getAllEntities())

module.exports = authorRouter
