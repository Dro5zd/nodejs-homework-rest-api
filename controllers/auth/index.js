const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const current = require('./current');
const updateAvatar = require('./updateAvatar');

module.exports = {
  register,
  login,
  logout,
  current,
  updateAvatar
};