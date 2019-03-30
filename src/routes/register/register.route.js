const registerRoute = require('express').Router();
const registerController = require('./register.controller');

registerRoute.route('/').post(registerController.register);

module.exports = registerRoute;
