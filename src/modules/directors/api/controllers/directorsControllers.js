import { DefaultLogger as winston } from '../../../logger/index.js'

import {
    directorsCreate,
    directorsUpdate,
    directorsDelete,
    directorsPaginate,
    directorsGetById
} from '../../services/directorsServices.js'

export const directorsCreateController = async (req, res) => {
    try {
        const {name, lastName, birthDate, nationality} = req.body

        const director = await directorsCreate({name, lastName, birthDate: new Date(birthDate), nationality})

        return res.status(201).json(director)
    } catch (error) {
        if(error.name === 'ValidationError'){
            return res.status(400).json({
                message: 'Validation Error',
                errors: error.errors ? error.errors : error
            })
        }
        winston.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}

export const directorsUpdateController = async (req, res) => {
    try {
        const id = req.params.id
        const {name, lastName, birthDate, nationality} = req.body

        if(!id) return res.status(400).json({message: 'Id is required'})

        const director = await directorsUpdate(id, {name, lastName, birthDate, nationality})

        if(!director) return res.status(404).json({message: 'Director not found'})
        
        return res.status(200).json(director)
    } catch (error) {
        if(error.name === 'ValidationError'){
            return res.status(400).json({
                message: 'Validation Error',
                errors: error.errors ? error.errors : error
            })
        }
        winston.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}

export const directorsDeleteController = async (req, res) => {
    try {
        const id = req.params.id

        if(!id) return res.status(400).json({message: 'Id is required'})

        const director = await directorsDelete(id)

        if(!director) return res.status(404).json({message: 'Director not found'})

        return res.status(200).json(director)
    }
    catch (error) {
        winston.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}

export const directorsPaginateController = async (req, res) => {
    try {
        const page = req.params.page
        const limit = req.params.limit
        const { name, lastName, nationality, sinceBirthDate, untilBirthDate, sortBy, sortDesc } = req.query

        const filters = {name, lastName, nationality, sinceBirthDate: new Date(sinceBirthDate), untilBirthDate: new Date(untilBirthDate)}

        const directorsPaginated = await directorsPaginate({filters, page, limit, sortBy, sortDesc})
        return res.status(200).json(directorsPaginated)
    } catch (error) {
        winston.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}

export const directorsGetByIdController = async (req, res) => {
    try {
        const id = req.params.id

        if(!id) return res.status(400).json({message: 'Id is required'})

        const director = await directorsGetById(id)

        if(!director) return res.status(404).json({message: 'Director not found'})

        return res.status(200).json(director)
    } catch (error) {
        winston.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}