import { routes as actorsRoutes } from './modules/actors/index.js'
import { routes as directorsRoutes } from './modules/directors/index.js'
import { routes as moviesRoutes } from './modules/movies/index.js'
import { routes as seriesRoutes } from './modules/series/index.js'

import express from 'express'

const routes = express.Router()

const mergeRoutes = [actorsRoutes, directorsRoutes, moviesRoutes, seriesRoutes]

mergeRoutes.forEach(route => {
  routes.use(route)
})

export {
  routes
}