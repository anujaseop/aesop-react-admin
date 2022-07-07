import axios from 'axios'
import { CONSULTANT_TIP_LIST } from './types'

const PROXY = process.env.REACT_APP_URL + 'api/'

export const getAllConsultant =
  (id, page, limit, search) => async (dispatch) => {
    const res = await axios.get(
      `${PROXY}tip/admin/${id}?page=${page}&limit=${limit}&search=${search}`
    )
    dispatch({
      type: CONSULTANT_TIP_LIST,
      payload: res.data.result,
    })
    return res
  }
