import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API, // url = base url + request url
    timeout: 30000 // request timeout
})
console.log(import.meta.env)
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['Token'] = getToken()
        }
        return config
    },
    error => {
        console.log(error) 
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        
		return res
    },
    error => {
        
        return Promise.reject(error)
    }
)

export default service
