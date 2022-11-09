const router = require('express').Router();
const controller = require('../controllers/company.controller');
const joiMiddleware = require('../middlewares/joi.middleware');
const schemas = require('../schemas/company.schema');
const inputTypes = require('../utils/constants').inputTypes;

router.get('',
  joiMiddleware(schemas.retrieveAll, inputTypes.query),
  controller.retrieveAll);

router.get('/:id',
  joiMiddleware(schemas.checkId, inputTypes.params),
  controller.retrieveOne);

router.post('',
  joiMiddleware(schemas.create, inputTypes.body),
  controller.create);

router.put('/:id',
  joiMiddleware(schemas.checkId, inputTypes.params),
  joiMiddleware(schemas.update, inputTypes.body),
  controller.update);

router.delete('/:id',
  joiMiddleware(schemas.checkId, inputTypes.params),
  controller.delete);

module.exports = router;