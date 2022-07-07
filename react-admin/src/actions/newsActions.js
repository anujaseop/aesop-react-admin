import axios from 'axios'
import { GET_ALL_CMS } from './types'
const PROXY = process.env.REACT_APP_URL + 'api/'

export const getNews = (newsObj) => async (dispatch) => {
  const res = await axios.get(PROXY + 'news', { params: newsObj })
  dispatch({
    type: GET_ALL_CMS,
    payload: res.data.result,
  })
}

export const changeNewsStatus = (id, news) => async (dispatch) => {
  const res = await axios.put(PROXY + 'news/status/' + id, news)
  return res
}

export const addNews = (news) => async (dispatch) => {
  const res = await axios.post(PROXY + 'news', news)
  return res
}

export const updateNews = (id, news) => async (dispatch) => {
  const res = await axios.put(PROXY + 'news/' + id, news)
  return res
}

export const deleteNews = (id) => async (dispatch) => {
  return await axios.delete(PROXY + 'news/' + id)
}
