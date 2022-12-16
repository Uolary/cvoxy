const db = require('../models');
const User = db.user;

const checkDuplicateUserNameOrEmail = (req, res, next) => {
  User.findOne({
    userName: req.body.userName,
  }).exec((err, user) => {
    if (err) return res.status(500).send({message: err});

    if (user) {
      return res.status(400).send({message: 'Failed! Username is already in use!'});
    }

    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) return res.status(500).send({message: err});

      if (user) {
        return res.status(400).send({message: 'Failed! Email is already in use!'});
      }

      next();
    });
  });
};

module.exports = {
  checkDuplicateUserNameOrEmail,
};
