const fs = require('fs/promises');
const path = require('path');
const Jimp = require("jimp");
const {User} = require('../../service/schemas/user');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file

    const extension = originalname.split('.').pop()
    const filename = `${_id}.${extension}`

    const resultUpload = path.join(avatarsDir, filename)

    await fs.rename(tempUpload, resultUpload)

    Jimp.read(resultUpload)
        .then((avatar) => {
            return avatar.resize(256, 256).write(resultUpload) // resize
        })
        .catch((err) => {
            console.error(err);
        });

    const avatarURL = path.join('avatars', filename)

    await User.findByIdAndUpdate(_id, {avatarURL})
    res.json({
        avatarURL
    });
};

module.exports = updateAvatar;