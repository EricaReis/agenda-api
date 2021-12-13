const Contact = require("../models/Contact");
const result = require("../helper/result");

const contactService = {
  async post({ name, authenticatedUser, email, telephone, address, group }) {
    try {
      const { idUser } = authenticatedUser;
      const contact = await Contact.create({
        name,
        email,
        telephone,
        address,
        group,
        user: { _id: idUser },
      });
      return result(contact, "contato cadastrado com sucesso.", 200);
    } catch (error) {
      throw new Error("erro ao cadastrar contato");
    }
  },
  async put({ id, name, email, telephone, address, group }) {
    try {
      const contact = await Contact.findByIdAndUpdate(id, {
        name,
        email,
        telephone,
        address,
        group,
      });
      return result(contact, "contato atualizado com sucesso.", 200);
    } catch (error) {
      throw new Error("erro ao atualizar contato");
    }
  },
  async delete({ id }) {
    try {
      await Contact.findByIdAndDelete(id);
      return result([], "contato excluído com sucesso.", 204);
    } catch (error) {
      throw new Error("erro ao excluir contato");
    }
  },
  async getAll() {
    try {
      const contacts = await Contact.find();
      return result(contacts, "contato buscado com sucesso.", 200);
    } catch (error) {
      throw new Error("erro ao buscar contatos");
    }
  },
  async getOne({ id }) {
    try {
      const contact = await Contact.findById(id);
      return result(contact, "contato buscado com sucesso.", 200);
    } catch (error) {
      throw new Error("erro ao buxar contato");
    }
  },
};

module.exports = contactService;
