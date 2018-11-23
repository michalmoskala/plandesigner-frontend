import axios from 'axios'
import { BASE_URL } from '@/constants'

export default {
  postShift (shift) {
    return axios.post(`${BASE_URL}/shifts`, shift)
  },
  putSpecialColor (shiftId) {
    return axios.put(`${BASE_URL}/shifts/minutes/${shiftId}`)
  },
  removeShift (shiftEntity) {
    return axios.delete(`${BASE_URL}/shifts/`, { data: shiftEntity })
  }
}
