// partController
'use strict';
var mongoose = require('mongoose');
var util = require('util');
// tbd
var bodyParser = require('body-parser');
//var Verify = require('./verify'); // TODO 

var Parts = require('../../models/parts');


// Exports all the functions to perform on the db
module.exports = {
  getPart, getPartsArray, addPart
};

function getPart(req, res) {
  var id = req.swagger.params.id.value; //req.swagger contains the path parameters
  if (!mongoose.Types.ObjectId.isValid(id)) throw Error("Oh noes! That doesn't appear to be a valid id.");
  Parts.findById(
    id
    , 'id name description thingId personId latitude longitude image category altId'
    , function(err, obj) {
      if (err) throw err;
      console.log(obj);
      res.json(obj); // this cast error crashes the server
    } 
  );
}

function getPartsArray(req, res) {
  var thingId = req.swagger.params.thingId.value;
  if (!mongoose.Types.ObjectId.isValid(thingId)) throw Error("Oh noes! That doesn't appear to be a valid id.");
  Parts.find(
    {
      $or:
      [
        {'thingId':thingId}
      ]    
    }
    , 'id name description thingId personId latitude longitude image category altId'
    , function(err, obj) {
      if (err) throw err;
      console.log(obj);
      res.json(obj);
    }
  );
}

function addPart (req, res) {
  Parts.create(req.body, function(err, obj) {
      if (err) throw err;
      var id = obj._id;
      console.log("created part id: " + id);
      res.json(obj);
  });
}  
