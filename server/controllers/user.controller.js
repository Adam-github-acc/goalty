const statusCodes = require('../utils/server').status;
const model = require('../models/user');
const Token = require('./../models/token');
const GoalsUsers = require('../models/goalsusers');
const { initialResponse, removeSensitiveFields } = require('../utils/server');
const { sensitiveFields } = require('../utils/constants');
const { generateToken } = require('./../utils/jwt');


module.exports = {
  retrieveAll: async (req, res) => {
    const response = {...initialResponse};
    let modelResponse = await model.retrieveAll(req.query);
    try {
      if (modelResponse.status) {
        modelResponse.data = modelResponse.data.map(el => removeSensitiveFields(el, ...sensitiveFields.user));

        response.status = statusCodes.ok;
        response.message = 'Users found!';
        response.data = modelResponse.data;
      } else {
        response.status = statusCodes.notFound;
        response.message = 'No users found.'
      }
    } catch (err) {
      console.log('ERROR-UserController-retrieveAll: ', err);
      response.error = err;
    }

    res.status(response.status).send(response);
  },

  retrieveOne: async (req, res) => {
    const response = { ...initialResponse };
    try {
      const modelResponse = await model.retrieveOne(Number(req.params.id));

      if (modelResponse.status && modelResponse.data) {
        response.status = statusCodes.ok;
        response.message = 'User found!';
        response.data = modelResponse.data;
      } else {
        response.status = statusCodes.notFound;
        response.message = 'User not found.';
      }

    } catch (err) {
      console.log('ERROR-UserController-retrieveOne: ', err);
      response.error = err;
    }
    res.status(response.status).send(response);
  },

  create: async (req, res) => {
    const response = { ...initialResponse };
    try {
      const modelResponse = await model.create(req.body);
      if (modelResponse) {
        if (req.body.password) {
          response.token = generateToken({id: modelResponse.id});
          await Token.create({content: response.token});
        }
        response.status = statusCodes.created;
        response.message = 'User created successfully!';
        response.data = modelResponse.data;
      }
    } catch (err) {
      console.log('ERROR-UserController-create: ', err);
    }

    res.status(response.status).send(response);
  },

  update: async (req, res) => {
    const response = {...initialResponse};
    try {
      const modelResponse = await model.update(Number(req.params.id), req.body);

      if (modelResponse && modelResponse.data) {
        response.status = statusCodes.ok;
        response.message = 'User updated successfully!';
        response.data = modelResponse.data;
      } else {
        response.status = statusCodes.notFound;
        response.message = 'User not found.';
      }
    } catch (err) {
      console.log('ERROR-UserController-update: ', err);
    }

    res.status(response.status).send(response);
  },

  delete: async (req, res) => {
    const response = { ...initialResponse };
    try {
      const modelResponse = await model.delete(Number(req.params.id));

      if (modelResponse.status && modelResponse.data) {
        response.status = statusCodes.noContent;
        response.message = 'User deleted successfully!';
      } else {
        response.status = statusCodes.notFound;
        response.message = 'User not found';
      }
    } catch (err) {
      console.log('ERROR-UserController-delete: ', err);
    }

    res.status(response.status).send(response);
  },

  updateGoal: async (req, res) => {
    const response = {...initialResponse};
    let { goal_id, user_id } = req.params;
    goal_id = Number(goal_id);
    user_id = Number(user_id);

    try {
      const userGoal = await GoalsUsers.retrieveOne(goal_id, user_id);

      let modelResponse;

      if (!userGoal.status && userGoal.data === null) {
        modelResponse = await GoalsUsers.create({goal_id, user_id});

        if (!modelResponse.status) throw new Error('Error creating usergoal');
      } else {
        const updatedUserGoal = {
          progress: userGoal.data.progress + 1,
        };

        console.log(updatedUserGoal);
  
        modelResponse = await GoalsUsers.update(goal_id, user_id, updatedUserGoal);
  
        if (!modelResponse.status) throw new Error('Error updating usergoal');
      }

      response.status = statusCodes.ok;
      response.message = 'Goal updated to user successfully!';
      response.data = modelResponse.data;

    } catch (err) {
      console.log('ERROR-UserController-updateGoal: ', err);
    }

    res.status(response.status).send(response);
  },

  unsubscribeGoal: async (req, res) => {
    const response = {...initialResponse};
    let {goal_id, user_id} = req.params;
    goal_id = Number(goal_id);
    user_id = Number(user_id);

    try {
      const modelResponse = await GoalsUsers.delete(goal_id, user_id);

      if (!modelResponse.status) throw new Error('There was an error removing the goaluser');

      response.status = statusCodes.noContent;
      response.message = 'User unsubscribed from the goal successfully!';
    } catch (err) {
      console.log('ERROR-UserController-unsubscribeGoal: ', err);
    }

    res.status(response.status).send(response);
  }
}