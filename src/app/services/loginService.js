const jwt = require('jsonwebtoken');
const secret = 'asdfghjkl';
const User = require('../models/User');
const result = require('../helper/result');

const loginService = {
    async post({email, password}) {
        const user = await User.findOne({email, password});
        if (!user._id) {
            return result([], 'Usuário não encontrado.', 400);
        }
        const idUser = user._id;
        const token = jwt.sign({ email, idUser }, secret, { expiresIn: 86400 });
        const data = {token};
        return result( data , 'Login efetuado com sucesso.', 200);
    }
}

module.exports = loginService;