const fs = require("fs");
const jwt = require("jsonwebtoken");

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY = fs.readFileSync("./private.key", "utf8");
var publicKEY = fs.readFileSync("./public.key", "utf8");

let sign = function(payload, $Options) {
  var signOptions = {
    issuer: $Options.issuer,
    subject: $Options.subject,
    audience: $Options.audience,
    expiresIn: "1h",
    algorithm: "RS256"
  };
  return jwt.sign(payload, privateKEY, signOptions);
};

let verify = function(token, $Option) {
  var verifyOptions = {
    issuer: $Option.issuer,
    subject: $Option.subject,
    audience: $Option.audience,
    expiresIn: "1h",
    algorithm: ["RS256"]
  };
  try {
    return jwt.verify(token, publicKEY, verifyOptions);
  } catch (err) {
    return false;
  }
};

let decode = function(token) {
  return jwt.decode(token, { complete: true });
};

module.exports = {
  sign: sign,
  verify: verify,
  decode: decode
};
