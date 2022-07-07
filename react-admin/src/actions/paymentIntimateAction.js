import axios from 'axios'
import { GET_ALL_PAYMENT_INTIMATE } from './types'
const PROXY = process.env.REACT_APP_URL + 'api/'

export const paymentIntimate =
  (page, limit, user = '') =>
  async (dispatch) => {
    const res = await axios.get(
      `${PROXY}group/admin/intimate?page=${page}&limit=${limit}&user=${user}`
    )
    dispatch({
      type: GET_ALL_PAYMENT_INTIMATE,
      payload: res.data.result,
    })
    return res
  }
