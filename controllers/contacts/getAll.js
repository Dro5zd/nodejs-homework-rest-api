const {Contact} = require('../../service/schemas/contact');
const getAll = async (req, res) => {
    const {_id: owner} = req.user
    const result = await Contact.find({owner}, '-createdAt -updatedAt').populate('owner', 'email subscription');
    res.json(result);
};

module.exports = getAll
