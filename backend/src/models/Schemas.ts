import mongoose from '../database/connection'

interface PostInterface extends mongoose.Document{
    author?: string,
    place?: string,
    description?: string,
    hashtags?: string,
    image?: string,
    likes?: number
}

const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
})

export const Post = mongoose.model<PostInterface>('Post', PostSchema)