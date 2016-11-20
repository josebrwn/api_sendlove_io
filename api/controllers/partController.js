// partController
'use strict';
var mongoose = require('mongoose');
var util = require('util');
// tbd
//var bodyParser = require('body-parser');
//var Verify = require('./verify'); // TODO 

var Parts = require('../../models/parts');


// Exports all the functions to perform on the db
module.exports = {
  getPart, getPartsArray, addPart
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

function renderArray (req, res, queryParams, fieldList) {
  if (!true) {
      res.status(404)
        .json("Oh noes! That doesn't appear to be a valid search.");
  }
  else {
    // console.log(JSON.stringify(queryParams));
    // KLUDGE - just need one record if the intention has been liked and don't need anything if personId is not present
    if (queryParams['partType'] != "like") {
      //console.log("partType != like");
      Parts.find(
        queryParams // build a query object e.g. {colName: {$in: arrayNames}}
        , fieldList 
        , function(err, obj) {
          if (err) throw err;
          if (obj) {
            console.log(obj);
            res.json(obj);
          }
          else {
            res.status(404)
              .json("Crikey! I can't find a thing.")
          }
        } 
      ).sort( { _id: 1 } );      
    } // default 
    else {
      //console.log('partType = like, attempting to validate personId');
      //console.log(queryParams['personId']);
      if (mongoose.Types.ObjectId.isValid(queryParams['personId'])) { // TODO validate all the other inputs and verify the API doesn't crash.
        Parts.find(
          queryParams // build a query object e.g. {colName: {$in: arrayNames}}
          , fieldList 
          , function(err, obj) {
            if (err) throw err;
            if (obj) {
              console.log(obj);
              res.json(obj);
            }
            else {
              res.status(404)
                .json("Crikey! I can't find a thing.") // TODO just return an empty 200
            }
          } 
        ).sort( { _id: 1 } ).limit(1);      
      } // like
      else {
        console.log('the personId is not valid');
        res.status(200)
          .json([])
      }
    }
  }
}

/*
  get a part by id
*/
function getPart(req, res) {
  var id = req.swagger.params.id.value; //req.swagger contains the path parameters
  renderOne(req, res, id, "'id name description thingId personId latitude longitude image category altId partType nValue sValue'");
}

/*
  get an array of parts, by thingId
*/
function getPartsArray(req, res) {
  var queryString = {};
  if (req.swagger.params.thingId.value != undefined) { 
    queryString['thingId'] = req.swagger.params.thingId.value; 
  }
  if (req.swagger.params.personId.value != undefined ) { 
    if (mongoose.Types.ObjectId.isValid(req.swagger.params.personId.value)) {
      queryString['personId'] = req.swagger.params.personId.value; 
    }
  }
  if (req.swagger.params.partType.value != undefined) { 
    queryString['partType'] = req.swagger.params.partType.value; 
  }
  console.log(queryString)
  renderArray(req, res, queryString, "'id name description thingId personId latitude longitude imagePath category altId partType nValue sValue'");
}

function addPart (req, res) {
  console.log('add part');
  var newPart = JSON.parse(req.body); 
  console.log(req.body);
  Parts.create(newPart, function(err, obj) { 
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
