const groupService = require('../services/groupService');
const Joi = require('joi');


const groupController = {
    async post(req, res) {
        try {
            const schema = Joi.object({
                name: Joi.string().max(100).required(),
              });
            const {error} = await schema.validate(req.body);
            if (error) {
                return res.status(400).send({message: 'Dados incorretos.', error: error.details});
            }
            const result = await groupService.post({...req.body, authenticatedUser: req.authenticatedUser});
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
                id: Joi.string().required(),
              });
            const {error} = await schema.validate({...req.body, ...req.params});
            if (error) {
                return res.status(400).send({message: 'Erro ao atualizar grupo.', error: error.details});
            }
            const result = await groupService.put({...req.body, ...req.params});
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
                return res.status(400).send({message: 'Erro ao excluir grupo.', error: error.details});
            }
            const result = await groupService.delete(req.params);
            return res.status(result.status).send(result.response);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    },
    async getAll(req, res) {
        try {
            const result = await groupService.getAll({...req.query, authenticatedUser: req.authenticatedUser});
            return res.status(result.status).send(result.response);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    },
    async getOne(req, res) {
        try {
            const schema = Joi.object({
                id: Joi.string(),
              });
            const {error} = await schema.validate(req.params);
            if (error) {
                return res.status(400).send({message: 'Erro ao buscar grupo.', error: error.details});
            }
            const result = await groupService.getOne({...req.params, authenticatedUser: req.authenticatedUser});
            return res.status(result.status).send(result.response);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    }
}

module.exports = groupController;