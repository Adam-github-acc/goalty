const User = require('./../models/user');
const Token = require('./../models/token');
const { compare } = require('./../utils/password');

module.exports = {
  login: async (username, password) => {
    const response = {status: false};

    try {
      const modelResponse = await User.retrieveByUsername(username);

      if (modelResponse.status && compare(password, modelResponse.data.password)) return modelResponse;
    } catch (err) {
      console.log('ERROR-AuthModel-login: ', err);
    }

    return response;
  },

  logout: async (token) => {
    const response = {status: false};

    try {
      const modelRetrieveResponse = await Token.retrieveByContent(token);

      if (token.status && token.data) {
        const modelResponse = await Token.update(modelRetrieveResponse.data.id, {is_expired: true});

        response.status = modelResponse.status;
      }
    } catch (err) {
      console.log('ERROR-AuthModel-logout: ', err);
    }

    return response;
  }
}