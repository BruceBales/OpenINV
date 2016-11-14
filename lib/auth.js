var encode = require('sha256');

exports.Authenticate = function(item, security_key) {
  var private_token = "blah123";
  var correct_token = encode(private_token + item);
  if (correct_token == security_key) {
    return true;
  } else {
    return false;
  }
}
