/*---Initial Requires---*/
var con     =     require('mysql');
var argv    =     require('yargs');
var http    =     require('http');
var url     =     require('url');

/*MySQL Connection*/
var db = con.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'openinv'
});
db.connect();


http.createServer(function(request, response) {
  var querystring = url.parse(request.url, true).query;
  console.log(querystring);

  /*Functions for each action type, mostly just DB queries*/
  function actionAdd() {
    var quantity = querystring.quantity;
    for (x=0; x<quantity; x++) {
      console.log("Inserting...");
      var insert = {type: querystring.type, item: querystring.item, value: querystring.value}
      db.query('INSERT INTO openinv.items SET ?', insert, function(err, res) {
        if (err) {
          console.log("Error: DB stuff ain't working");
          throw err;
        }
      })
    }
  }
  /*Assembly Action- checks blueprint requirements, adds resulting items while removing components*/
  function actionAssemble() {
    var blueprint = querystring.blueprint;
    db.query('SELECT * FROM blueprints where product_name = ?', blueprint, function(err, results, rows) {
       var ret = JSON.stringify(results);
       var stuff = JSON.parse(ret);
       var components_string = stuff[0].components_json;
       var components = JSON.parse(components_string);
      console.log(components);
    });
    db.query('SELECT * FROM items wheretype = component and item = ?', blueprint, function(err, results, rows) {
       var ret = JSON.stringify(results);
       var stuff = JSON.parse(ret);
       var components_string = stuff[0].components_json;
       var components = JSON.parse(components_string);
      console.log(components);
    });

  }



  var action = querystring.action;
  switch(action) {
    case 'add':
      actionAdd();
      break;
    case 'assemble':
      actionAssemble();
      break;
    default:
      response.end("Please provide an action");
  }


  response.end("Success");

}).listen(8081);

console.log('Listening...');
