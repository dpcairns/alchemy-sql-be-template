const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET || 'CHANGEMENOW';

module.exports = {
  sign(profile) {
    return jwt.sign({ id: profile.id }, APP_SECRET);
  },
  verify(token) {
    return jwt.verify(token, APP_SECRET);
  }
};
