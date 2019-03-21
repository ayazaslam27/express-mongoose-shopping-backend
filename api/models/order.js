let mongoose = require("mongoose");

let ShippingAddressSchema = mongoose.Schema({
  street_name: { type: String, required: true },
  house_number: { type: String, required: true },
  postcode: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true }
});

let PayerSchema = mongoose.Schema({
  email_address: { type: String, required: true },
  name: { type: String, required: true },
  shipping_address: ShippingAddressSchema
});

let OrderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  create_time: { type: String, required: true },
  payer_id: { type: String, required: true },
  order_id_global: { type: String, required: true },
  status: { type: String, required: true },
  update_time: { type: String, required: true },
  purchase_products: [{}],
  payee: PayerSchema,
  total_amount: { type: String, required: true }
});

module.exports = mongoose.model("Order", OrderSchema);
