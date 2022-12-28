const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user?.accesToken) {
    return {
      'x-access-token': user.accessToken,
    };
  } else {
    return {};
  }
};

export default authHeader;
