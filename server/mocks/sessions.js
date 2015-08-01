var authenticationStore = require('../utils/authentication-store');

module.exports = function(app) {
  var express = require('express');
  var sessionsRouter = express.Router();

  sessionsRouter.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var isAuthenticated = authenticationStore.authenticate(email, password, res);

    if (isAuthenticated) {
      res.send({token: 'secret-token'});
    } else {
      res.status(403).end();
    }
  });

  sessionsRouter.delete('/', function(req, res) {
    authenticationStore.expire(res);
    res.status(204).send({});
  });

  app.use('/api/sessions', sessionsRouter);
};
