const Contact = require("../models/Contact");
const result = require("../helper/result");

const addressService = {
  async post(data) {
    try {
      const { contactId, authenticatedUser, ...address } = data;
      const contact = await Contact.findById(contactId);
      contact.address.push(address);
      await contact.save();
      return result(contact, "endereço cadastrado com sucesso.", 200);
    } catch (error) {
      throw new Error("erro ao adicionar endereço");
    }
  },
  async put(data) {
    try {
      const { id, contactId, authenticatedUser, ...address } = data;

      await Contact.updateOne(
        { "address._id": id },
        {
          $set: {
            "address.$.zipcode": address.zipcode,
            "address.$.street": address.street,
            "address.$.number": address.number,
            "address.$.district": address.district,
            "address.$.state": address.state,
            "address.$.city": address.city,
            "address.$.complement": address.complement,
          },
        }
      );
      const updatedContact = await Contact.findById(contactId);
      return result(updatedContact, "endereço atualizado com sucesso.", 200);
    } catch (error) {
      throw new Error("contact not found");
    }
  },
  async delete({ id, contactId }) {
    try {
      const contact = await Contact.findById(contactId);
      contact.address.pull({ _id: id });
      await contact.save();
      return result([], "endereço excluído com sucesso.", 204);
    } catch (error) {
      throw new Error("contact not found");
    }
  },
};

module.exports = addressService;
