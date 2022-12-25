const authJwt = require('../middlewares/authJwt');
const educationController = require('../controllers/education.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, Accept'
    );

    next();
  });

  app.post('/api/user/:userId/education', [authJwt.verifyToken], educationController.createOrEditEducationItem);
  app.delete('/api/user/:userId/education', [authJwt.verifyToken], educationController.deleteEducationItem);
};
