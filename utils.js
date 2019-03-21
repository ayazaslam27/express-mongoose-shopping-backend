var jwtGenerator = require("./token-generator");

var options = require("./jwt-token-option");

let ensureToken = function(req, res, next) {
  options.audience = req.body.audience;
  var bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    var verified = jwtGenerator.verify(bearerToken, options);
    if (!verified) {
      res.status(403).json({
        showPaymentOptions: false,
        success: false,
        message: "User is not authenticated"
      });
    } else {
      next();
    }
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  ensureToken: ensureToken
};
