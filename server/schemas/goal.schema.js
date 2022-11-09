const Joi = require('@hapi/joi');

module.exports = {
  retrieveAll: Joi.object({
    name: Joi.string().min(3).max(20).optional()
  }),
  checkId: Joi.object({
    id: Joi.number().integer().required()
  }),
  create: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(255).optional(),
    goal_reach_value: Joi.number().integer().required(),
    company_id: Joi.number().integer().required(),
  }),
  update: Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    description: Joi.string().max(255).optional(),
    goal_reach_value: Joi.number().integer().optional(),
  })
}