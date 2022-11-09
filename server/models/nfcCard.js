const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  retrieveAll: async (where) => {
    const response = {status: false};
    try {
      const dbResponse = await prisma.nfcCard.findMany({
        include: {
          user: true
        },
        where
      });
      if (dbResponse.length === 0) return response;
      response.data = dbResponse;
      response.status = true;
    } catch (err) {
      console.log('ERROR-NfcCardModel-retrieveAll: ', err);
    }

    await prisma.$disconnect();

    return response;
  },

  retrieveOne: async (id) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.nfcCard.findUnique({
        where: {
          id
        },
        include: {
          user: true
        }
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-NfcCardModel-retrieveOne: ', err);
    }

    return response;
  },

  create: async (data) => {
    const response = { status: false };
    try {
      const nfcCard = await prisma.nfcCard.create({
        data,
        include: {
          user: true
        }
      });

      response.status = true;
      response.data = nfcCard;
    } catch (err) {
      console.log('ERROR-NfcCardModel-create: ', err);
    }

    return response;
  },

  update: async (id, data) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.nfcCard.update({
        where: {
          id
        },
        data,
        include: {
          user: true
        }
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-NfcCardModel-update: ', err);
    }

    return response;
  },

  delete: async (id) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.nfcCard.delete({
        where: {
          id
        }
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-NfcCardModel-delete: ', err);
    }

    return response;
  }
}