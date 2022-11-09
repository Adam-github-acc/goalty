const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  retrieveAll: async () => {
    const response = {status: false};
    try {
      const dbResponse = await prisma.token.findMany();
      if (dbResponse.length === 0) return response;
      response.data = dbResponse;
      response.status = true;
    } catch (err) {
      console.log('ERROR-TokenModel-retrieveAll: ', err);
    }

    await prisma.$disconnect();

    return response;
  },

  retrieveOne: async (id) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.token.findUnique({
        where: {
          id
        }
      });

      response.status = dbResponse !== null;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-TokenModel-retrieveOne: ', err);
    }

    return response;
  },

  create: async (data) => {
    const response = { status: false };
    try {
      const token = await prisma.token.create({
        data,
      });

      response.status = true;
      response.data = token;
    } catch (err) {
      console.log('ERROR-TokenModel-create: ', err);
    }

    return response;
  },

  update: async (id, data) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.token.update({
        where: {
          id
        },
        data,
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-TokenModel-update: ', err);
    }

    return response;
  },

  delete: async (id) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.token.delete({
        where: {
          id
        }
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-TokenModel-delete: ', err);
    }

    return response;
  },

  retrieveByContent: async (content) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.token.findFirst({
        where: {
          content
        },
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-tokenModel-retrieveByContent: ', err);
    }

    return response;
  }
}