import axios from 'axios'

export const myblogApi = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
})