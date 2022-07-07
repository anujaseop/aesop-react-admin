import { USER_DETAILS, USER_LIST, USER_TIPS } from '../actions/types';
const initialState = {
  allUsers: {
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
  userTips: {
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
  userTipsLoading: true,
  userDetailLoading: true,
  userlist: [],
  userListLoading: true,
};

const userDetailReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DETAILS:
      return { ...state, userDetailLoading: false, allUsers: payload };
    case USER_LIST:
      return { ...state, userListLoading: false, userlist: payload };
    case USER_TIPS:
      return { ...state, userTipsLoading: false, userTips: payload };

    default:
      return state;
  }
};

export default userDetailReducers;
