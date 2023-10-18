import express from 'express'

import {
    actorsCreateController,
    actorsUpdateController,
    actorsDeleteController,
    actorsPaginateController,
    actorsGetByIdController
} from '../controllers/actorsControllers.js'

const routes = express.Router()

routes.get('/actors/:id', actorsGetByIdController)
routes.get('/actors/:page/:limit', actorsPaginateController)

routes.post('/actors', actorsCreateController)
routes.put('/actors/:id', actorsUpdateController)
routes.delete('/actors/:id', actorsDeleteController)

export default routes