import express from 'express'

import {
    seriesCreateController,
    seriesUpdateController,
    seriesDeleteController,
    seriesPaginateController,
    seriesGetByIdController
} from '../controllers/seriesControllers.js'

const routes = express.Router()

routes.get('/series/:id', seriesGetByIdController)
routes.get('/series/:page/:limit', seriesPaginateController)

routes.post('/series', seriesCreateController)
routes.put('/series/:id', seriesUpdateController)
routes.delete('/series/:id', seriesDeleteController)

export default routes