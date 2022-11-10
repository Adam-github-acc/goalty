const router = require('express').Router();
const controller = require('./../controllers/auth.controller');
const joiMiddleware = require('../middlewares/joi.middleware');
const schemas = require('../schemas/auth.schema');
const inputTypes = require('../utils/constants').inputTypes;

router.post('/login', joiMiddleware(schemas.login, inputTypes.body), controller.login);

module.exports = router;