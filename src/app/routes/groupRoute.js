const routes = require('express').Router();
const auth = require('../middlewares/auth');
const groupController = require('../controllers/groupController');

routes.post('/group', auth, groupController.post);
routes.get('/group', auth, groupController.getAll);
routes.get('/group/:id', auth, groupController.getOne);
routes.put('/group/:id', auth, groupController.put);
routes.delete('/group/:id', auth, groupController.delete);

module.exports = routes;