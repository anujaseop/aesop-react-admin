import axios from 'axios'
import { GET_SUBSCRIBE_LIST_ALL } from './types'
const PROXY = process.env.REACT_APP_URL + 'api/'

export const getUserSubscribeList =
  (page, limit, search = '', user = '') =>
  async (dispatch) => {
    const res = await axios.get(
      PROXY +
        'group/admin/subscribe?page=' +
        page +
        '&limit=' +
        limit +
        '&search=' +
        search +
        '&user=' +
        user
    )
    console.log(true)
    dispatch({
      type: GET_SUBSCRIBE_LIST_ALL,
      payload: res.data.result,
    })
    return res
  }
