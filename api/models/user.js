let mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

let UserCredentialSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true, unique: true },
  password: { type: String, default: "" }
});

let UserAddressSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  streetno: { type: String },
  houseno: { type: String },
  postcode: { type: String },
  city: { type: String },
  country: { type: String },
  telephone: { type: String }
});

let UserSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  gender: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  address: UserAddressSchema,
  credentials: UserCredentialSchema
});

// hash the password
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.credentials.password);
};

module.exports = mongoose.model("User", UserSchema);
