import { CONSULTANT_PAYMENT } from '../actions/types';

const initialState = {
  consultantPayment: { docs: [] },
  consultantPaymentLoading: true,
};

const paymentReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CONSULTANT_PAYMENT:
      return {
        ...state,
        consultantPaymentLoading: false,
        consultantPayment: payload,
      };
    default:
      return state;
  }
};

export default paymentReducers;
