import axios from 'axios'
import { GET_ALL_MEDIA } from './types'
const PROXY = process.env.REACT_APP_URL + 'api/'

export const getMediaDetails = (page, limit, type) => async (dispatch) => {
  const res = await axios.get(
    PROXY + 'media?page=' + page + '&limit=' + limit + 'type=' + type
  )
  dispatch({
    type: GET_ALL_MEDIA,
    payload: res.data.result,
  })
}

export const changeMediaStatus = (id, tour) => async (dispatch) => {
  const res = await axios.put(PROXY + 'media/change-status/' + id, tour)
  return res
}

export const addMedia = (tour) => async (dispatch) => {
  const res = await axios.post(PROXY + 'media', tour)
  return res
}

export const updateMedia = (id, tour) => async (dispatch) => {
  const res = await axios.put(PROXY + 'media/' + id, tour)
  return res
}

export const getMediaDetailsById = (id, tour) => async (dispatch) => {
  const res = await axios.patch(PROXY + 'media/' + id)
  return res
}

export const deleteMedia = (id) => async (dispatch) => {
  return await axios.delete(PROXY + 'media/' + id)
}
