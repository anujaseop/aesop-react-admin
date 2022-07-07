import { CONSULTANT_TIP_LIST } from '../actions/types'
const initialState = {
  consultantTips: {
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
    case CONSULTANT_TIP_LIST:
      return {
        ...state,
        loading: false,
        consultantTips: payload,
      }
    default:
      return state
  }
}

export default consultant
