const {Contact} = require('../service/schemas/contact');

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
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      });
    }
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
    if (result) {
      res.status(201).json(result);
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatusContact = async (req, res, next) => {
  const {contactId} = req.params;
  try {
    if (req.body === null) {
      res.status(400).json({message: 'missing field favorite'});
    }
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const {contactId} = req.params;
  try {
    const result = await Contact.findByIdAndRemove(contactId);
    if (result) {
      res.json({message: 'Delete success'});
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  updateStatusContact
};