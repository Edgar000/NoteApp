var express = require('express');
var router = express.Router();

//Get home page
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('notecollection');
  collection.find({},{},function(e,docs) {
    res.render('index', {
      title: 'Main',
      "notelist" : docs
    });
  });
});

// Add note
router.post('/addnote', function(req, res) {

  // Set internal DB variable
  var db = req.db;

  // Get our form values.
  var userName = req.body.username;
  var userNote = req.body.usernote;

  // Set collection
  var collection = db.get('notecollection');

  // Submit to the DB
  collection.insert({
    "username" : userName,
    "usernote" : userNote
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // And forward to success page
      res.redirect("/");
    }
  });
});

//notelist
router.get('/notelist', function(req, res) {
  var db = req.db;
  var collection = db.get('notecollection');
  collection.find({},{},function(e,docs){
    res.render('notelist', {
      "notelist" : docs
    });
  });
});

module.exports = router;
