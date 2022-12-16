const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) return res.status(403).send({message: 'No token provided!'});

  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) return res.status(401).send({message: 'Unauthorized'});

    req.userID = decoded.id;

    next();
  });
};

module.exports = {
  verifyToken,
};
