
const config = require('./config/config');
const swaggerExpress = require('swagger-express-mw');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

const dotenv = require('dotenv');

/*
  Load environment variables from .env file, where API keys and passwords are configured.
*/
dotenv.load({path: '.env.config'}); // NB: add to .gitignore
console.log(process.env.MONGO_SECRET);

const appRoot = { appRoot: __dirname };
const app = express();

mongoose.connect(config.mongoUrl);

app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.set('json spaces', 2); // pretty print

// ES6 prefer-arrow-callback
swaggerExpress.create(appRoot, (err, swag) => {
  if (err) {
      throw err;
  }
  swag.register(app);
  const port = process.env.PORT || 3000;

  app.listen(port);
  if (swag.runner.swagger.paths['/hello']) {
    console.log(`try this:\ncurl http://127.0.0.1:${port}/hello?name=Scott`);
  }
});
module.exports = app; // for testing
