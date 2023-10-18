import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const ActorSchema = new mongoose.Schema({
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

ActorSchema.plugin(mongoosePaginate)

export default mongoose.model('Actor', ActorSchema)