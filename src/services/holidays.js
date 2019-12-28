import axios from 'axios'
import { BASE_URL } from '@/constants'

export default {
  deleteHoliday (id) {
    return axios.delete(`${BASE_URL}/holidays/${id}`)
  }
}
