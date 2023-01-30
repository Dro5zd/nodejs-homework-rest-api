const {Schema, model} = require('mongoose');

// const Joi = require('joi');
//
// const {RequestError} = require('../../helpers');
//
// const addSchema = Joi.object({
//   name: Joi.string()
//     .min(3)
//     .max(30)
//     .required(),
//
//   email: Joi.string()
//     .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
//     .required(),
//
//   phone: Joi.string().required(),
// });

const contact = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {versionKey: false, timestamps: true}
);

const Contact = model('contact', contact);

module.exports = Contact;
