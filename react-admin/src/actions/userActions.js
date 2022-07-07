import axios from 'axios'
import { USER_DETAILS, USER_LIST, USER_SUBSCRIBE_LIST } from './types'
const PROXY = process.env.REACT_APP_URL + 'api/'
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}
//user detail api

export const getUserList =
  (page, limit, search, role = '', flag = '') =>
  async (dispatch) => {
    const res = await axios.get(
      PROXY +
        'user?page=' +
        page +
        '&limit=' +
        limit +
        '&search=' +
        search +
        '&role=' +
        role +
        '&flag=' +
        flag
    )
    dispatch({
      type: USER_DETAILS,
      payload: res.data.result,
    })
    return res
  }

export const addNewUser = (formData) => async (dispatch) => {
  const res = await axios.post(PROXY + 'user', formData)
  return res
}

export const updateUserDetails = (id, details) => async (dispatch) => {
  const res = await axios.put(PROXY + 'user/' + id, details)
  return res
}

export const deleteUser = (id) => async (dispatch) => {
  const res = await axios.delete(PROXY + 'user/' + id)
  return res
}

export const getUserDetailsById = (id) => async (dispatch) => {
  const res = await axios.patch(PROXY + 'user/' + id)
  return res
}

export const getUserDropDownList = () => async (dispatch) => {
  const res = await axios.get(PROXY + 'user')
  dispatch({
    type: USER_LIST,
    payload: res.data.result,
  })
}

export const getUserTips = (user) => async (dispatch) => {
  const res = await axios.get(PROXY + 'tip/admin?user=' + user)

  return res
}

export const getAllSubscribe =
  (id, page, limit, search) => async (dispatch) => {
    const res = await axios.get(
      `${PROXY}group/admin/subscribe/${id}?page=${page}&limit=${limit}&search=${search}`
    )
    dispatch({
      type: USER_SUBSCRIBE_LIST,
      payload: res.data.result,
    })
    return res
  }

export const addRating = (data) => async (dispatch) => {
  const body = JSON.stringify(data)

  const res = await axios.post(`${PROXY}group/admin/rating`, body, config)
  return res
}

export const userStatusChange = (id, data) => async (dispatch) => {
  const body = JSON.stringify(data)
  const res = await axios.put(`${PROXY}user/change-status/${id}`, body, config)
  return res
}

export const consultantDrop =
  (type = 2) =>
  async (dispatch) => {
    const res = await axios.get(`${PROXY}admin/consultant?type=${type}`)
    return res
  }
