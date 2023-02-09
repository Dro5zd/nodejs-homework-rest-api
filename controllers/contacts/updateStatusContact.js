const {Contact} = require('../../service/schemas/contact');
const RequestError = require('../../helpers/RequestError');
const updateStatusContact = async (req, res, next) => {
  const {contactId} = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    throw RequestError(404, 'Not found');
  }
  res.status(200).json(result);
};

module.exports = updateStatusContact;