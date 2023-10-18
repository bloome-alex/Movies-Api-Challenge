import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const DirectorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    lastName: {
        type: String,
        required: true,
        unique: false
    },
    birthDate: {
        type: Date,
        required: true,
        unique: false
    },
    nationality: {
        type: String,
        required: false,
        unique: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {timestamps: true})

DirectorsSchema.plugin(mongoosePaginate)

export default mongoose.model('Director', DirectorsSchema)