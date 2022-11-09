const Joi = require('@hapi/joi');

module.exports = {
  login: Joi.object({
    username: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(8).max(50).required(),
  }),
}