const {Contact} = require('../../service/schemas/contact');
const RequestError = require('../../helpers/RequestError');
const remove = async (req, res) => {
  const {contactId} = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404, 'Not found');
  }
  res.json({message: 'Delete success'});
};

module.exports = remove;