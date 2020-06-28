import express from 'express'
import multer from 'multer'
import * as posts from '../controllers/PostController'
import * as like from '../controllers/LikeController'
import uploadConfig from '../configs/upload'

const routes = express.Router()
const upload = multer(uploadConfig)

routes.get('/posts', posts.index)
routes.post('/posts', upload.single('image'), posts.store)

routes.post('/posts/:id/like', like.like)
routes.post('/posts/:id/deslike', like.deslike)

export default routes