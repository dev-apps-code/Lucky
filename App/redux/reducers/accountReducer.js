import {REGISTER, LOGIN} from '../actions/types';

const initialState = {
  account: {},
  isLogin: false,
  isRegistered: false,
};

const accountReducer = (state = initialState, action) => {
  let actionType = action.type;
  switch (actionType) {
    case LOGIN:
      return {
        ...state,
        account: action.payload,
        isLogin: true,
      };

    case REGISTER:
      return {
        ...state,
        account: action.data,
      };
    default:
      return state;
  }
};

export default accountReducer;
