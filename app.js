var express = require("express");

const port = 5556;
var categoryRouter = require("./api/routes/category");
var productRouter = require("./api/routes/product");
var userRouter = require("./api/routes/user");
var emailRouter = require("./api/routes/email");
var orderRouter = require("./api/routes/order");

var app = express();

const mongoose = require("mongoose");

const dbRoute =
  "mongodb+srv://" +
  process.env.DB_USERNAME +
  ":" +
  process.env.DB_PASSWORD +
  "@we-sell-cluster-xasrs.mongodb.net/wesell?retryWrites=true";
// const dbRoute = "mongodb://localhost/we-sell";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connect(dbRoute, function(error) {
  if (error) {
    console.log(error);
  }
});

mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

app.use("/category", categoryRouter);
app.use("/products", productRouter);
app.use("/user", userRouter);
app.use("/emai", emailRouter);
app.use("/buy", orderRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
