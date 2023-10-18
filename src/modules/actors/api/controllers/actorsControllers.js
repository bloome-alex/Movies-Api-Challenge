import { DefaultLogger as winston } from '../../../logger/index.js'

import {
    actorsCreate,
    actorsUpdate,
    actorsDelete,
    actorsPaginate,
    actorsGetById
} from '../../services/actorsServices.js'

export const actorsCreateController = async (req, res) => {
    try {
        const {name, lastName, birthDate, nationality} = req.body

        const actor = await actorsCreate({name, lastName, birthDate: new Date(birthDate), nationality})

        return res.status(201).json(actor)
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

export const actorsUpdateController = async (req, res) => {
    try {
        const id = req.params.id
        const {name, lastName, birthDate, nationality} = req.body

        if(!id) return res.status(400).json({message: 'Id is required'})

        const actor = await actorsUpdate(id, {name, lastName, birthDate, nationality})

        if(!actor) return res.status(404).json({message: 'Actor not found'})
        
        return res.status(200).json(actor)
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

export const actorsDeleteController = async (req, res) => {
    try {
        const id = req.params.id

        if(!id) return res.status(400).json({message: 'Id is required'})

        const actor = await actorsDelete(id)

        if(!actor) return res.status(404).json({message: 'Actor not found'})

        return res.status(200).json(actor)
    }
    catch (error) {
        winston.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}

export const actorsPaginateController = async (req, res) => {
    try {
        const page = req.params.page
        const limit = req.params.limit
        const { name, lastName, nationality, sinceBirthDate, untilBirthDate, sortBy, sortDesc } = req.query

        const filters = {
            name,
            lastName,
            nationality,
            sinceBirthDate: new Date(sinceBirthDate),
            untilBirthDate: new Date(untilBirthDate)
        }

        const actorsPaginated = await actorsPaginate({filters, page, limit, sortBy, sortDesc})
        return res.status(200).json(actorsPaginated)
    } catch (error) {
        winston.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}

export const actorsGetByIdController = async (req, res) => {
    try {
        const id = req.params.id

        if(!id) return res.status(400).json({message: 'Id is required'})

        const actor = await actorsGetById(id)

        if(!actor) return res.status(404).json({message: 'Actor not found'})

        return res.status(200).json(actor)
    } catch (error) {
        winston.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}