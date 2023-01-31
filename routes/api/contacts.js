const express = require('express');
const router = express.Router();
const ctrlContact = require('../../controller');
const {validateBody} = require('../../middlewares')
const {schemas} = require('../../service/schemas/contact')

router.get('/', ctrlContact.get);

router.get('/:contactId', ctrlContact.getById);

router.post('/', validateBody(schemas.addSchema), ctrlContact.create);

router.put('/:contactId', validateBody(schemas.addSchema), ctrlContact.update);

router.patch('/:contactId/favorite', validateBody(schemas.updateFavoriteSchema), ctrlContact.updateStatusContact);

router.delete('/:contactId', ctrlContact.remove);

module.exports = router;
