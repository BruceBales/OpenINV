var encode = require('sha256');

exports.Authenticate = function(item, security_key, private_token) {
  var correct_token = encode(private_token + item);
  if (correct_token == security_key) {
    return true;
  } else {
    return false;
  }
}
