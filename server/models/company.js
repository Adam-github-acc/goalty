const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  retrieveAll: async (where) => {
    const response = {status: false};
    try {
      const dbResponse = await prisma.company.findMany({
        include: {
          owner: true,
          goals: true
        },
        where
      });
      if (dbResponse.length === 0) return response;
      response.data = dbResponse;
      response.status = true;
    } catch (err) {
      console.log('ERROR-CompanyModel-retrieveAll: ', err);
    }

    await prisma.$disconnect();

    return response;
  },

  retrieveOne: async (id) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.company.findUnique({
        where: {
          id
        },
        include: {
          owner: true,
          goals: true
        }
      });

      response.status = dbResponse !== null;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-CompanyModel-retrieveOne: ', err);
    }

    return response;
  },

  create: async (data) => {
    const response = { status: false };
    try {
      const company = await prisma.company.create({
        data,
        include: {
          owner: true,
          goals: true
        }
      });

      response.status = true;
      response.data = company;
    } catch (err) {
      console.log('ERROR-CompanyModel-create: ', err);
    }

    return response;
  },

  update: async (id, data) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.company.update({
        where: {
          id
        },
        data,
        include: {
          owner: true,
          goals: true
        }
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-CompanyModel-update: ', err);
    }

    return response;
  },

  delete: async (id) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.company.delete({
        where: {
          id
        }
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-CompanyModel-delete: ', err);
    }

    return response;
  },

  getGoals: async (id) => {
    const response = { status: false };

    try {
      const modelResponse = await this.retrieveOne(id);

      if (!modelResponse.status) throw new Error('Error retrieving company');
      
    } catch (err) {
      console.log('ERROR-CompanyModel-getGoals');
    }

    return response;
  }
}