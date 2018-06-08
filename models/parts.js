// parts.js
// fields: name, description, thingId, personId, latitude, longitude, image, category, altId
// schemas: (tbd) messages, tags

var config = require('../config/config');
var mongoose = require('mongoose');
Schema = mongoose.Schema;


var partSchema = new Schema({
    name: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    thingId: {
      type: Schema.Types.ObjectId,
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
    partType: {
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
