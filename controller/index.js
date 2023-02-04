const {Contact} = require('../service/schemas/contact');
const {User} = require('../service/schemas/user');
const bcrypt = require('bcryptjs');
const RequestError = require('../helpers/RequestError');

const register = async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if (user) {
      throw RequestError(409, 'Email in use');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({email, password: hashPassword});
    res.status(201).json({email: result.email, subscription: result.subscription});
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const login = async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      throw RequestError(401, 'Email or password is wrong');
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw RequestError(401, 'Email or password is wrong');
    }
    const token = 'iuybfekfegjnb.wefwhfekjhfh';
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription
      }
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const {contactId} = req.params;
  try {
    const result = await Contact.findById(contactId);
    if (!result) {
      throw RequestError(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const {name, email, phone} = req.body;
  try {
    const result = await Contact.create({name, email, phone});
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const {contactId} = req.params;
  try {
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw RequestError(404, 'Not found');
    }
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatusContact = async (req, res, next) => {
  const {contactId} = req.params;
  try {
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw RequestError(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const {contactId} = req.params;
  try {
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw RequestError(404, 'Not found');
    }
    res.json({message: 'Delete success'});
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  register,
  login,
  get,
  getById,
  create,
  remove,
  update,
  updateStatusContact
};