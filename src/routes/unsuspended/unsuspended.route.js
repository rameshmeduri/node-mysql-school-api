const unsuspendedRoute = require('express').Router();
const unsuspendedController = require('./unsuspended.controller');

unsuspendedRoute.route('/').post(unsuspendedController.post);

module.exports = unsuspendedRoute;
