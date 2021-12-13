const jwt = require('jsonwebtoken');

const secret = 'asdfghjkl';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send('O token não foi enviado');

  const parts = authorization.split(' ');

  if (!parts.length === 2) return res.status(401).send('Token inválido');

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send('Token mal-formado');

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).send('Token inválido');

    const { email, idUser } = decoded;

    req.authenticatedUser = { email, idUser };
    return next();
  });
};
