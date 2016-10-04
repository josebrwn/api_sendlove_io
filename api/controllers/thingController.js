// thingController
'use strict';
var mongoose = require('mongoose');
var util = require('util');
//var bodyParser = require('body-parser');
var Things = require('../../models/things');

// Exports all the functions to perform on the db
module.exports = {
  getThing, getThingsArray, addThing
};

function renderOne (req, res, id, fieldlist) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404)
        .json("Oh noes! That doesn't appear to be a valid id.");
  }
  else {
    Things.findById(
      id
      , fieldlist 
      , function(err, obj) {
        if (err) throw err;
        if (obj) {
          console.log(obj);
          res.json(obj);
        }
        else {
          res.status(404)
            .json("Crikey! That doesn't appear to be a valid id.")
        }
      } 
    );
  }
}

function getThing(req, res) {
  var id = req.swagger.params.id.value; //req.swagger contains the path parameters
  renderOne(req, res, id, "'id name description thingId personId latitude longitude image category altId'");
}

/* getThingsArray will need many overrides: searching from the map, for a person, a cause, etc. */
function getThingsArray(req, res) {
  var personId = req.swagger.params.personId.value; //TODO: default to user's own Id.
  Things.find(
    {}
    , 'id name description thingId personId latitude longitude image category altId'
    , function(err, obj) {
      if (err) throw err;
      if (obj) {
        console.log(obj);
        res.json(obj);
      }
      else {
        res.status(404)
          .json("Crikey! That doesn't appear to be a valid id.")
      }
    } 
  );
}

function addThing (req, res) {
  Things.create(JSON.parse(req.body), function(err, obj) {
    if (err) throw err;
      if (obj) {
        console.log(obj);
        var id = obj._id;
        console.log("created thing id: " + id);
        res.json(obj);
      }
      else {
        res.status(500)
          .json("Weird Mongoose error, probably.")
      }
  });
}  

