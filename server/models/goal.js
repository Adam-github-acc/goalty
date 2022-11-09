const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  retrieveAll: async (where) => {
    const response = {status: false};
    try {
      const dbResponse = await prisma.goal.findMany({
        include: {
          company: true,
          users: {
            orderBy: {
              created_at: 'desc'
            }
          },
        },
        where,
      });
      if (dbResponse.length === 0) return response;
      response.data = dbResponse;
      response.status = true;
    } catch (err) {
      console.log('ERROR-goalModel-retrieveAll: ', err);
    }

    await prisma.$disconnect();

    return response;
  },

  retrieveOne: async (id) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.goal.findUnique({
        where: {
          id
        },
        include: {
          company: true,
          users: true
        },
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-goalModel-retrieveOne: ', err);
    }

    return response;
  },

  create: async (data) => {
    const response = { status: false };
    try {
      const goal = await prisma.goal.create({
        data,
        include: {
          company: true,
          users: true
        },
      });

      response.status = true;
      response.data = goal;
    } catch (err) {
      console.log('ERROR-goalModel-create: ', err);
    }

    return response;
  },

  update: async (id, data) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.goal.update({
        where: {
          id
        },
        data,
        include: {
          company: true,
          users: true
        },
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-goalModel-update: ', err);
    }

    return response;
  },

  delete: async (id) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.goal.delete({
        where: {
          id
        },
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-goalModel-delete: ', err);
    }

    return response;
  }
}