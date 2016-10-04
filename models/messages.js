// messages.js
// fields: name, description, partId, personId, latitude, longitude, image, category, altId
// schemas: (tbd) messages, tags

var config = require('../config/config');
var mongoose = require('mongoose');
Schema = mongoose.Schema;


var messageSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    partId: {
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
messageSchema.index({
  personId: 1
});
messageSchema.index({
  partId: 1
});
messageSchema.index({
  altId: 1
});

var Messages = mongoose.model('Messages', messageSchema);
module.exports = Messages;