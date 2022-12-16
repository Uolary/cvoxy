const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signUp = (req, res) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((error, user) => {
    if (error) return res.status(500).send({message: error});

    res.send({message: `User ${user.userName} was registered successfully`});
  });
};

const signIn = (req, res) => {
  User.findOne({
    userName: req.body.userName,
  }).exec((error, user) => {
    if (error) return res.status(500).send({message: error});

    if (!user) return res.status(404).send({message: `User ${req.body.userName} not found.`});

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) return res.status(401).send({message: 'Invalid password!'});

    req.session.token = jwt.sign(
      {
        id: user.id,
      },
      config.secret,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res.status(200).send({
      id: user._id,
      username: user.userName,
      email: user.email,
    });
  });
};

const signOut = async (req, res) => {
  try {
    req.session = null;

    return res.send({message: 'You\'ve been signed out!'});
  } catch (error) {
    res.status(500).send({message: error});
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
};
