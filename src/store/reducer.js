import { SET_DATA, SET_EVENT, UPDATE_BOUGHT_BITCOINS, UPDATE_SOLD_BITCOINS } from './actionTypes';

const initialState = {
  event: '',
  boughtBitcoins: [],
  soldBitcoins: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_EVENT:
      return {
        ...state,
        event: payload,
      };

    case SET_DATA:
      return {
        ...state,
        boughtBitcoins: payload.boughtBitcoins,
        soldBitcoins: payload.soldBitcoins,
      };

    case UPDATE_BOUGHT_BITCOINS:
      return {
        ...state,
        boughtBitcoins: payload,
      };

    case UPDATE_SOLD_BITCOINS:
      return {
        ...state,
        soldBitcoins: payload,
      };

    default:
      return state;
  }
};
