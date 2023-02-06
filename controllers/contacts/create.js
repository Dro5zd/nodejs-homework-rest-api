const {Contact} = require('../../service/schemas/contact');
const create = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = create;