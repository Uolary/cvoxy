const verifySignUp = require('../middlewares/verifySignUp');
const authController = require('../controllers/auth.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, Accept'
    );

    next();
  });

  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateUserNameOrEmail,
    ],
    authController.signUp
  );

  app.post('/api/auth/signin', authController.signIn);

  app.post('/api/auth/signout', authController.signOut);
};
