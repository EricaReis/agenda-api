const express = require('express');
const pingRoute = require('./app/routes/pingRoute');
const loginRoute = require('./app/routes/loginRoute');
const groupRoute = require('./app/routes/groupRoute');
const contactRoute = require('./app/routes/contactRoute');
const addressRoute = require('./app/routes/addressRoute');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({extended: true}));
  }

  routes() {
    this.server.use(pingRoute);
    this.server.use(loginRoute);
    this.server.use(groupRoute);
    this.server.use(contactRoute);
    this.server.use(addressRoute);
  }
}

module.exports = new App().server;