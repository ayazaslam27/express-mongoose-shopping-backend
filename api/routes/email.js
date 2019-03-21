var express = require("express");
var router = express.Router();
var email = require("../../emails/email");
require("dotenv").config();
/* GET home page. */
router.post("/send", function(req, res, next) {
  // setup email data with unicode symbols
  let mailOptions = {
    from: "<test@test.de>", // sender address
    to: "test@test.de", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };

  let infoID = email(mailOptions, function(result) {
    console.log(result);

    res.status(200).json(result);
  });
});

module.exports = router;
