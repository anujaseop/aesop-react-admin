import { GET_SUBSCRIBE_LIST_ALL } from '../actions/types'
const initialState = {
  userSubscribeList: {
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
    case GET_SUBSCRIBE_LIST_ALL:
      console.log(payload)
      return {
        ...state,
        userSubscribeList: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default subscribe
