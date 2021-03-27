const express = require('express')
const EntityModelController = require('../controllers/EntityModelController')
const Book = require('../models/Book.model')

const book = new EntityModelController(Book)

const bookRouter = express.Router()

bookRouter.route('/').post(book.addNewEntity())

bookRouter.route('/:email').get(book.getAllEntities())

module.exports = bookRouter
