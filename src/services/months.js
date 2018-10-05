import axios from 'axios'
import { BASE_URL } from '@/constants'

export default {
  getWorkersForMonth (id) {
    return axios.get(`${BASE_URL}/months/${id}/workers`)
  }
}
