const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const {validateBody, authenticate} = require('../../middlewares')
const {schemas} = require('../../service/schemas/user')

const {ctrlWrapper} = require("../../helpers")

router.post('/users/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post('/users/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/users/logout', authenticate, ctrlWrapper(ctrl.logout));

router.get('/users/current', authenticate, ctrlWrapper(ctrl.current));

module.exports = router;

