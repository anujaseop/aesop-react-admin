import axios from 'axios'
import { GET_ALL_FAQ, FAQ_FAIL } from './types'
const PROXY = process.env.REACT_APP_URL + 'api'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// Get faq
export const getFAQ =
  (page = 1, limit = 30) =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        `${PROXY}/faq/getfaq?page=${page}&limit=${limit}`
      )
      dispatch({
        type: GET_ALL_FAQ,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: FAQ_FAIL,
      })
    }
  }
// add FAQ
export const addFAQ = (newFAQ) => async (dispatch) => {
  // console.log('newFAQ', newFAQ)

  const body = JSON.stringify(newFAQ)
  try {
    const res = await axios.post(`${PROXY}/faq/addfaq`, body, config)
    return res
  } catch (err) {
    dispatch({
      type: FAQ_FAIL,
    })
  }
}

// Patch FAQ

export const updateFAQ = (newFAQ, id) => async (dispatch) => {
  const body = JSON.stringify(newFAQ)
  try {
    const res = await axios.patch(`${PROXY}/faq/editfaq/${id}`, body, config)
    return res
  } catch (err) {
    dispatch({
      type: FAQ_FAIL,
    })
  }
}

// Delete
export const deleteFAQ = (id) => async (dispatch) => {
  try {
    return await axios.delete(`${PROXY}/faq/deletefaq/${id}`)
  } catch (err) {
    dispatch({
      type: FAQ_FAIL,
    })
  }
}
