import { GET_ALL_PAYMENT_INTIMATE } from '../actions/types'
const initialState = {
  payment_intimate_list: {
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

const consultant = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_ALL_PAYMENT_INTIMATE:
      return {
        ...state,
        loading: false,
        payment_intimate_list: payload,
      }
    default:
      return state
  }
}

export default consultant
