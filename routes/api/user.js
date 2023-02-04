const express = require('express');
const router = express.Router();
const ctrlUser = require('../../controller');
const {validateBody} = require('../../middlewares')
const {schemas} = require('../../service/schemas/user')

router.post('/register',validateBody(schemas.registerSchema), ctrlUser.register);

router.post('/login',validateBody(schemas.loginSchema), ctrlUser.login);

module.exports = router;
