import axios from 'axios'
import { CONSULTANT_PAYMENT } from './types'
const PROXY = process.env.REACT_APP_URL + 'api/'

export const getConsultantPayment =
  (page, limit, user = '') =>
  async (dispatch) => {
    const res = await axios.patch(
      `${PROXY}consultant_payment/admin?page=${page}&limit=${limit}&user=${user}`
    )
    dispatch({
      type: CONSULTANT_PAYMENT,
      payload: res.data.result,
    })
    return res
  }

export const addConsultantPayment = (formData) => async (dispatch) => {
  const res = await axios.post(PROXY + 'consultant_payment', formData)
  return res
}
