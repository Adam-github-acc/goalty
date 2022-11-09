const { getIdFromToken } = require('jsonwebtoken');
const { initialResponse, status } = require('./../utils/server');
const User = require('./../models/user');

module.exports = async (req, res) => {
  const response = { ...initialResponse };
  const getUserIdFromToken = () => {
    try {
      const authHeader = req.get('authorization');
      if (!authHeader) throw new Error('No token!');
      const token = authHeader.split(' ')[1];
      req.token = token;

      return getIdFromToken(token);
    } catch (err) {
      console.log('ERROR IN AUTHMIDDLEWARE->getUserIdFromToken', err);
      response.status = status.unAuthorized;
      response.message = 'Unauthorized';

      res.status(response.status).send(response);
    }
  }

  const userId = getUserIdFromToken();

  try {
    const user = await User.retrieveOne(userId);

    if (!user) throw new Error('User not found / Invalid token');

    req.user = user;
    next();
  } catch (err) {
    console.log('ERROR IN AUTHMIDDLEWARE', err);
    response.status = status.unAuthorized;
    response.message = 'Unauthorized';

    res.status(response.status).send(response);
  }
}