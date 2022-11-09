const Joi = require('@hapi/joi');

module.exports = {
  checkId: Joi.object({
    id: Joi.number().integer().required()
  }),
  create: Joi.object({
    content: Joi.string().required(),
  }),
  update: Joi.object({
    content: Joi.string().required(),
  })
}