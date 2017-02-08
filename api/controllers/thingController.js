// thingController
const mongoose = require('mongoose');
const Things = require('../../models/things');

// Exports all the functions to perform on the db
module.exports = {
  getThing, getThingsArray, addThing
};

/* *****************************************
  renderOne: returns a single thing from the API
***************************************** */
function renderOne (req, res, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404)
        .json(`Oh noes! That doesn't appear to be a valid id.`);
  } else {
    Things.aggregate(
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
          'person.email': 1,
          'person.profile.name': 1}}
      , function(err, obj) { // TODO prefer-arrow-callback
        if (err) throw err;
        if (obj) {
          // console.log(obj);
          res.json(obj);
        } else {
          res.status(404)
            .json(`Crikey! That doesn't appear to be a valid id.`);
        }
      }
    );
  }
}

/* *****************************************
  renderArray: returns an array of things from the API
***************************************** */
function renderArray (req, res, categoryVal) {
  // console.log(categoryVal);
  Things.aggregate(
    {$match: {category: {$regex: categoryVal}}},
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
        'person.email': 1,
        'person.profile.name': 1}},
      {$sort: {_id: 1}}
    // , fieldList
    , function(err, obj) {
      if (err) throw err;
      if (obj) {
        // console.log(obj);
        res.json(obj);
      } else {
        res.status(404)
          .json(`Crikey! I can't find a thing.`);
      }
    }
  ); // .sort({_id: 1}) TODO not needed?
}

/* *****************************************
  getThing: calls renderOne
***************************************** */
function getThing (req, res) {
  const id = req.swagger.params.id.value; // req.swagger contains the path parameters

  renderOne(req, res, id);
}


/* *****************************************
  getThingsArray: calls renderArray
  TODO allow searching for fields besides 'category'
***************************************** */
function getThingsArray (req, res) {
  var categoryVal;
  if (req.swagger.params.category.value !== undefined) {
    categoryVal = req.swagger.params.category.value.toString();
  }
  else {
    categoryVal = '';
  }
  renderArray(req, res, categoryVal);
}


/* *****************************************
  addThing: posts to API
***************************************** */
function addThing (req, res) {
  // console.log(req.body);
  // in express you must pass json, in curl you must pass a string. HACK
  try {
    // this only works in express
    var newThing = JSON.parse(req.body); // TODO no-var
  } catch (ex) {
    // this only works in curl
    var newThing = req.body;
    console.error('inner', ex.message);
  }

  Things.create (newThing, function(err, obj) {
    if (err) throw err;
      if (obj) {
        res.json(obj);
      } else {
        res.status(500)
          .json('This should not be happening.');
      }
  });
}
