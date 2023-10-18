import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import {DefaultLogger as winston} from '../modules/logger/index.js'

/**
 * Connects to a MongoDB database.
 *
 * @return {boolean} true if the connection is successful, otherwise an error is thrown.
 */
export const mongoConnect = async function(){

    if(!process.env.MONGO_URI){
        winston.error("MongoDB connection error: process.env.MONGO_URI not found")
        throw new Error("process.env.MONGO_URI not found")
    }

    try{
        await connectToMongo(process.env.MONGO_URI)
        const db = mongoose.connection;

        db.on('error', function (){
            winston.error('connection error:')
            winston.info("Reconnecting with MongoDB")
            setTimeout(async () => await connectToMongo(process.env.MONGO_URI), 3000)
        });

        db.once('open', function() {
            winston.info("MongoDB Open")
        });

        const {ObjectId} = mongoose.Types;
        ObjectId.prototype.valueOf = function () {
            return this.toString();
        };
        return true
    }
    catch (error){
        winston.error("Connection to Mongo error: " + error)
        throw new Error("Connection to Mongo error: " + error)
    }


}

/**
 * Connects to the MongoDB database using the provided URI.
 *
 * @param {string} mongoUri - The URI of the MongoDB database.
 * @return {Promise} A promise that resolves when the connection is successful, and rejects with an error if the connection fails.
 */
export const connectToMongo = function (mongoUri){

    return new Promise((resolve, reject) => {

        mongoose.Promise = global.Promise;

        mongoose.connect(mongoUri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                winston.info("Mongoose connected")
                resolve()
            })
            .catch(error => {
                winston.error("Mongoose not connected" + error.message ? error.message : error)
                reject(error)
            });

    })

}

/**
 * Disconnects from the MongoDB database.
 *
 * @return {Promise<void>} Promise that resolves when the disconnection is complete.
 * @throws {Error} Throws an error if there is no connection to the MongoDB database.
 */
export const mongoDisconnect = async () => {
    if(mongoose.connection.readyState === 0) throw new Error('I cant disconnect if havent conection in mongoose')
    await mongoose.disconnect()
}