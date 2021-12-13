const routes = require('express').Router();
const auth = require('../middlewares/auth');
const addressController = require('../controllers/addressController');

routes.post('/address', auth, addressController.post);
routes.put('/address/:id', auth, addressController.put);
routes.delete('/address/:id', auth, addressController.delete);

module.exports = routes;