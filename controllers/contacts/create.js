const {Contact} = require('../../service/schemas/contact');
const create = async (req, res) => {
  const {_id: owner} = req.user
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

module.exports = create;