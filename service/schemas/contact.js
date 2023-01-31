const {Schema, model} = require('mongoose');

const Joi = require('joi');

// const {RequestError} = require('../../helpers');


const contact = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {versionKey: false, timestamps: true}
);

const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': `missing field favorite`
  })
})

const schemas = {
  addSchema,
  updateFavoriteSchema
}

const Contact = model('contact', contact);

module.exports = {
  Contact,
  schemas
};
