const {User} = require('../../service/schemas/user');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid')
const {sendEmail, RequestError} = require("../../helpers");
require('dotenv').config()

const {BASE_URL} = process.env
const register = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (user) {
    throw RequestError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, {s: '200', d: 'robohash'}, false);
  const verificationToken = uuidv4()
  const result = await User.create({email, password: hashPassword, avatarURL, verificationToken});

  const msg = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(msg)

  res.status(201).json({
    email: result.email,
    subscription: result.subscription
  });
};

module.exports = register;