require('dotenv').config()
const port = 3000;
const app = require('./index');
const mongoose_connection = require('./config/mongoose');

mongoose_connection(process.env.MONGO_CONNECTION);
app.listen(port, () => {console.log('Servidor rodando na porta', process.env.PORT || port)});