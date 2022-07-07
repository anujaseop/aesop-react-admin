import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ADMIN_LOADED,
  AUTH_FAIL,
  LOGOUT,
} from '../actions/types'
const initialState = {
  token: localStorage.getItem('tokenAdmin'),
  isAuthenticated: false,
  loading: true,
  admin: null,
}

export default function auth(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: payload.user,
      }

    case LOGIN_SUCCESS:
      console.log(payload)
      localStorage.setItem('tokenAdmin', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case LOGIN_FAIL:
    case AUTH_FAIL:
    case LOGOUT:
      localStorage.removeItem('tokenAdmin')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      }
    default:
      return state
  }
}
