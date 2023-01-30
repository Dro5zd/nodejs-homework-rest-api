const Contact = require('./schemas/contact');
const getContacts = async () => {
  return Contact.find();
};
const getContactById = async (id) => {
  return Contact.findOne(id);
};
const addContact = async (body) => {
  return Contact.create({body});
};
const removeContact = async (id) => {
  return Contact.findByIdAndDelete(id);
};
const updateContact = async (id, body) => {
return Contact.findByIdAndUpdate(id, body)
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
