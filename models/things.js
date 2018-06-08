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
      required: false
    },
    description: {
      type: String,
      required: true
    },
    personId: {
      type: Schema.Types.ObjectId,
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
    thingType: {
      type: String,
      required: false
    },
    nValue: {
      type: Number,
      required: false
    },
    sValue: {
      type: String,
      required: false
    }
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
