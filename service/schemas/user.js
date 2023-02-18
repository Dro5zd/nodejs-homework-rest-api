const {Schema, model} = require('mongoose');

const Joi = require('joi');

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/

const userSchema = new Schema(
    {
        email: {
            type: String,
            match: emailRegexp,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            minlength: 8,
            required: [true, 'Set password for user'],
        },
        subscription: {
            type: String,
            enum: ['starter', 'pro', 'business'],
            default: 'starter'
        },
        token: {
            type: String,
            default: ''
        },
        avatarURL: {
            type: String
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
            default: ''
        },
    },
    {versionKey: false, timestamps: true}
);

const registerSchema = Joi.object({
    email: Joi.string()
        .pattern(emailRegexp)
        .required().messages({
            'any.required': `missing required field email`
        }),
    password: Joi.string()
        .min(8)
        .required().messages({
            'any.required': `missing required field password`
        }),
    subscription: Joi.string(),
    token: Joi.string()
});

const loginSchema = Joi.object({
    email: Joi.string()
        .pattern(emailRegexp)
        .required().messages({
            'any.required': `missing required field email`
        }),
    password: Joi.string()
        .min(8)
        .required().messages({
            'any.required': `missing required field password`
        }),
    token: Joi.string()
});

const verifyEmailSchema = Joi.object({
    email: Joi.string()
        .pattern(emailRegexp)
        .required().messages({
            'any.required': `missing required field email`
        }),
});


const schemas = {
    registerSchema,
    loginSchema,
    verifyEmailSchema
};

const User = model('user', userSchema);

module.exports = {
    User,
    schemas
};
