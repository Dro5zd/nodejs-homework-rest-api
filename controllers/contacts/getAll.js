const {Contact} = require('../../service/schemas/contact');
const getAll = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};

module.exports = getAll
