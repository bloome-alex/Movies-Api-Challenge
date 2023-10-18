import express from 'express'

import {
    directorsCreateController,
    directorsUpdateController,
    directorsDeleteController,
    directorsPaginateController,
    directorsGetByIdController
} from '../controllers/directorsControllers.js'

const routes = express.Router()

routes.get('/directors/:id', directorsGetByIdController)
routes.get('/directors/:page/:limit', directorsPaginateController)

routes.post('/directors', directorsCreateController)
routes.put('/directors/:id', directorsUpdateController)
routes.delete('/directors/:id', directorsDeleteController)

export default routes