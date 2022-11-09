const statusCodes = require('../utils/server').status;
const model = require('../models/goal');
const { initialResponse, removeSensitiveFields } = require('../utils/server');
const { sensitiveFields } = require('../utils/constants');


module.exports = {
  retrieveAll: async (req, res) => {
    const response = {...initialResponse};
    try {
      const modelResponse = await model.retrieveAll(req.query);
      if (modelResponse.status) {
        response.status = statusCodes.ok;
        response.message = 'Goals found!';
        response.data = modelResponse.data;

        modelResponse.data.map(el => el.users.map(el => removeSensitiveFields(el.user, ...sensitiveFields.user)));
      } else {
        response.status = statusCodes.notFound;
        response.message = 'No goals found.'
      }
    } catch (err) {
      console.log('ERROR-GoalController-retrieveAll: ', err);
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
        response.message = 'Goal found!';
        modelResponse.data.users = modelResponse.data.users.map(el => removeSensitiveFields(el.user,
          ...sensitiveFields.user));
        response.data = modelResponse.data;
      } else {
        response.status = statusCodes.notFound;
        response.message = 'Goal not found.';
      }

    } catch (err) {
      console.log('ERROR-GoalController-retrieveOne: ', err);
      response.error = err;
    }
    res.status(response.status).send(response);
  },

  create: async (req, res) => {
    const response = { ...initialResponse };
    try {
      const modelResponse = await model.create(req.body);
      if (modelResponse.status) {
        response.status = statusCodes.created;
        response.message = 'Goal created successfully!';
        response.data = modelResponse.data;
      }
    } catch (err) {
      console.log('ERROR-GoalController-create: ', err);
    }

    res.status(response.status).send(response);
  },

  update: async (req, res) => {
    const response = {...initialResponse};
    try {
      const modelResponse = await model.update(Number(req.params.id), req.body);

      if (modelResponse && modelResponse.data) {
        response.status = statusCodes.ok;
        response.message = 'Goal updated successfully!';
        response.data = modelResponse.data;
      } else {
        response.status = statusCodes.notFound;
        response.message = 'Goal not found.';
      }
    } catch (err) {
      console.log('ERROR-GoalController-update: ', err);
    }

    res.status(response.status).send(response);
  },

  delete: async (req, res) => {
    const response = { ...initialResponse };
    try {
      const modelResponse = await model.delete(Number(req.params.id));

      if (modelResponse.status && modelResponse.data) {
        response.status = statusCodes.noContent;
        response.message = 'Goal deleted successfully!';
      } else {
        response.status = statusCodes.notFound;
        response.message = 'Goal not found';
      }
    } catch (err) {
      console.log('ERROR-GoalController-delete: ', err);
    }

    res.status(response.status).send(response);
  }

}