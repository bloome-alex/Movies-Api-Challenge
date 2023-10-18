import dotenv from 'dotenv'
dotenv.config()
import DefaultTextFormatter from "./DefaultTextFormatter.js";
import DefaultJsonFormatter from "./DefaultJsonFormatter.js";

function DefaultFormatter(color) {

    switch (process.env.LOG_MODE) {
        case "JSON":
            return DefaultJsonFormatter()
        case "TEXT":
            return DefaultTextFormatter(color)
        default:
            return DefaultTextFormatter(color)
    }
}

export default DefaultFormatter