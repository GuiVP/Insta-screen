import axios from 'axios'

export const baseURL = "http://localhost:3334"

const api = axios.create({
    baseURL,
    timeout: 10000
})

export default api