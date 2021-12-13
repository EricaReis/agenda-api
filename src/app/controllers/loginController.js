const loginService = require('../services/loginService');
const Joi = require('joi');


const loginController = {
    async post(req, res) {
        try {
            const schema = Joi.object({
                email: Joi.string().email().max(100).required(),
                password: Joi.string().max(30).required(),
              });
            const {error} = await schema.validate(req.body);
            if (error) {
                return res.status(400).send({message: 'Email ou senha inválidos.', error: error.details});
            }
            const result = await loginService.post(req.body);
            return res.status(result.status).send(result.response);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    }
}

module.exports = loginController;