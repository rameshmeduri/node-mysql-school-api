const notificationsRoute = require('express').Router();
const notificationsController = require('./notifications.controller');

notificationsRoute.route('/').post(notificationsController.get);

module.exports = notificationsRoute;
