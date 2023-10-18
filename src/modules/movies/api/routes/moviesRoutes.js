import express from 'express'

import {
    moviesCreateController,
    moviesUpdateController,
    moviesDeleteController,
    moviesPaginateController,
    moviesGetByIdController
} from '../controllers/moviesControllers.js'

const routes = express.Router()

routes.get('/movies/:id', moviesGetByIdController)
routes.get('/movies/:page/:limit', moviesPaginateController)

routes.post('/movies', moviesCreateController)
routes.put('/movies/:id', moviesUpdateController)
routes.delete('/movies/:id', moviesDeleteController)

export default routes