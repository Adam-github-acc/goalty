const Joi = require('@hapi/joi');

module.exports = {
  retrieveAll: Joi.object({
    name: Joi.string().min(3).max(20).optional()
  }),
  checkId: Joi.object({
    id: Joi.number().integer().required()
  }),
  create: Joi.object({
    name: Joi.string().min(3).max(20).required(),
    description: Joi.string().max(255).required(),
    location: Joi.string().required(),
    user_id: Joi.number().integer().required(),
  }),
  update: Joi.object({
    name: Joi.string().min(3).max(20).optional(),
    description: Joi.string().max(255).optional(),
    user_id: Joi.number().integer().optional(),
  })
}