const routes = require('express').Router();
const auth = require('../middlewares/auth');
const contactController = require('../controllers/contactController');

routes.post('/contact', auth, contactController.post);
routes.put('/contact/:id', auth, contactController.put);
routes.delete('/contact/:id', auth, contactController.delete);
routes.get('/contact/:id', auth, contactController.getOne);
routes.get('/contact', auth, contactController.getAll);

module.exports = routes;