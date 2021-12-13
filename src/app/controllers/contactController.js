const contactService = require('../services/contactService');
const Joi = require('joi');


const contactController = {
    async post(req, res) {
        try {   
            const schema = Joi.object({
                    name: Joi.string().max(100).required(),
                    email: Joi.string().email().max(100),
                    telephone: Joi.array().items(
                        Joi.string()
                    ).required(),
                    address: Joi.array().items(
                        Joi.object({
                            zipcode: Joi.string().required(),
                            street: Joi.string().required(),
                            number: Joi.string().required(),
                            district: Joi.string().required(),
                            state: Joi.string().required(),
                            city: Joi.string().required(),
                            complement: Joi.string()
                        })
                    ),
                    group: Joi.string()
                });
            const {error} = await schema.validate(req.body);
            if (error) {
                return res.status(400).send({message: 'Dados incorretos.', error: error.details});
            }
            const result = await contactService.post({...req.body, authenticatedUser: req.authenticatedUser});
            return res.status(result.status).send(result.response);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    },
    async put(req, res) {
        try {
            const schema = Joi.object({
                name: Joi.string().max(100).required(),
                email: Joi.string().email().max(100),
                telephone: Joi.array().items(
                    Joi.string()
                ).required(),
                address: Joi.array().items(
                    Joi.object({
                        zipcode: Joi.string().required(),
                        street: Joi.string().required(),
                        number: Joi.string().required(),
                        district: Joi.string().required(),
                        state: Joi.string().required(),
                        city: Joi.string().required(),
                        complement: Joi.string()
                    })
                ),
                group: Joi.string(),
                id: Joi.string().required(),
            });
            const {error} = await schema.validate({...req.body, ...req.params});
            if (error) {
                return res.status(400).send({message: 'Erro ao atualizar contato.', error: error.details});
            }
            const result = await contactService.put({...req.body, ...req.params});
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
              });
            const {error} = await schema.validate(req.params);
            if (error) {
                return res.status(400).send({message: 'Erro ao excluir contato.', error: error.details});
            }
            const result = await contactService.delete(req.params);
            return res.status(result.status).send(result.response);   
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    },
    async getAll(req, res) {
        try {
            const result = await contactService.getAll({...req.query, authenticatedUser: req.authenticatedUser});
            return res.status(result.status).send(result.response);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    },
    async getOne(req, res) {
        try {
            const schema = Joi.object({
                id: Joi.string().required(),
              });
            const {error} = await schema.validate(req.params);
            if (error) {
                return res.status(400).send({message: 'Erro ao buscar contato.', error: error.details});
            }
            const result = await contactService.getOne({...req.params, authenticatedUser: req.authenticatedUser});
            return res.status(result.status).send(result.response);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    }
}

module.exports = contactController;
