//Require Mongoose
var mongoose = require("mongoose");

var BrandSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  Name: { type: String, required: true, unique: true },
  icon: { type: String }
});

var CategorySchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  Name: { type: String, required: true, unique: true },
  icon: { type: String },
  Brands: [BrandSchema]
});

module.exports = mongoose.model("category", CategorySchema);
