const {Contact} = require('../../service/schemas/contact');
const getAll = async (req, res) => {
    const {_id: owner} = req.user
    let {page = 1, limit = 20, favorite} = req.query;

    limit = +limit > 20 ? 20 : +limit;
    const skip = +page > 1 ? +limit * (+page - 1) : 0;

    let sortByFavorite;
    switch (favorite) {
        case true:
            sortByFavorite = {favorite: -1};
            break;
        case false:
            sortByFavorite = {favorite: 1};
            break;
        default:
            sortByFavorite = {};
            break;
    }

    const contacts = await Contact.find({owner}, '-createdAt -updatedAt')
        .populate('owner', 'email subscription')
        .skip(skip)
        .limit(limit)
        .sort(sortByFavorite);

    res.json({contacts, page: +page, limit});
};

module.exports = getAll
