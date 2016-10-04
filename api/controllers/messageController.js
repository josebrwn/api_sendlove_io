// messageController
'use strict';
var mongoose = require('mongoose');
var util = require('util');
// tbd
//var bodyParser = require('body-parser');
//var Verify = require('./verify'); // TODO 

var Messages = require('../../models/messages');


// Exports all the functions to perform on the db
module.exports = {
  getMessage, getMessagesArray, addMessage
};


function getMessage(req, res) {
  var id = req.swagger.params.id.value; //req.swagger contains the path parameters
  if (!mongoose.Types.ObjectId.isValid(id)) throw Error("Oh noes! That doesn't appear to be a valid id.");
  Messages.findById(
    id
    , 'id name description thingId personId latitude longitude image category altId'
    , function(err, obj) {
      if (err) throw err;
      console.log(obj);
      res.json(obj); // this cast error crashes the server
    } 
  );
}

function getMessagesArray(req, res) {
  var partId = req.swagger.params.partId.value;
  if (!mongoose.Types.ObjectId.isValid(partId)) throw Error("Oh noes! That doesn't appear to be a valid id.");
  Messages.find(
    {
      $or:
      [
        {'partId':partId}
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

function addMessage (req, res) {
  Messages.create(req.body, function(err, obj) {
      if (err) throw err;
      var id = obj._id;
      console.log("created part id: " + id);
      res.json(obj);
  });
}  
