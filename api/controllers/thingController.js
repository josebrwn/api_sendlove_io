// thingController
'use strict';
var mongoose = require('mongoose');
var util = require('util');
// tbd
var bodyParser = require('body-parser');
//var Verify = require('./verify'); // TODO 

var Things = require('../../models/things');


// Exports all the functions to perform on the db
module.exports = {
  getThing, getThingsArray, addThing
};

function getThing(req, res, next) {
  var id = req.swagger.params.id.value; //req.swagger contains the path parameters
  Things.findById(
    {'_id': id}
    , 'id name description thingId personId latitude longitude image category altId parts'
    , function(err, obj) {
      if (err) throw err;
      console.log(obj);
      res.json(obj); // this cast error crashes the server
    } 
  );
}

function getThingsArray(req, res) {
  var personId = req.swagger.params.personId.value; //TODO: default to user's own Id.
  
  // do location searches on mapthings collection
  // var latitude = req.swagger.params.latitude.value || 34.0522;
  // var longitude = req.swagger.params.longitude.value || 118.2437;

  Things.find(
    {
      //$or:[ 
        //{'personId':personId}
        
        //, $near: {
        //  $geometry: {
        //    type: "Point" ,
        //    coordinates: [ 34, 118 ]
        //  }
        //}
      //]
    }
    , 'id name description thingId personId latitude longitude image category altId', function(err, obj) {
      if (err) throw err;
      console.log(obj);
      res.json(obj);
    } 
  );
}

  // testing
  // var latitude = req.swagger.params.latitude.value || 34.0522
  // var longitude = req.swagger.params.longitude.value || 118.2437;
  // var things = []; 
  // var obj = [{id: "4567467467", name: "hello, world!", description: "first workout", personId: "345636", latitude: latitude, longitude: longitude },{id: "45646786", name: "hello, world, again!", description: "second workout", personId: "3546365", latitude: latitude, longitude: longitude }];
  // for(var i in obj){
  //   things.push(obj[i])
  // }
  // res.json(things);
/*
{
  "name": "hello, world!",
  "description": "first workout",
  "personId": '1dfh565jty45565',
  "latitude": 1,
  "longitude": 1
}
*/
function addThing (req, res) {
  Things.create(req.body, function(err, obj) {
      if (err) throw err;
      var id = obj._id;
      console.log("created thing id: " + id);
      res.json(obj);
  });
}  
  //testing
  // var latitude = req.body.latitude;
  // var longitude = req.body.longitude;
  // var name = req.body.name;
  // var description = req.body.description;
  // var personId = req.body.personId;
  
  // testing
  // var id = ""; // set this from the returned object
  // var obj = {id: id, name: name, description: description, personId: personId, latitude: latitude, longitude: longitude };
  // res.json(obj);
