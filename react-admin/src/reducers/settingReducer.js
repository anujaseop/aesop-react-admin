import { GET_SETTINGS, SETTINGS_FAIL } from "../actions/types"

const initialState = {
  getSettings: null,
  loading: true,
}

export default function setting(state = initialState, actions) {
  const { type, payload } = actions
  switch (type) {
    case GET_SETTINGS:
      return {
        ...state,
        getSettings: payload,
        loading: false,
      }
    case SETTINGS_FAIL:
      return {
        ...state,
        getSettings: null,
        loading: false,
      }

    default:
      return state
  }
}
