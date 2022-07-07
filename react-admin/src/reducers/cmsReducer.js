import { GET_ALL_CMS } from '../actions/types'

const initialState = {
  cmsDetails: {
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
  cmsLoading: true,
}

const contentManagement = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_ALL_CMS:
      return { ...state, cmsLoading: false, cmsDetails: payload }
    default:
      return state
  }
}

export default contentManagement
