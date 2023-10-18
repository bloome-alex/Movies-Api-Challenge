import dotenv from 'dotenv'
dotenv.config()
import winston from "winston";
import ConsoleTransport from "../transports/ConsoleTransport.js";
import FileCombinedTransport from "../transports/FileCombinedTransport.js";
import FileErrorTransport from "../transports/FileErrorTransport.js";


function DefaultLogger() {

    let transports = []

    if (!process.env.LOG_TRANSPORT_CONSOLE || process.env.LOG_TRANSPORT_CONSOLE === 'ON') {
        transports.push(ConsoleTransport())
    }

    if (process.env.LOG_TRANSPORT_COMBINED === 'ON') {
        transports.push(FileCombinedTransport())
    }

    if (process.env.LOG_TRANSPORT_ERROR === 'ON') {
        transports.push(FileErrorTransport())
    }

    winston.configure({
        transports: transports
    });

    return winston
}

export default DefaultLogger()