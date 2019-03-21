var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var utils = require("../../utils");
var Order = require("../models/order");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.post("/", [jsonParser, utils.ensureToken], function(req, res, next) {
  res.status(200).json({
    showPaymentOptions: true
  });
});

router.post("/placeOrder", [jsonParser, utils.ensureToken], function(
  req,
  res,
  next
) {
  let recievedData = req.body;

  const newOrder = Order({
    _id: new mongoose.Types.ObjectId(),
    create_time: recievedData.create_time,
    payer_id: recievedData.payer_id,
    order_id_global: recievedData.order_id_global,
    status: recievedData.status,
    update_time: recievedData.update_time,

    payee: recievedData.payee,
    total_amount: recievedData.total_amount,
    purchase_products: recievedData.purchase_products
  });

  newOrder
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

module.exports = router;
