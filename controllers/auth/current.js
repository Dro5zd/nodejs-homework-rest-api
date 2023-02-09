const {User} = require('../../service/schemas/user');
const current = async (req, res) => {
  const {_id} = req.user;
  const {email, subscription} = await User.findById(_id);
  res.status(200).json({email, subscription});
};

module.exports = current;