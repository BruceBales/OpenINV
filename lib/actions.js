var argv   =   require('yargs').argv;

if (argv.h) {
  dbhost = argv.h;
} else {
  dbhost = 'localhost';
}
if (argv.u) {
  dbuser = argv.u;
} else {
  dbuser = 'root';
}
if (argv.p) {
  dbpass = argv.p;
} else {
  dbpass = 'root';
}
if (argv.db) {
  database = argv.db;
} else {
  database = 'openinv'
}

var url    =   require('url'),
    con    =   require('mysql'),
    db     =   con.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'openinv'
              })
    ;



 exports.Add = function(request) {
  var querystring = url.parse(request.url, true).query;
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

exports.Remove = function(request) {
  var querystring = url.parse(request.url, true).query;
  var quantity = querystring.quantity;
  for (x=0; x<quantity; x++) {
    console.log("Removing...");
    db.query('DELETE FROM openinv.items WHERE item = "'+querystring.item+'" order by id desc limit 1;', "", function(err, res) {
      if (err) {
        console.log("Error: DB stuff ain't working");
        throw err;
      }
    })
  }
}
