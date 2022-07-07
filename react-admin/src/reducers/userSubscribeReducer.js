import { USER_SUBSCRIBE_LIST } from '../actions/types'
const initialState = {
  subscribeList: {
    docs: [],
    totalDocs: 0,
    limit: 0,
    page: 0,
    totalPages: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  },
  loading: false,
}

const subscribe = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_SUBSCRIBE_LIST:
      return {
        ...state,
        loading: false,
        subscribeList: payload,
      }
    default:
      return state
  }
}

export default subscribe
