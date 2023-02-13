const {User} = require('../../service/schemas/user');
const RequestError = require('../../helpers/RequestError');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const register = async (req, res, next) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (user) {
    throw RequestError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, {s: '200', d: 'robohash'}, false);
  const result = await User.create({email, password: hashPassword, avatarURL});
  res.status(201).json({
    email: result.email,
    subscription: result.subscription
  });
};

module.exports = register;