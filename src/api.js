import axios from 'axios'

export const API_BASE_URL = 'http://localhost:5001'

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Attach the saved token (if any) to every request automatically.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('raksha_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
