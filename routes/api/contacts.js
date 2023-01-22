const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../models/contacts');
const Joi = require('joi');

const {RequestError} = require('../../helpers');

const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
    .required(),

  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (e) {
    next(e);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw RequestError(404, 'Not found');
    }
    res.json(contact);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    console.log(error);
    if (error) {
      throw RequestError(400, error.message);
    }
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (e) {
    next(e);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const contacts = await removeContact(contactId);
    if (!contacts) {
      throw RequestError(404, 'Not found');
    }
    res.json({message: 'Contact deleted'});
  } catch (e) {
    next(e);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const {contactId} = req.params;
    const contact = await updateContact(contactId, req.body);
    if (!contact) {
      throw RequestError(404, 'Not found');
    }
    res.status(200).json(contact);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
