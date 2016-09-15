// thingController
'use strict';
var mongoose = require('mongoose');
var util = require('util');
// tbd
var bodyParser = require('body-parser');
var Verify = require('verify');

var Things = require('../../models/things');


// Exports all the functions to perform on the db
module.exports = {
  getThingsArray, addThing
};

function getThingsArray(req, res) {
  var latitude = req.swagger.params.latitude.value || 34.0522
  var longitude = req.swagger.params.longitude.value || 118.2437;
  
  var things = []; 
  
  //testing
  var obj = [{id: "4567467467", name: "hello, world!", description: "first workout", ownerId: "345636", latitude: latitude, longitude: longitude },{id: "45646786", name: "hello, world, again!", description: "second workout", ownerId: "3546365", latitude: latitude, longitude: longitude }];
  for(var i in obj){
    things.push(obj[i])
  }
  
  res.json(things);
}
/*
{
  "name": "hello, world!",
  "description": "first workout",
  "ownerId": 1,
  "latitude": 1,
  "longitude": 1
}
*/
function addThing (req, res) {
  //testing
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var name = req.body.name;
  var description = req.body.description;
  var ownerId = req.body.ownerId;
  
  Things.create(req.body, function(err, obj) {
      if (err) throw err;
      var id = obj._id;
      console.log("created thing id: " + id);
      res.json(obj);
  });
  
  // testing
  // var id = ""; // set this from the returned object
  // var obj = {id: id, name: name, description: description, ownerId: ownerId, latitude: latitude, longitude: longitude };
  // res.json(obj);
  
  
   
}