const Group = require("../models/Group");
const result = require("../helper/result");

const groupService = {
  async post({ name, authenticatedUser }) {
    try {
      const { idUser } = authenticatedUser;
      const group = await Group.create({ name, user: { _id: idUser } });
      return result(group, "grupo cadastrado com sucesso.", 201);
    } catch (error) {
      throw new Error("erro ao cadastrar grupo");
    }
  },
  async put({ name, id }) {
    try {
      const group = await Group.findByIdAndUpdate(id, { name });
      return result(group, "grupo atualizado com sucesso.", 200);
    } catch (error) {
      throw new Error("erro ao atualizar grupo");
    }
  },
  async delete({ id }) {
    try {
      await Group.findByIdAndDelete(id);
      return result([], "grupo excluído com sucesso.", 204);
    } catch (error) {
      throw new Error("erro ao excluir grupo");
    }
  },
  async getOne({ id }) {
      try {
          const group = await Group.findById(id);
          return result(group, "grupo buscado com sucesso.", 200);
          
      } catch (error) {
        throw new Error('erro ao buscar grupo')  
      }
  },
  async getAll() {
      try {
          const groups = await Group.find();
          return result(groups, "grupo buscado com sucesso.", 200);
          
      } catch (error) {
        throw new Error('erro ao buscar grupo')  
      }
  },
};

module.exports = groupService;
