//Require Mongoose
var mongoose = require("mongoose");

var ProductSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  brand: String,
  category: String,
  articleNumber: Number,
  rating: Number,
  title: String,
  thumbnail: String,
  description: String,
  price: Number,
  oldPrice: Number,
  imgSource: String,
  imageUrls: [
    {
      imageUrl: String
    }
  ],
  technical_details: {
    Herstellernummer: String,
    EANNumber: String,
    Processor: {
      TurboBoost: String,
      Cache: String,
      Type: String
    },
    Display: {
      Size: String,
      Resolution: String,
      Art: String,
      LED: Boolean,
      HDTV: String
    },
    Ram: {
      Size: String,
      Technology: String
    },
    HardDisk: {
      Size: String,
      Typ: String,
      Format: String
    }
  }
});

module.exports = mongoose.model("Product", ProductSchema);
