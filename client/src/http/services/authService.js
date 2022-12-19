import api from "./api";
import tokenService from "./tokenService";

const authService = {
  signIn(userName, password) {
    console.log('userName, password', userName, password);

    return api.post(
      '/auth/signin',
      {
        userName,
        password,
      }
    ).then((res) => {
      if (res.data?.accessToken) {
        tokenService.setUser(res.data);
      }

      return res.data;
    });
  },

  logOut() {
    tokenService.removeUser();
  },

  signUp(userName, email, password) {
    return api.post(
      '/auth/signup',
      {
        userName,
        email,
        password,
      }
    );
  },
};

export default authService;
