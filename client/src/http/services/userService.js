import api from "./api";

const userService = {
  getUserContent: function () {
    return api.get('/user');
  },
};

export default userService;
