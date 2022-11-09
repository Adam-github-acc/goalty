const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'Hi reader :)';

module.exports = {
  generateToken: (obj) => jwt.sign(obj, SECRET_KEY),
  getIdFromToken: (token) => jwt.verify(token, SECRET_KEY).id,
}