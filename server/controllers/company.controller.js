const statusCodes = require('../utils/server').status;
const model = require('../models/company');
const { initialResponse, removeSensitiveFields } = require('../utils/server');
const { sensitiveFields } = require('../utils/constants');


module.exports = {
  retrieveAll: async (req, res) => {
    const response = {...initialResponse};
    try {
      const modelResponse = await model.retrieveAll(req.query);
      if (modelResponse.status) {
        response.status = statusCodes.ok;
        response.message = 'Companies found!';

        modelResponse.data.map(el => ({...el, owner: removeSensitiveFields(el.owner, ...sensitiveFields.user)}));
        response.data = modelResponse.data;
      } else {
        response.status = statusCodes.notFound;
        response.message = 'No companies found.'
      }
    } catch (err) {
      console.log('ERROR-CompanyController-retrieveAll: ', err);
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
        response.message = 'Company found!';
        response.data = modelResponse.data;
      } else {
        response.status = statusCodes.notFound;
        response.message = 'Company not found.';
      }

    } catch (err) {
      console.log('ERROR-CompanyController-retrieveOne: ', err);
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
        response.message = 'Company created successfully!';
        response.data = modelResponse.data;
      }
    } catch (err) {
      console.log('ERROR-CompanyController-create: ', err);
    }

    res.status(response.status).send(response);
  },

  update: async (req, res) => {
    const response = {...initialResponse};
    try {
      const modelResponse = await model.update(Number(req.params.id), req.body);

      if (modelResponse && modelResponse.data) {
        response.status = statusCodes.ok;
        response.message = 'Company updated successfully!';
        response.data = modelResponse.data;
      } else {
        response.status = statusCodes.notFound;
        response.message = 'Company not found.';
      }
    } catch (err) {
      console.log('ERROR-CompanyController-update: ', err);
    }

    res.status(response.status).send(response);
  },

  delete: async (req, res) => {
    const response = { ...initialResponse };
    try {
      const modelResponse = await model.delete(Number(req.params.id));

      if (modelResponse.status && modelResponse.data) {
        response.status = statusCodes.noContent;
        response.message = 'Company deleted successfully!';
      } else {
        response.status = statusCodes.notFound;
        response.message = 'Company not found';
      }
    } catch (err) {
      console.log('ERROR-CompanyController-delete: ', err);
    }

    res.status(response.status).send(response);
  },

  getCompanyGoals: async (req, res) => {
    const response = { ...initialResponse };


    res.status(response.status).send(response);
  }

}