require('dotenv').config();

module.exports = {
  secret: process.env.AUTH_SECRET,
  jwtExpiration: 86400, // 24 hours
  jwtRefreshExpiration: 864000, // 10 days

  // for test
  // jwtExpiration: 60,          // 1 minute
  // jwtRefreshExpiration: 120,  // 2 minutes
};
