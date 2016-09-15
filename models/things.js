// things.js

// fields: name, description, ownerId, latitude, longitude // tbd: image, category
// schemas: parts (which have messages), tags

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

Schema = mongoose.Schema;



var thingSchema=new Schema( {
    name: {
        type: String, required: true
    }
    , description: {
        type: String, required: true
    }
    , ownerId: {
        type: Number, required: true
    }
    , latitude: {
        type: Number, required: true
    }
    , longitude: {
        type: Number, required: true
    }
}

, {
    timestamps: true
}

);
// the schema is useless so far
// we need to create a model using it
var Things=mongoose.model('Things', thingSchema);
// make this available to our Node applications
module.exports=Things;