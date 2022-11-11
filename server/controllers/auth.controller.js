const statusCodes = require('../utils/server').status;
const model = require('../models/auth');
const Token = require('../models/token');
const { sensitiveFields } = require('../utils/constants');
const { initialResponse, removeSensitiveFields } = require('../utils/server');
const { generateToken } = require('./../utils/jwt');

module.exports = {
  login: async (req, res) => {
    const response = {...initialResponse};
    try {
      const { username, password } = req.body;
      const modelResponse = await model.login(username, password);
      if (!modelResponse.status) {
        response.status = 400;
        response.message = 'Username or password not correct';
        throw new Error('Invalid credentials')
      }
      response.token = generateToken({id: modelResponse.data.id});
      response.data = removeSensitiveFields(modelResponse.data, ...sensitiveFields.user);
      await Token.create({content: response.token});
      response.status = statusCodes.ok;
      response.message = 'User logged in successfully!';
    } catch (err) {
      console.log('ERROR-AuthController-login: ', err);
    }

    res.status(response.status).send(response);
  },

  logout: async (req, res) => {
    const response = {...initialResponse};
    try {
      const modelResponse = await model.logout(req.token);
      if (modelResponse.status) {
        response.status = statusCodes.ok;
        response.message = 'User logged out successfully!';
      }
    } catch (err) {
      console.log('ERROR-AuthController-login: ', err);
    }

    res.status(response.status).send(response);
  },

  profile: (req, res) => {
    const response = {...initialResponse};

    try {
      response.data = removeSensitiveFields(req.user, ...sensitiveFields.user);
      response.status = statusCodes.ok;
      response.message = 'Profile retrieved successfully!';
    } catch (err) {
      console.log('ERROR-AuthController-profile', err);
    }

    res.status(response.status).send(response);
  }
}