const statusCodes = require('../utils/server').status;
const Joi = require('@hapi/joi');

module.exports = (schema, inputValidation) => {
    return (req, res, next) => {
        let objToValidate = {};

        switch (inputValidation) {
            case 'body':
                objToValidate = req.body;
                break;
            case 'params':
                objToValidate = req.params;
                break;
            case 'query':
                objToValidate = req.query;    
                break;
            default:
                objToValidate = {};
                break;
        }

        const result = schema.validate(objToValidate);

        if (result.error) {
            const responseObj = { 
                status: statusCodes.badRequest,
                message: result.error.details.map((el => el.message))
            };
            res.status(responseObj.status).send(responseObj);
        } else {
            next();
        }
    };
};