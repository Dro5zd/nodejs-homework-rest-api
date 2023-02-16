const {User} = require('../../service/schemas/user');
const {RequestError, sendEmail} = require("../../helpers");
require('dotenv').config()

const {BASE_URL} = process.env

const resendEmail = async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (!user || !user.verify) {
        throw RequestError(404, 'User not found');
    }

    const msg = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify your email</a>`,
    };
    await sendEmail(msg)
    if (user.verify === true) {
        res.status(400).json({
            message: "Verification has already been passed"
        });
    }
    res.status(200).json({
        message: "Verification email sent"
    });
};

module.exports = resendEmail;