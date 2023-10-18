import Movies from "../models/Movies.js"

export const moviesCreate = async ({title, description, releaseYear, actors, directors}) => {
    const movieCreated = await Movies.create({title, description, releaseYear, actors, directors})

    return await Movies.findById(movieCreated._id)
        .populate('actors.actor')
        .populate('directors')
}

export const moviesUpdate = async (id, {title, description, releaseYear, actors, directors}) => {
    return await Movies.findByIdAndUpdate(id, {title, description, releaseYear, actors, directors}, {new: true})
        .populate('actors.actor')
        .populate('directors')
}

export const moviesDelete = async (id) => {
    return await Movies.findByIdAndDelete(id, {new: false})
        .populate('actors.actor')
        .populate('directors')
}

export const moviesPaginate = async ({filters, page = 1, limit = 5, sortBy, sortDesc}) => {
    let query = {}

    if(filters){
        if(filters.title) query.title = {$regex: filters.title, $options: 'i'}
        if(filters.description) query.description = {$regex: filters.description, $options: 'i'}
        if(filters.sinceReleaseYear && filters.untilReleaseYear) query.releaseYear = {$gte: filters.sinceReleaseYear, $lte: filters.untilReleaseYear}
        else if(filters.sinceReleaseYear) query.releaseYear = {$gte: filters.sinceReleaseYear}
        else if(filters.untilReleaseYear) query.releaseYear = {$lte: filters.untilReleaseYear}
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

    const moviesPaginated = await Movies.paginate(query, options)
    const { docs, ...paginatedRest } = moviesPaginated
    
    const movies = await Movies.populate(docs, [
        { path: 'actors.actor' },
        { path: 'directors' }
    ])

    return {
        docs: movies,
        ...paginatedRest
    }
}

export const moviesGetById = async (id) => {
    return await Movies.findById(id)
        .populate('actors.actor')
        .populate('directors')
}