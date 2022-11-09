const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  retrieveAll: async (where) => {
    const response = {status: false};
    try {
      const dbResponse = await prisma.user.findMany({
        include: {
          nfc_cards: true,
          goals: true,
          company: true
        },
        where
      });
      if (dbResponse.length === 0) return response;
      response.data = dbResponse;
      response.status = true;
    } catch (err) {
      console.log('ERROR-userModel-retrieveAll: ', err);
    }

    await prisma.$disconnect();

    return response;
  },

  retrieveOne: async (id) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.user.findUnique({
        where: {
          id
        },
        include: {
          nfc_cards: true,
          goals: true,
          company: true
        },
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-userModel-retrieveOne: ', err);
    }

    return response;
  },

  create: async (data) => {
    const response = { status: false };
    try {
      const user = await prisma.user.create({
        data,
        include: {
          nfc_cards: true,
          goals: true,
          company: true
        },
      });

      response.status = true;
      response.data = user;
    } catch (err) {
      console.log('ERROR-userModel-create: ', err);
    }

    return response;
  },

  update: async (id, data) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.user.update({
        where: {
          id
        },
        data,
        include: {
          nfc_cards: true,
          goals: true,
          company: true
        },
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-userModel-update: ', err);
    }

    return response;
  },

  delete: async (id) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.user.delete({
        where: {
          id
        }
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-userModel-delete: ', err);
    }

    return response;
  }
}