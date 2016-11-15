/*---Initial Requires---*/
var argv    =     require('yargs');
var http    =     require('http');
var url     =     require('url');
var actions =     require('./lib/actions.js');
var auth    =     require('./lib/auth.js');

http.createServer(function(request, response) {
  var querystring = url.parse(request.url, true).query;
  console.log(querystring);
  var action = querystring.action;

/*Security Token Variables*/
  var security_token = querystring.security_token,
      private_token = argv.t,
      is_authenticated = auth.Authenticate(querystring.item, security_token, private_token);

  switch(action) {
    case 'add':
      if (is_authenticated == false) {
        response.end("Authentication Failed");
        console.log("Failed Authentication Attempt");
        break;
      }
      if (is_authenticated == true) {
        console.log("Successfully Authenticated");
      }
      actions.Add(request);
      break;
    case 'assemble':
      if (is_authenticated == false) {
        response.end("Authentication Failed");
        console.log("Failed Authentication Attempt");
        break;
      }
      if (is_authenticated == true) {
        console.log("Successfully Authenticated");
      }
      response.end("Assemble Action is WIP");
      break;
    case 'remove':
      if (is_authenticated == false) {
        response.end("Authentication Failed");
        console.log("Failed Authentication Attempt");
        break;
      }
      if (is_authenticated == true) {
        console.log("Successfully Authenticated");
      }
      actions.Remove(request);
      break;
    default:
      response.end("Please provide an action");
  }


  response.end("Success");

}).listen(8081);

console.log('Listening...');
