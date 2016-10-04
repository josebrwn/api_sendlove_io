'use strict';

var SwaggerExpress = require('swagger-express-mw');

var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json({strict:false}))
// strict:false gets: An error occured with status code 500: Cannot use 'in' operator to search for '_id' in { "name": "hello, world!", "description": "first workout", "personId": "57bc9f71cf9c78642abfe952", "latitude": 33, "longitude": 112, "image": "sendlove.io/images/my_workout.jpg", "category": "running", "altId": "0"}

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
