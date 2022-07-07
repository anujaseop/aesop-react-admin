import axios from 'axios'
const PROXY = process.env.REACT_APP_URL + 'api/'
export const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}
export const addNotification = (data) => async (dispatch) => {
  const body = JSON.stringify(data)
  const res = await axios.post(PROXY + 'notification', body, config)
  return res
}
