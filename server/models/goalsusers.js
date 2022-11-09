const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  create: async (data) => {
    const response = {status: false};

    try {
      const dbResponse = await prisma.goalsUsers.create({
        data,
        include: {
          user: true,
          goal: true,
        }
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-goalsusersModel-create: ', err)
    }

    return response;
  },

  retrieveOne: async (goal_id, user_id) => {
    const response = {status: false};

    try {
      const dbResponse = await prisma.goalsUsers.findFirst({
        where: {
          user_id,
          goal_id,
        },
        include: {
          goal: true,
          user: true
        }
      });

      response.status = dbResponse !== null;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-goalsusersModel-retrieveOne: ', err);
    }

    return response;
  },

  update: async (goal_id, user_id, data) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.goalsUsers.update({
        where: {
          goal_id_user_id: {
            goal_id,
            user_id
          }
        },
        include: {
          goal: true
        },
        data,
      });

      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-GoalsUsersModel-update: ', err);
    }

    return response;
  },

  delete: async (goal_id, user_id) => {
    const response = {status: false};

    try {
      const dbResponse = await prisma.goalsUsers.delete({
        where: {
          goal_id_user_id: {
            goal_id,
            user_id
          }
        }
      });

      response.status = dbResponse !== null;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-goalsusersModel-delete: ', err);
    }

    return response;
  }
}