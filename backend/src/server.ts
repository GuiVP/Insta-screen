import express, { Request, Response } from 'express'
import routes from './constants/routes'
import BodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import http from 'http'
import socketio from 'socket.io'


const app = express()

const server = http.createServer(app)
const io = socketio(server)

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({
    extended: false
}))


app.use((req, res, next) => {
    //@ts-ignore
    req.io = io
    next()
})
app.use(cors())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(routes)


server.listen(process.env.PORT || 3334, () => {
    console.log('Servidor rodando em 3334')
})
  