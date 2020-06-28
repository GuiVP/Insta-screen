import io from 'socket.io-client'
import { baseURL } from './apiConfig'

export const socket = io(baseURL, {
    autoConnect: true,
})

export default socket