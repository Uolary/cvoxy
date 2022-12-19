import {getState, getStore} from "../../store";

const tokenService = {
  getLocalRefreshToken() {
    const user = getState().user;

    return user?.refreshToken;
  },

  getLocalAccessToken() {
    const user = getState().user;

    return user?.accessToken;
  },

  updateLocalAccessToken(token) {
    const store = getStore();

    let user = {...getState().user};

    user.accessToken = token;

    store.dispatch({type: 'user/set', payload: user});
  },

  getUser() {
    return getState().user;
  },

  setUser(user) {
    const store = getStore();

    store.dispatch({type: 'user/set', payload: user});
  },

  removeUser() {
    const store = getStore();

    store.dispatch({type: 'user/set', payload: {}});
  }
};

export default tokenService;
