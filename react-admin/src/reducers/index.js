import { combineReducers } from 'redux'
import authReducers from './authReducers.js'
import alertReducers from './alertReducer'
import faqReducer from './faqReducer.js'
import contentManagement from './cmsReducer.js'
import mediaManagement from './mediaReducers.js'

import userDetailReducers from './userReducers.js'

import paymentReducers from './paymentReducer.js'
import userSubscribeReducer from './userSubscribeReducer'
import consultantReducer from './consultantReducer'
import memberReducer from './memberReducer'
import intimateReducer from './intimateReducer'
import userPaymentReducer from './userPaymentReducer'

export default combineReducers({
  auth: authReducers,
  alert: alertReducers,
  faq: faqReducer,
  cmsDetails: contentManagement,
  mediaDetails: mediaManagement,
  users: userDetailReducers,
  payment: paymentReducers,
  user_subscribe: userSubscribeReducer,
  consultant_tip: consultantReducer,
  consultant_member: memberReducer,
  payment_intimate: intimateReducer,
  userSubscribe: userPaymentReducer,
})
