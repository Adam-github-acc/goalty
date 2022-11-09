const statusCodes = require("../utils/server").status;
const Joi = require("@hapi/joi");

module.exports = (schema, inputValidation) => {
  return (req, res, next) => {
    const typeToObjToValidate = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const objToValidate = typeToObjToValidate[inputValidation];

    const result = schema.validate(objToValidate);

    if (result.error) {
      const responseObj = {
        status: statusCodes.badRequest,
        message: result.error.details.map((el) => el.message),
      };
      res.status(responseObj.status).send(responseObj);
    } else {
      next();
    }
  };
};
