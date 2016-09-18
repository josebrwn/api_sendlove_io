// parts.js
// fields: name, description, thingId, personId, latitude, longitude, image, category, altId
// schemas: (tbd) messages, tags

var config = require('../config/config');
var mongoose = require('mongoose');
Schema = mongoose.Schema;


var partSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    thingId: {
      type: String,
      required: true
    },
    personId: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: false
    },
    longitude: {
      type: Number,
      required: false
    },
    image: {
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
    }
  }

  , {
    timestamps: true
  }

);
partSchema.index({
  personId: 1
});
partSchema.index({
  thingId: 1
});
partSchema.index({
  altId: 1
});

// the schema is useless so far
// we need to create a model using it
var Parts = mongoose.model('Parts', partSchema);
// make this available to our Node applications
module.exports = Parts;