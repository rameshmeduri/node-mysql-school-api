const commonStudentsRoute = require('express').Router();
const commonStudentsController = require('./commonstudents.controller');

commonStudentsRoute.route('/').get(commonStudentsController.get);

module.exports = commonStudentsRoute;
