const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const current = require('./current');
const updateAvatar = require('./updateAvatar');
const verifyUser = require('./verifyUser');
const resendEmail = require('./resendEmail');

module.exports = {
  register,
  login,
  logout,
  current,
  updateAvatar,
  verifyUser,
  resendEmail
};