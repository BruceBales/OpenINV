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
  var security_token = querystring.security_token;
  is_authenticated = auth.Authenticate(querystring.item, security_token);
  if (is_authenticated == false) {
    response.end("Authentication Failed");
  }
  switch(action) {
    case 'add':
      actions.Add(request);
      break;
    case 'assemble':
      response.end("Assemble Action is WIP");
      break;
    case 'remove':
      actions.Remove(request);
      break;
    default:
      response.end("Please provide an action");
  }


  response.end("Success");

}).listen(8081);

console.log('Listening...');
