const jwt = require('jsonwebtoken');
const {RequestError} = require('../helpers');

const {SECRET_KEY} = process.env;

const {User} = require('../service/schemas/user');

const authenticate = async (req, res, next) => {
  try {
    const {authorization} = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw RequestError(401);
    }
    const {id} = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw RequestError(401);
    }
    req.user = user;
    next();
  } catch (e) {
    if (!e.status) {
      e.status = 401;
      e.message = 'Not authorized';
    }
    next(e);
  }
};

module.exports = authenticate;