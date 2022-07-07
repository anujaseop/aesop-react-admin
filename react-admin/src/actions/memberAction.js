import axios from 'axios'
import { CONSULTANT_MEMBER_LIST } from './types'

const PROXY = process.env.REACT_APP_URL + 'api/'

export const getAllMember = (id, page, limit, search) => async (dispatch) => {
  const res = await axios.get(
    `${PROXY}user/get-member/admin/${id}?page=${page}&limit=${limit}&search=${search}`
  )
  dispatch({
    type: CONSULTANT_MEMBER_LIST,
    payload: res.data.result,
  })
  return res
}
