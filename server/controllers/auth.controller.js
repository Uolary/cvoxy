const config = require('../config/auth.config');
const db = require('../models');
const {user: User, refreshToken: RefreshToken} = db;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signUp = (req, res) => {
  const {userName, email, password} = req.body;

  if (!userName || !email || !password) return res.status(500).send({
    message: 'userName, email or password not passed!',
  });

  const user = new User({
    userName,
    email,
    password: bcrypt.hashSync(password, 8),
  });

  user.save((error, user) => {
    if (error) return res.status(500).send({message: error});

    res.send({message: `User ${user.userName} was registered successfully`});
  });
};

const signIn = (req, res) => {
  const {userName, password} = req.body;

  if (!userName || !password) return res.status(500).send({
    message: 'userName or password not passed!',
  });

  User.findOne({
    userName,
  }).exec(async (error, user) => {
    if (error) return res.status(500).send({message: error});

    if (!user) return res.status(404).send({message: `User ${req.body.userName} not found.`});

    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );

    if (!passwordIsValid) return res.status(401).send({message: 'Invalid password!'});

    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      config.secret,
      {
        expiresIn: config.jwtExpiration,
      }
    );

    let refreshToken = await RefreshToken.createToken(user);

    res.send({
      id: user._id,
      userName: user.userName,
      email: user.email,
      accessToken,
      refreshToken,
    });
  });
};

const refreshToken = async (req, res) => {
  const {refreshToken: requestToken} = req.body;

  if (!requestToken) return res.status(403).json({message: 'Refresh token is required!'});

  try {
    const refreshToken = await RefreshToken.findOne({token: requestToken});

    if (!refreshToken) return res.status(403).json({message: 'Refresh token is not in database!'});

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(
        requestToken._id,
        {
          useFindAndModify: false,
        }
      ).exec();

      return res.status(401).send({
        message: 'Refresh token was expired. Please make a new signin request',
      });
    }

    const accessToken = jwt.sign(
      {
        id: refreshToken.user._id
      },
      config.secret,
      {
        expiresIn: config.jwtExpiration,
      }
    );

    res.send({
      accessToken,
      refreshToken: refreshToken.token,
    });
  } catch (error) {
    return res.status(500).send({message: error});
  }
};

const signOut = async (req, res) => {
  try {
    req.session = null;

    return res.send({message: 'You\'ve been signed out!'});
  } catch (error) {
    return res.status(500).send({message: error});
  }
};

module.exports = {
  signUp,
  signIn,
  refreshToken,
  signOut,
};
