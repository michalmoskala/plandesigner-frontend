import axios from 'axios'
import { BASE_URL } from '@/constants'

export default {
  getWorkersForMonth (id) {
    return axios.get(`${BASE_URL}/months/${id}/workers`)
  },
  putSpecialDay (id, day) {
    return axios.put(`${BASE_URL}/months/${id}/special-days`, day)
  },
  getMonth (id) {
    return axios.get(`${BASE_URL}/months/${id}`)
  },
  getAllMonths () {
    return axios.get(`${BASE_URL}/months`)
  },
  postMonth (month) {
    return axios.post(`${BASE_URL}/months`, month)
  },
  removeMonth (id) {
    return axios.delete(`${BASE_URL}/months/${id}`)
  },
  putHoliday (id, holiday) {
    return axios.put(`${BASE_URL}/months/${id}/holidays`, holiday)
  },
  putOffset (id, offset) {
    return axios.put(`${BASE_URL}/months/${id}/offsets`, offset)
  },
  getAlgo (id) {
    return axios.get(`${BASE_URL}/months/${id}/penalties`)
  }

}
