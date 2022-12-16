const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const {TokenExpiredError} = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({message: 'Unauthorized! Access Token was expired!'});
  }

  return res.sendStatus(401).send({message: 'Unauthorized!'});
}

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).send({message: 'No token provided!'});

  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) return catchError(error, res);

    req.userID = decoded.id;

    next();
  });
};

module.exports = {
  verifyToken,
};
