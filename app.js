'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var mongoose = require('mongoose');
var config = require('./config/config');
mongoose.connect(config.mongoUrl);

app.set('json spaces', 2); // pretty print
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 3000;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
