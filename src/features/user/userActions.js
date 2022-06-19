import { loading, login, logout, setError } from './userSlice';
import userApi from '../../services/userApi';

export const loginWithGoogle = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await userApi.loginWithGoogle();
    const user = response.user;

    dispatch(login(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(loading());
  try {
    await userApi.logOut();
    dispatch(logout());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
