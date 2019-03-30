const suspendRoute = require('express').Router();
const suspendController = require('./suspend.controller');

suspendRoute.route('/').post(suspendController.post);

module.exports = suspendRoute;
