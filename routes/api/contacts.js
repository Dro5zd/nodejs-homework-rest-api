const express = require('express');
const router = express.Router();
const {
    getAll,
    createContact,
    getById,
    remove,
    update,
    updateStatusContact
} = require('../../controllers/contacts');
const {validateBody, authenticate} = require('../../middlewares')
const {schemas} = require('../../service/schemas/contact')
const {ctrlWrapper} = require("../../helpers")

router.get('/', authenticate, ctrlWrapper(getAll));

router.get('/:contactId', authenticate, ctrlWrapper(getById));

router.post('/', authenticate, validateBody(schemas.addSchema), ctrlWrapper(createContact));

router.put('/:contactId', authenticate, validateBody(schemas.addSchema), ctrlWrapper(update));

router.patch('/:contactId/favorite', authenticate, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(updateStatusContact));

router.delete('/:contactId', authenticate, ctrlWrapper(remove));

module.exports = router;
