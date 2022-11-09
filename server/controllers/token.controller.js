const statusCodes = require('../utils/server').status;
const model = require('../models/db/token');
const { initialResponse } = require('../utils/server');


module.exports = {
  retrieveAll: async (req, res) => {
    const response = {...initialResponse};
    try {
      const modelResponse = await model.retrieveAll(req.query);
      if (modelResponse.status) {
        response.status = statusCodes.ok;
        response.message = 'Tokens found!';
        response.data = modelResponse.data;
      } else {
        response.status = statusCodes.notFound;
        response.message = 'No tokens found.'
      }
    } catch (err) {
      console.log('ERROR-TokenController-retrieveAll: ', err);
      response.error = err;
    }

    res.status(response.status).send(response);
  },

  retrieveOne: async (req, res) => {
    const response = { ...initialResponse };
    try {
      const modelResponse = await model.retrieveOne(Number(req.params.id));

      if (modelResponse.status && modelResponse.data) {
        response.status = statusCodes.ok;
        response.message = 'Token found!';
        response.data = modelResponse.data;
      } else {
        response.status = statusCodes.notFound;
        response.message = 'Token not found.';
      }

    } catch (err) {
      console.log('ERROR-TokenController-retrieveOne: ', err);
      response.error = err;
    }
    res.status(response.status).send(response);
  },

  create: async (req, res) => {
    const response = { ...initialResponse };
    try {
      const modelResponse = await model.create(req.body);
      if (modelResponse) {
        response.status = statusCodes.created;
        response.message = 'Token created successfully!';
        response.data = modelResponse.data;
      }
    } catch (err) {
      console.log('ERROR-TokenController-create: ', err);
    }

    res.status(response.status).send(response);
  },

  update: async (req, res) => {
    const response = {...initialResponse};
    try {
      const modelResponse = await model.update(Number(req.params.id), req.body);

      if (modelResponse && modelResponse.data) {
        response.status = statusCodes.ok;
        response.message = 'Token updated successfully!';
        response.data = modelResponse.data;
      } else {
        response.status = statusCodes.notFound;
        response.message = 'Token not found.';
      }
    } catch (err) {
      console.log('ERROR-TokenController-update: ', err);
    }

    res.status(response.status).send(response);
  },

  delete: async (req, res) => {
    const response = { ...initialResponse };
    try {
      const modelResponse = await model.delete(Number(req.params.id));

      if (modelResponse.status && modelResponse.data) {
        response.status = statusCodes.noContent;
        response.message = 'Token deleted successfully!';
      } else {
        response.status = statusCodes.notFound;
        response.message = 'Token not found';
      }
    } catch (err) {
      console.log('ERROR-TokenController-delete: ', err);
    }

    res.status(response.status).send(response);
  }

}