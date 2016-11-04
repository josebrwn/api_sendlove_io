// things.js
// fields: name, description, personId, latitude, longitude, image, category, altId
// schemas: parts (which have messages), tags

var config = require('../config/config');
var mongoose = require('mongoose');
// var partSchema = require('./parts');

Schema = mongoose.Schema;

var thingSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    personId: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    imagePath: {
      type: String,
      required: false
    },
    category: {
      type: String,
      required: false
    },
    altId: {
      type: String,
      required: false
    },
    // parts:[partSchema]
  }

  , {
    timestamps: true
  }

);
thingSchema.index({
  personId: 1
});
thingSchema.index({
  altId: 1
});


// the schema is useless so far
// we need to create a model using it
var Things = mongoose.model('Things', thingSchema);
// make this available to our Node applications
module.exports = Things;