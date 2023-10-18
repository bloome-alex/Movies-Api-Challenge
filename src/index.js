import dotenv from 'dotenv'
dotenv.config()

import { connectToMongo } from './config/mongodb.js'
connectToMongo(process.env.MONGO_URI)

import express from 'express'
import { DefaultLogger as winston } from './modules/logger/index.js'
import { routes } from './modules-merge.js'

import { authorizationMiddleware } from './modules/security/authorizationMiddleware.js'

const app = express()

app.use(express.json())

app.use('/api', authorizationMiddleware, routes)

const APP_PORT = process.env.APP_PORT || 3000

app.listen(APP_PORT, ()=>{
    winston.info('Server listening at https://localhost:' + APP_PORT)
})