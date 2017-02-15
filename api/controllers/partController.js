'use strict';

var mongoose = require('mongoose');
var util = require('util');
// tbd
// var bodyParser = require('body-parser');
// var Verify = require('./verify'); // TODO

var Parts = require('../../models/parts');

// Exports all the functions to perform on the db
module.exports = {
  getPart, getPartsArray, addPart
};

/* *****************************************
  renderOne gets a single part
***************************************** */
function renderOne (req, res, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404)
        .json("Oh noes! That doesn't appear to be a valid id.");
  }
  else {
    Parts.aggregate(
      // id,
      {$match: {_id: new mongoose.Types.ObjectId(id)}},
      {$lookup: {
        from: 'users',
        localField: 'personId',
        foreignField: '_id',
        as: 'person'
      }},
      {$project: {
          _id: 1,
          name: 1,
          description: 1,
          thingId: 1,
          personId: 1,
          latitude: 1,
          longitude: 1,
          imagePath: 1,
          category: 1,
          altId: 1,
          updatedAt: 1,
          createdAt: 1,
          partType: 1,
          nValue: 1,
          'person.email': 1,
          'person.profile.name': 1}}
      , function(err, obj) {
        if (err) throw err;
        if (obj) {
          //console.log(obj);
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

/* *****************************************
  renderArray gets an array of parts
***************************************** */
function renderArray (req, res, thingId, personId, partType) {
  var matchThingId;
  var matchPartType;
  var matchPersonId;

  if (!true) {
      res.status(404)
        .json("Oh noes! That doesn't appear to be a valid search.");
  }
  else {
    // thing is just required here, for sanity and safety sake.
    matchThingId = {$match: {thingId: new mongoose.Types.ObjectId(thingId)}};

    if (partType !== '') {
      matchPartType = {$match: {partType: partType}};
    }
    if (personId !== '') {
      matchPersonId = {$match: {personId: new mongoose.Types.ObjectId(personId)}};
    }
    else {
      matchPersonId = {$match: {personId: {$ne: ''}}}; // HACK trivially true.
    }

    Parts.aggregate(
      matchThingId,
      matchPartType,
      matchPersonId,
      {$lookup: {
        from: 'users',
        localField: 'personId',
        foreignField: '_id',
        as: 'person'
      }},
      {$project: {
          _id: 1,
          name: 1,
          description: 1,
          thingId: 1,
          personId: 1,
          latitude: 1,
          longitude: 1,
          imagePath: 1,
          category: 1,
          altId: 1,
          updatedAt: 1,
          createdAt: 1,
          partType: 1,
          nValue: 1,
          'person.email': 1,
          'person.profile.name': 1}},
        {$sort: {_id: 1}}
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
    );
  }
}

/* *****************************************
  getPart calls renderOne
***************************************** */
function getPart(req, res) {
  const id = req.swagger.params.id.value; // req.swagger contains the path parameters

  // console.log(queryString);
  renderOne(req, res, id);
}

/* *****************************************
  getPartsArray calls renderArray
***************************************** */
function getPartsArray(req, res) {
  let thingId = '';
  let personId = '';
  let partType = '';

  if (req.swagger.params.thingId.value != undefined) {
    thingId = req.swagger.params.thingId.value;
  }
  if (req.swagger.params.personId.value != undefined) {
    personId = req.swagger.params.personId.value;
  }
  if (req.swagger.params.partType.value != undefined) {
    partType = req.swagger.params.partType.value;
  }
  //console.log(queryString);
  renderArray(req, res, thingId, personId, partType);
}

/* *****************************************
  POST /part
***************************************** */
function addPart (req, res) {
  // console.log('I am posting a detail and the body is: ');
  console.log(req.body);
  // console.log('that was the body');
  // in express you must pass json, in curl you must pass a string. HACK
  try {
    // this only works in express
    var newPart = JSON.parse(req.body);
  }
  catch (ex) {
    // this only works in curl
    var newPart = req.body;
    console.error("inner", ex.message);
  }
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
