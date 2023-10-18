import Actors from "../models/Actors.js"

export const actorsCreate = async ({name, lastName, birthDate, nationality}) => {
    return await Actors.create({name, lastName, birthDate, nationality})
}

export const actorsUpdate = async (id, {name, lastName, birthDate, nationality}) => {
    return await Actors.findOneAndUpdate({_id: id, deleted: false}, {name, lastName, birthDate, nationality}, {new: true})
}

export const actorsPaginate = async ({filters, page = 1, limit = 5, sortBy, sortDesc}) => {
    let query = {
        deleted: false
    }
    
    if(filters){
        if(filters.name) query.name = {$regex: filters.name, $options: 'i'}
        if(filters.lastName) query.lastName = {$regex: filters.lastName, $options: 'i'}
        if(filters.nationality) query.nationality = {$regex: filters.nationality, $options: 'i'}

        if(filters.sinceBirthDate && filters.untilBirthDate) query.birthDate = {$gte: filters.sinceBirthDate, $lte: filters.untilBirthDate}
        else if(filters.sinceBirthDate) query.birthDate = {$gte: filters.sinceBirthDate}
        else if(filters.untilBirthDate) query.birthDate = {$lte: filters.untilBirthDate}
    }

    let sortOptions = {}

    if(sortBy) {
        sortOptions[sortBy] = sortDesc ? -1 : 1
    }

    let options = {
        page,
        limit,
        sort: sortOptions
    }

    return await Actors.paginate(query, options)
}

export const actorsDelete = async (id) => {
    return await Actors.findOneAndUpdate({_id: id, deleted: false}, {deleted: true, deletedAt: Date.now()}, {new: true})
}

export const actorsGetById = async (id) => {
    return await Actors.findOne({_id: id, deleted: false})
}