const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { genPasswordAndSalt } = require('./../utils/password');

module.exports = {
  retrieveAll: async (where) => {
    const response = {status: false};
    try {
      const dbResponse = await prisma.user.findMany({
        include: {
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
          goals: {
            include: {
              goal: {
                include: {
                  company: true
                }
              }
            }
          },
          company: {
            include: {
              goals: true
            }
          }
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
    if (data.password) {
      data = {
        ...data,
        ...await genPasswordAndSalt(data.password)
      }
    }

    try {
      const user = await prisma.user.create({
        data,
        include: {
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
  },

  retrieveByUsername: async (username) => {
    const response = { status: false };
    try {
      const dbResponse = await prisma.user.findFirst({
        where: {
          username
        },
        include: {
          company: {
            include: {
              goals: true
            }
          },
          goals: {
            include: {
              goal: true
            }
          }
        }
      });

      response.status = dbResponse !== null;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-userModel-retrieveByUsername: ', err);
    }

    return response;
  },

  updateGoalInUser: async (user_id, goal_id) => {
    const response = { status: false };

    try {
      let dbResponse = await prisma.goalsUsers.findFirst({
        where: {
          user_id,
          goal_id
        }
      });

      if (!dbResponse) {
        dbResponse = await prisma.goalsUsers.create({
          data
        });
      } else {

      }
      response.status = true;
      response.data = dbResponse;
    } catch (err) {
      console.log('ERROR-userModel-updateGoalInUser: ', err);
    }

    return response;
  }
}