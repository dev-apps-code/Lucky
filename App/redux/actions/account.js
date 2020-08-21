import {LOGIN, REGISTER} from './types';

export const login = (payload) => ({
  type: LOGIN,
  payload: payload
});

export const register = (data) => ({
  type: REGISTER,
  data: data,
});
