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

function renderOne (req, res, id, fieldList) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404)
        .json("Oh noes! That doesn't appear to be a valid id.");
  }
  else {
    Things.findById(
      id
      , fieldList 
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

function renderArray (req, res, queryParams, fieldList) {
  if (!true) {
      res.status(404)
        .json("Oh noes! That doesn't appear to be a valid search.");
  }
  else {
    // console.log(JSON.stringify(queryParams));
    Things.find(
      queryParams // build a query object e.g. {colName: {$in: arrayNames}}
      , fieldList 
      , function(err, obj) {
        if (err) throw err;
        if (obj) {
          // console.log(obj);
          res.json(obj);
        }
        else {
          res.status(404)
            .json("Crikey! I can't find a thing.")
        }
      } 
    ).sort( { _id: 1 } );
  }
}

function getThing(req, res) {
  var id = req.swagger.params.id.value; //req.swagger contains the path parameters
  renderOne(req, res, id, "'id name description thingId personId latitude longitude imagePath category altId'");
}

/* getThingsArray will need many flavors: searching from the map, for a person, a cause, etc. */
function getThingsArray(req, res) {
  if (req.swagger.params.category.value != undefined) { // TODO loop through each key and value in the querystring.
    var queryString = {};
    queryString['category'] = {'$regex' : req.swagger.params.category.value ,$options:'$i'}; 
    // console.log(queryString);    
  }
  renderArray(req, res, queryString, "'id name description thingId personId latitude longitude imagePath category altId'");
}

function addThing (req, res) {
  var newThing = JSON.parse(req.body); // TypeError 
  console.log(req.body);
  Things.create(newThing, function(err, obj) { 
    if (err) throw err;
      if (obj) {
        console.log(obj);
        var id = obj._id;
        res.json(obj);
      }
      else {
        res.status(500)
          .json("This should not be happening.")
      }
  });
}  

