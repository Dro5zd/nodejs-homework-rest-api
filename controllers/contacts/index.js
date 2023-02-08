const getAll = require('./getAll');
const getById = require('./getById');
const createContact = require('./createContact');
const remove = require('./remove');
const update = require('./update');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  getAll,
  getById,
  createContact,
  remove,
  update,
  updateStatusContact
};