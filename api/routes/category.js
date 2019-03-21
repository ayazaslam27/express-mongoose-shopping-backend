var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var categories = require("../models/category");

/* GET home page. */
router.get("/getCategories", function(req, res, next) {
  console.log(
    categories
      .find()
      .exec()
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      })
  );
});

router.post("/postCategories", function(req, res, next) {
  const newCategory = categories({
    _id: new mongoose.Types.ObjectId(),
    Name: "Mobiles",
    icon: "fas fa-mobile",
    Brands: [
      {
        _id: new mongoose.Types.ObjectId(),
        Name: "Samsung",
        icon: "fas fa-mobile"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        Name: "Iphones",
        icon: "fas fa-mobile"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        Name: "Huawei",
        icon: "fas fa-mobile"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        Name: "Windows",
        icon: "fas fa-mobile"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        Name: "LG",
        icon: "fas fa-mobile"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        Name: "Xiamoi",
        icon: "fas fa-mobile"
      }
    ]
  });

  newCategory
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
