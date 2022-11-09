const statusCodes = require('../utils/server').status;
const model = require('../models/auth');
const Token = require('../models/token');
const { initialResponse } = require('../utils/server');
const { generateToken } = require('./../utils/jwt');

module.exports = {
  login: async (req, res) => {
    const response = {...initialResponse};
    try {
      const { username, password } = req.body;
      const modelResponse = await model.login(username, password);
      if (modelResponse.status) {
        response.token = generateToken({id: modelResponse.data.id});
        await Token.create({content: response.token});
        response.status = statusCodes.ok;
        response.message = 'User logged in successfully!';
        response.data = modelResponse.data;
      }
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
  }
}