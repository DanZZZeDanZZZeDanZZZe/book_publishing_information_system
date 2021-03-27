const { middlewareTools } = require('../utils/middlewareTools')
const Authentication = require('./Authentication')
const UserModelController = require('./UserModelController')

const { createMiddleware, composeMiddlewares } = middlewareTools()

class EntityModelController {
  constructor(Model) {
    this.auth = new Authentication()
    this.user = new UserModelController()
    this.Model = Model
  }

  determineOwner() {
    return composeMiddlewares([
      this.auth.checkAuth(),
      this.user.findUser(),
      createMiddleware((req, res, next) => {
        if (req.foundData.user.id === req.decoded.userId) {
          req.owner = req.foundData.user.id
          console.log(`owner: ${req.owner}`)
          delete req.foundData.user.id
          delete req.decoded.userId
          next()
        } else {
          res.status(401).json({ message: 'No authorization' })
        }
      }),
    ])
  }

  addNewEntity() {
    return composeMiddlewares([
      createMiddleware((req, res, next) => {
        req.email = req.body.email
        next()
      }),
      this.determineOwner(),
      createMiddleware(async (req, res, next) => {
        const newEntity = new this.Model({ ...req.body.data, owner: req.owner })
        const doc = await newEntity.save()
        const message = 'Entity was created'
        console.log(message)
        res.status(201).json({ message, id: doc.id })
      }),
    ])
  }

  getAllEntities() {
    return composeMiddlewares([
      createMiddleware((req, res, next) => {
        req.email = req.params.email
        next()
      }),
      this.determineOwner(),
      createMiddleware(async (req, res, next) => {
        const entities = await this.Model.find({ owner: req.owner })
        const message = 'Entities was send on client'
        console.log(message)
        res.status(201).json({ message, data: entities })
      }),
    ])
  }
}

module.exports = EntityModelController
