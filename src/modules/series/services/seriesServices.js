import Series from '../models/Series.js'

export const seriesCreate = async ({title, description, releaseYear, seasons}) => {
    const seriesCreated = await Series.create({title, description, releaseYear, seasons})

    return await Series.findById(seriesCreated._id)
        .populate('seasons.episodes.actors.actor')
        .populate('seasons.episodes.directors')
}

export const seriesUpdate = async (id, {title, description, releaseYear, seasons}) => {
    return await Series.findByIdAndUpdate(id, {title, description, releaseYear, seasons}, {new: true})
        .populate('seasons.episodes.actors.actor')
        .populate('seasons.episodes.directors')
}

export const seriesDelete = async (id) => {
    return await Series.findByIdAndDelete(id, {new: false})
        .populate('seasons.episodes.actors.actor')
        .populate('seasons.episodes.directors')
}

export const seriesPaginate = async ({filters, page = 1, limit = 5, sortBy, sortDesc}) => {
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

    const seriesPaginated = await Series.paginate(query, options)

    const { docs, ...paginatedRest } = seriesPaginated

    const series = await Series.populate(docs, [
        { path: 'seasons.episodes.actors.actor' },
        { path: 'seasons.episodes.directors' }
    ])

    return {
        docs: series,
        ...paginatedRest
    }
}

export const seriesGetById = async (id) => {
    return await Series.findById(id)
        .populate('seasons.episodes.actors.actor')
        .populate('seasons.episodes.directors')
}