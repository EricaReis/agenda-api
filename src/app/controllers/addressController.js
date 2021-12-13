const addressService = require('../services/addressService');
const Joi = require('joi');


const addressController = {
    async post(req, res) {
        try {   
            const schema = Joi.object({
                zipcode: Joi.string().required(),
                street: Joi.string().required(),
                number: Joi.string().required(),
                district: Joi.string().required(),
                state: Joi.string().required(),
                city: Joi.string().required(),
                complement: Joi.string(),
                contactId: Joi.string().required(),
            })
            const {error} = await schema.validate(req.body);
            if (error) {
                return res.status(400).send({message: 'Dados incorretos.', error: error.details});
            }
            const result = await addressService.post({...req.body, authenticatedUser: req.authenticatedUser});
            return res.status(result.status).send(result.response);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    },
    async put(req, res) {
        try {
            const schema = Joi.object({
                zipcode: Joi.string().required(),
                street: Joi.string().required(),
                number: Joi.string().required(),
                district: Joi.string().required(),
                state: Joi.string().required(),
                city: Joi.string().required(),
                complement: Joi.string(),
                contactId: Joi.string().required(),
                id: Joi.string().required(),
            })
            const {error} = await schema.validate({...req.body, ...req.params});
            if (error) {
                return res.status(400).send({message: 'Erro ao atualizar endereço.', error: error.details});
            }
            const result = await addressService.put({...req.body, ...req.params});
            return res.status(result.status).send(result.response);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    },
    async delete(req, res) {
        try {
            const schema = Joi.object({
                id: Joi.string().required(),
                contactId: Joi.string().required()
              });
            const {error} = await schema.validate({...req.body, ...req.params });
            if (error) {
                return res.status(400).send({message: 'Erro ao excluir endereço.', error: error.details});
            }
            const result = await addressService.delete({...req.body, ...req.params });
            return res.status(result.status).send(result.response);   
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    }
}

module.exports = addressController;
