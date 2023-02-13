const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const {validateBody, authenticate, upload} = require('../../middlewares')
const {schemas} = require('../../service/schemas/user')

const {ctrlWrapper} = require("../../helpers")

router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.get('/current', authenticate, ctrlWrapper(ctrl.current));

router.patch('/avatars', authenticate, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;

