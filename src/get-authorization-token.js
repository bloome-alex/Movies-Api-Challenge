import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken'
import { DefaultLogger as winston } from './modules/logger/index.js'

const getAuthorizationToken = () => {
    try {
        const token = jwt.sign({ authorization: true }, process.env.JWT_SECRET_KEY)
        winston.info('getAuthorizationToken token: ' + token)
        return token
    } catch (error) {
        winston.error('getAuthorizationToken error: ' + error)
    }
}

getAuthorizationToken()
