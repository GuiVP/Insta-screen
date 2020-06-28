import {Request, Response} from 'express'
import { Post } from '../models/Schemas'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export const index = async (req: Request, res:Response): Promise<Response> => {
    const posts = await Post.find().sort('-createdAt')

    return res.json(posts)
}

export const store = async(req: Request, res:Response): Promise<Response> => {
    const { author, place, description, hashtags} = req.body
    const {filename: image} = req.file

    const [name] = image.split('.')

    const fileName = `${name.trim()}.jpg`

    await sharp(req.file.path)
        .resize(720)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(req.file.destination, 'resized', fileName.trim()))

    fs.unlinkSync(req.file.path)

    const post = await Post.create({
        author,
        place,
        description,
        hashtags,
        image: fileName.trim()
    })

    // @ts-ignore
    req.io.emit('post', post)

    return res.json(post)
}


export default index