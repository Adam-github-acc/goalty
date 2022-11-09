const Joi = require('@hapi/joi');

module.exports = {
  retrieveAll: Joi.object({
    username: Joi.string().min(6).max(50).optional(),
    is_owner: Joi.bool().optional(),
  }),
  checkId: Joi.object({
    id: Joi.number().integer().required()
  }),
  create: Joi.object({
    username: Joi.string().min(6).max(50).required(),
    first_name: Joi.string().min(2).max(20).required(),
    last_name: Joi.string().min(2).max(29).required(),
    birth_date: Joi.date().required(),
    is_owner: Joi.bool().required()
  }),
  update: Joi.object({
    username: Joi.string().min(6).max(50).optional(),
    first_name: Joi.string().min(2).max(20).optional(),
    last_name: Joi.string().min(2).max(29).optional(),
  }),
}