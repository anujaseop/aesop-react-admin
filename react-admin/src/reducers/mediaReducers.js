import { GET_ALL_MEDIA } from '../actions/types'
const initialState = {
  mediaDetails: {
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
  mediaLoading: false,
}

const mediaManagement = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_ALL_MEDIA:
      return { ...state, mediaLoading: false, mediaDetails: payload }
    default:
      return state
  }
}

export default mediaManagement
