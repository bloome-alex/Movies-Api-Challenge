import { DefaultLogger as winston } from '../../../logger/index.js'

import {
    moviesCreate,
    moviesUpdate,
    moviesPaginate,
    moviesGetById,
    moviesDelete
} from '../../services/moviesServices.js'

export const moviesCreateController = async (req, res) => {
    try {
        const {title, description, releaseYear, actors, directors} = req.body

        const movie = await moviesCreate({title, description, releaseYear, actors, directors})

        return res.status(200).json(movie)
    } catch (error) {
        if(error.name === 'ValidationError'){
            return res.status(400).json({
                message: 'Validation Error',
                errors: error.errors ? error.errors : error
            })
        }
        winston.error('error at moviesCreateController ' + error)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const moviesUpdateController = async (req, res) => {
    try {
        const id = req.params.id

        if(!id) return res.status(400).json({message: 'ID is required'})

        const {title, description, releaseYear, actors, directors} = req.body

        const movie = await moviesUpdate(id, {title, description, releaseYear, actors, directors})

        if(!movie) return res.status(404).json({message: 'Movie not found'})

        return res.status(200).json(movie)
    } catch (error) {
        if(error.name === 'ValidationError'){
            return res.status(400).json({
                message: 'Validation Error',
                errors: error.errors ? error.errors : error
            })
        }
        winston.error('error at moviesUpdateController ' + error)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const moviesDeleteController = async (req, res) => {
    try {
        const id = req.params.id
        
        if(!id) return res.status(400).json({message: 'ID is required'})

        const movie = await moviesDelete(id)

        if(!movie) return res.status(404).json({message: 'Movie not found'})

        return res.status(200).json(movie)
    } catch (error) {
        winston.error('error at moviesDeleteController ' + error)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const moviesPaginateController = async (req, res) => {
    try {
        const page = req.params.page
        const limit = req.params.limit
        const { title, description, sinceReleaseYear, untilReleaseYear, sortBy, sortDesc } = req.query
        const filters = {title, description, sinceReleaseYear, untilReleaseYear}
        const moviesPaginated = await moviesPaginate({filters, page, limit, sortBy, sortDesc})

        return res.status(200).json(moviesPaginated)
    } catch (error) {
        winston.error('error at moviesPaginateController ' + error)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const moviesGetByIdController = async (req, res) => {
    try {
        const id = req.params.id

        if(!id) return res.status(400).json({message: 'ID is required'})

        const movie = await moviesGetById(id)

        if(!movie) return res.status(404).json({message: 'Movie not found'})

        return res.status(200).json(movie)
    } catch (error) {
        winston.error('error at moviesGetByIdController ' + error)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}