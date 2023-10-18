import winston from "winston";
import ConsoleTransport from "../transports/ConsoleTransport.js";
import FileCombinedTransport from "../transports/FileCombinedTransport.js";
import FileAccessTransport from "../transports/FileAccessTransport.js";
import DefaultTextFormatter from "../formatters/DefaultTextFormatter.js";
import FileGqlResponseTransport from "../transports/FileGqlResponseTransport.js";


function RequestLogger() {

    let transports = []

    if (!process.env.LOG_TRANSPORT_CONSOLE || process.env.LOG_TRANSPORT_CONSOLE === 'ON') {
        transports.push(ConsoleTransport())
    }


    if (process.env.LOG_TRANSPORT_COMBINED === 'ON') {
        transports.push(FileCombinedTransport())
    }

    if (process.env.LOG_TRANSPORT_ACCESS === 'ON') {
        transports.push(FileAccessTransport())
    }


    return winston.createLogger({
        format: DefaultTextFormatter(false),
        transports: transports
    })

}

export default RequestLogger();