const Joi = require('@hapi/joi');

module.exports = {
  retrieveAll: Joi.object({
    user_id: Joi.number().integer().optional(),
    nfc_uid: Joi.string().max(255).min(6).optional(), // PARA OBTENER TARJETA ESCPECIFICA
  }),
  checkId: Joi.object({
    id: Joi.number().integer().required()
  }),
  create: Joi.object({
    nfc_uid: Joi.string().max(255).min(6).required(),
    user_id: Joi.number().integer().required()
  }),
  update: Joi.object({
    nfc_uid: Joi.string().max(255).min(6).optional(),
    user_id: Joi.number().integer().optional()
  })
}