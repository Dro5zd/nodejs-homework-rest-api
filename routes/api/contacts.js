const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const {validateBody, authenticate} = require('../../middlewares')
const {schemas} = require('../../service/schemas/contact')
const {ctrlWrapper} = require("../../helpers")

router.get('/', authenticate, ctrlWrapper(ctrl.get));

router.get('/:contactId', authenticate, ctrlWrapper(ctrl.getById));

router.post('/', authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.create));

router.put('/:contactId', authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.update));

router.patch('/:contactId/favorite', authenticate, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact));

router.delete('/:contactId', authenticate, ctrlWrapper(ctrl.remove));

module.exports = router;
