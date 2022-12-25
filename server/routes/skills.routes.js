const authJwt = require('../middlewares/authJwt');
const skillsController = require('../controllers/skills.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, Accept'
    );

    next();
  });

  app.post('/api/user/:userId/skills', [authJwt.verifyToken], skillsController.createOrEditSkillItem);
  app.delete('/api/user/:userId/skills', [authJwt.verifyToken], skillsController.deleteSkillItem);
  app.get('/api/user/:userId/skills', [authJwt.verifyToken], skillsController.getSkillsData);
};
