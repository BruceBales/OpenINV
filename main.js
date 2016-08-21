/*---Initial Requires---*/
var argv    =     require('yargs');
var http    =     require('http');
var url     =     require('url');
var actions  =     require('./lib/actions.js');

http.createServer(function(request, response) {
  var querystring = url.parse(request.url, true).query;
  console.log(querystring);

  var action = querystring.action;
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
