import { Request, Response } from 'express'
import { Post } from '../models/Schemas'

export const like = async(req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const postId = await Post.findById(id)
    const post = await Post.findByIdAndUpdate({_id: id}, {likes: postId.likes + 1}, {new: true})

    // @ts-ignore
    req.io.emit('like', post)

    return res.json(post)
}

export const deslike = async(req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const postId = await Post.findById(id)
    const post = await Post.findByIdAndUpdate({_id: id}, {likes: postId.likes - 1}, {new: true})

    // @ts-ignore
    req.io.emit('deslike', post)

    return res.json(post)
}