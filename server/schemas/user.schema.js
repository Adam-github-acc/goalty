const Joi = require('@hapi/joi');

module.exports = {
  retrieveAll: Joi.object({
    username: Joi.string().min(6).max(50).optional(),
    role: Joi.string().optional(),
  }),
  checkId: Joi.object({
    id: Joi.number().integer().required()
  }),
  create: Joi.object({
    username: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(8).max(50).optional(),
    first_name: Joi.string().min(2).max(20).required(),
    last_name: Joi.string().min(2).max(29).required(),
    role: Joi.string().required()
  }),
  update: Joi.object({
    username: Joi.string().min(6).max(50).optional(),
    first_name: Joi.string().min(2).max(20).optional(),
    last_name: Joi.string().min(2).max(29).optional(),
    password: Joi.string().min(8).max(50).optional(),
  }),
  userGoalsReqs: Joi.object({
    goal_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
  }),
}