"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();
let transporter = nodemailer.createTransport({
  host: process.env.HOST,
  auth: {
    user: process.env.USER_ID,
    pass: process.env.USER_PASSWORD
  }
});

let send = async function(mailOptions, callback) {
  await transporter
    .sendMail(mailOptions)
    .then(result => {
      callback(result);
    })
    .catch(err => {
      callback(err);
    });
};

module.exports = send;
