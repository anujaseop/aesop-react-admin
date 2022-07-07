import { GET_ALL_FAQ, FAQ_FAIL } from '../actions/types'
const initialState = {
  getfaq: null,
  loading: true,
}

export default function faq(state = initialState, actions) {
  const { type, payload } = actions
  switch (type) {
    case GET_ALL_FAQ:
      return {
        ...state,
        getfaq: payload,
        loading: false,
      }
    case FAQ_FAIL:
      return {
        ...state,
        getfaq: null,
        loading: false,
      }
    default:
      return state
  }
}
