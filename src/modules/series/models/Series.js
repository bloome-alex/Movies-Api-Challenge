import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const SeriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: false,
        unique: false
    },
    releaseYear: {
        type: Number,
        required: true,
        unique: false
    },
    seasons: [{
        number: Number,
        title: String,
        episodes: [
            {
                title: String,
                actors: [{
                    actor: {
                        type: mongoose.SchemaTypes.ObjectId,
                        ref: 'Actor'
                    },
                    character: String,
                }],
                directors: [{
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: 'Director'
                }]
            }
        ]
    }]
})

SeriesSchema.plugin(mongoosePaginate)

export default mongoose.model('Series', SeriesSchema)