import axios from 'axios'
import { BASE_URL } from '@/constants'

export default {
  postShift (shift) {
    return axios.post(`${BASE_URL}/shifts`, shift)
  }
}
