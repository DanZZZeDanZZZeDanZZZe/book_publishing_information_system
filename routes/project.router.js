const express = require('express')
const EntityModelController = require('../controllers/EntityModelController')
const Project = require('../models/Project.model')

const project = new EntityModelController(Project)

const projectRouter = express.Router()

projectRouter.route('/').post(project.addNewEntity())

projectRouter.route('/:email').get(project.getAllEntities())

module.exports = projectRouter
