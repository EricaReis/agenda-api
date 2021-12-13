const routes = require('express').Router();
const loginController = require('../controllers/loginController');

routes.post('/login', loginController.post);

module.exports = routes;