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
  getPartsArray, addPart
};

function getPartsArray(req, res) {
  var thingId = req.swagger.params.thingId.value;
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
