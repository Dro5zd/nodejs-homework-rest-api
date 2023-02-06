const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const {validateBody, authenticate} = require('../../middlewares')
const {schemas} = require('../../service/schemas/user')

const {ctrlWrapper} = require("../../helpers")

router.post('/users/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post('/users/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/users/logout', authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTBkZWJjYzEyYjE5ODU3YzY1MWQ2ZCIsImlhdCI6MTY3NTY4MTY1MSwiZXhwIjoxNjc1NzY4MDUxfQ.5VX6dxLGN7W6ETMG8TOcGceEByFwayrNX2BNxGxNmbI