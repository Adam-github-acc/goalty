module.exports = {
  status: {
    ok: 200,
    created: 201,
    noContent: 204,
    badRequest: 400,
    unAuthorized: 401,
    forbidden: 403,
    notFound: 404,
    serverError: 500
  },
  initialResponse: {
    status: 500,
    message: 'Internal server error.' 
  }
}