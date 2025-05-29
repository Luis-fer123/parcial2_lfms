import Axios, { type AxiosInstance } from 'axios'

const axios: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT,
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Bearer token',
  },
})
export default axios
