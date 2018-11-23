import axios from 'axios'
import { BASE_URL } from '@/constants'

export default {
  getWorkers () {
    return axios.get(`${BASE_URL}/workers`)
  },
  postWorker (worker) {
    return axios.post(`${BASE_URL}/workers`, worker)
  }
}
