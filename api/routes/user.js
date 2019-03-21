var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../models/user");

var bodyParser = require("body-parser");
var jwtGenerator = require("../../token-generator");
var options = require("../../jwt-token-option");
// create application/json parser
var jsonParser = bodyParser.json();

router.post("/register", jsonParser, function(req, res, next) {
  let recievedData = req.body;
  const newUser = User({
    _id: new mongoose.Types.ObjectId(),
    gender: recievedData.genderSelect.text,
    firstname: recievedData.firstname,
    lastname: recievedData.lastname,
    email: recievedData.email,
    address: {
      _id: new mongoose.Types.ObjectId(),
      streetno: recievedData.streetno,
      houseno: recievedData.houseno,
      postcode: recievedData.postcode,
      city: recievedData.city,
      country: recievedData.country,
      telephone: recievedData.telephone
    },
    credentials: {
      _id: new mongoose.Types.ObjectId(),
      username: recievedData.username,
      password: ""
    }
  });

  newUser.credentials.password = newUser.generateHash(recievedData.password);

  newUser
    .save()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/login", jsonParser, function(req, res, next) {
  let recievedData = req.body;
  User.findOne({ "credentials.username": recievedData.username })
    .exec()
    .then(user => {
      if (!user.validPassword(recievedData.password)) {
        res.status(200).json({
          success: false,
          message: "Password incorrect!"
        });
      } else {
        var payload = {
          user: user.firstname + " " + user.lastname
        };
        options.audience = recievedData.audience;
        var token = jwtGenerator.sign(payload, options);
        res.status(200).json({
          user: {
            name: user.firstname + " " + user.lastname,
            address: user.address
          },
          success: true,
          token: token
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
