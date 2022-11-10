const router = require('express').Router();
const controller = require('./../controllers/auth.controller');
const joiMiddleware = require('../middlewares/joi.middleware');
const schemas = require('../schemas/auth.schema');
const inputTypes = require('../utils/constants').inputTypes;
const authMiddleware = require('./../middlewares/auth.middleware');

router.post('/login', joiMiddleware(schemas.login, inputTypes.body), controller.login);
router.get('/profile', authMiddleware, controller.profile);

module.exports = router;