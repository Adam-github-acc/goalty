const statusCodes = require('../utils/server').status;
const model = require('../models/db/user');
const { initialResponse } = require('../utils/server');


module.exports = {
  retrieveAll: async (req, res) => {
    const response = {...initialResponse};
    try {
      const modelResponse = await model.retrieveAll(req.query);
      if (modelResponse.status) {
        response.status = statusCodes.ok;
        response.message = 'Users found!';
        response.data = modelResponse.data;
      } else {
        response.status = statusCodes.notFound;
        response.message = 'No users found.'
      }
    } catch (err) {
      console.log('ERROR-UserController-retrieveAll: ', err);
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
        response.message = 'User found!';
        response.data = modelResponse.data;
      } else {
        response.status = statusCodes.notFound;
        response.message = 'User not found.';
      }

    } catch (err) {
      console.log('ERROR-UserController-retrieveOne: ', err);
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
        response.message = 'User created successfully!';
        response.data = modelResponse.data;
      }
    } catch (err) {
      console.log('ERROR-UserController-create: ', err);
    }

    res.status(response.status).send(response);
  },

  update: async (req, res) => {
    const response = {...initialResponse};
    try {
      const modelResponse = await model.update(Number(req.params.id), req.body);

      if (modelResponse && modelResponse.data) {
        response.status = statusCodes.ok;
        response.message = 'User updated successfully!';
        response.data = modelResponse.data;
      } else {
        response.status = statusCodes.notFound;
        response.message = 'User not found.';
      }
    } catch (err) {
      console.log('ERROR-UserController-update: ', err);
    }

    res.status(response.status).send(response);
  },

  delete: async (req, res) => {
    const response = { ...initialResponse };
    try {
      const modelResponse = await model.delete(Number(req.params.id));

      if (modelResponse.status && modelResponse.data) {
        response.status = statusCodes.noContent;
        response.message = 'User deleted successfully!';
      } else {
        response.status = statusCodes.notFound;
        response.message = 'User not found';
      }
    } catch (err) {
      console.log('ERROR-UserController-delete: ', err);
    }

    res.status(response.status).send(response);
  }

}