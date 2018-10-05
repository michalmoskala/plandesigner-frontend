import axios from 'axios'
import { BASE_URL } from '@/constants'

export default {
  getWorkers () {
    return axios.get(`${BASE_URL}/workers`)
  }
}
