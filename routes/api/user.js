const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const {validateBody} = require('../../middlewares')
const {schemas} = require('../../service/schemas/user')

const {ctrlWrapper} = require("../../helpers")

router.post('/users/register',validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post('/users/login',validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
