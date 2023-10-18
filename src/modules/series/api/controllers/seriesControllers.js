import { DefaultLogger as winston } from '../../../logger/index.js'

import {
    seriesCreate,
    seriesUpdate,
    seriesDelete,
    seriesGetById,
    seriesPaginate
} from '../../services/seriesServices.js'

export const seriesCreateController = async (req, res) => {
    try {
        const {title, releaseYear, description, seasons} = req.body

        const serie = await seriesCreate({title, releaseYear, description, seasons})

        return res.status(201).json(serie)
    } catch (error) {
        if(error.name === 'ValidationError'){
            return res.status(400).json({
                message: 'Validation Error',
                errors: error.errors ? error.errors : error
            })
        }
        winston.error(error)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
export const seriesUpdateController = async (req, res) => {
    try {
        const id = req.params.id

        if(!id) return res.status(400).json({
            message: 'Id is required'
        })

        const {title, releaseYear, description, seasons} = req.body

        const serie = await seriesUpdate(id, {title, releaseYear, description, seasons})

        if(!serie) return res.status(404).json({
            message: 'Serie not found'
        })

        return res.status(200).json(serie)
    } catch (error) {
        if(error.name === 'ValidationError'){
            return res.status(400).json({
                message: 'Validation Error',
                errors: error.errors ? error.errors : error
            })
        }
        winston.error(error)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
export const seriesDeleteController = async (req, res) => {
    try {
        const id = req.params.id

        if(!id) return res.status(400).json({
            message: 'Id is required'
        })

        const serie = await seriesDelete(id)

        if(!serie) return res.status(404).json({
            message: 'Serie not found'
        })

        return res.status(200).json(serie)
    } catch (error) {
        winston.error(error)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
export const seriesPaginateController = async (req, res) => {
    try {
        const { page, limit } = req.params

        const { title, description, sinceReleaseYear, untilReleaseYear, sortBy, sortDesc } = req.query
        const filters = {title, description, sinceReleaseYear, untilReleaseYear}
        const seriesPaginated = await seriesPaginate({filters, page, limit, sortBy, sortDesc})

        return res.status(200).json(seriesPaginated)
    } catch (error) {
        winston.error(error)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
export const seriesGetByIdController = async (req, res) => {
    try {
        const id = req.params.id
        
        if(!id) return res.status(400).json({
            message: 'Id is required'
        })

        const serie = await seriesGetById(id)

        if(!serie) return res.status(404).json({
            message: 'Serie not found'
        })

        return res.status(200).json(serie)
    } catch (error) {
        winston.error(error)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}