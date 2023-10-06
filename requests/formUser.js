// validate using joi
const Joi = require('joi');
const express = require('express');

const validateFormUser = (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        // password: Joi.string().min(8).max(30).required(),
        // confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    }).options({ allowUnknown: true });
    const { error } = schema.validate(req.body);
    return error;
    // next();
}

module.exports = validateFormUser;