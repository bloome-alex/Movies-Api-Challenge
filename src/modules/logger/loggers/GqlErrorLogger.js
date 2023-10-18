import winston from "winston";
import ConsoleTransport from "../transports/ConsoleTransport.js";
import FileCombinedTransport from "../transports/FileCombinedTransport.js";
import DefaultTextFormatter from "../formatters/DefaultTextFormatter.js";
import FileGqlErrorTransport from "../transports/FileGqlErrorTransport.js";
import FileErrorTransport from "../transports/FileErrorTransport.js";

function GqlErrorLogger() {

    let transports = []

    if (!process.env.LOG_TRANSPORT_CONSOLE || process.env.LOG_TRANSPORT_CONSOLE === 'ON') {
        transports.push(ConsoleTransport())
    }

    if (process.env.LOG_TRANSPORT_COMBINED === 'ON') {
        transports.push(FileCombinedTransport())
    }

    if (process.env.LOG_TRANSPORT_GQL_ERROR === 'ON') {
        transports.push(FileGqlErrorTransport())
    }

    return winston.createLogger({
        format: DefaultTextFormatter(false),
        transports: transports
    })

}

export default GqlErrorLogger()