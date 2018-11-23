import axios from 'axios'
import { BASE_URL } from '@/constants'

export default {
  postBlock (block) {
    return axios.post(`${BASE_URL}/blocks`, block)
  }
}
