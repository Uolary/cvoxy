import api from "./api";
import tokenService from "./tokenService";

const setupInterceptors = () => {
  api.interceptors.request.use(
    (config) => {
      const token = tokenService.getLocalAccessToken();

      if (token) {
        config.headers['x-access-token'] = token;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  api.interceptors.request.use(
    (res) => res,
    async (error) => {
      const originalConfig = error.config;

      if (originalConfig.url !== '/auth/signin' && error.response) {
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await api.post(
              '/auth/refreshtoken',
              {
                refreshToken: tokenService.getLocalRefreshToken(),
              }
            );

            const {accessToken} = rs.data;

            tokenService.updateLocalAccessToken(accessToken);

            return api(originalConfig);
          } catch (err) {
            return Promise.reject(err);
          }
        }
      }

      return Promise.reject(error);
    }
  )
};

export default setupInterceptors;
