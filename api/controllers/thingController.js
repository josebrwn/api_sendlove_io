// thingController
'use strict';
var mongoose = require('mongoose');
var Things = require('../../models/things');
var util = require('util');

// see if we need these
// var bodyParser = require('body-parser');
// var Verify = require('./verify');

module.exports = {
  getThings: getThings
};

function getThings(req, res) {
  var latitude = req.swagger.params.latitude.value || 34.0522
  var longitude = req.swagger.params.longitude.value || 118.2437;
  
  //testing
  var things = []; 
  var obj = [{id: 1, name: "hello, world!", description: "first workout", ownerId: 1, latitude: latitude, longitude: longitude },{id: 2, name: "hello, world, again!", description: "second workout", ownerId: 1, latitude: latitude, longitude: longitude }];
  for(var i in obj){
    things.push(obj[i])
  }
  
  // this sends back a JSON response which is a single string
  res.json(things).pretty;
}