module.exports = {
  inputTypes: {
    params: 'params',
    query: 'query',
    body: 'body',
  },

  sensitiveFields: {
    user: ['password', 'salt', 'id']
  }
};