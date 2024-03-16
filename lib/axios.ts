import _axios from 'axios'

const baseURL = 'http://localhost:3001/api/v1'

const axios = _axios.create({
  baseURL,
  withCredentials: true,
})

export default axios
