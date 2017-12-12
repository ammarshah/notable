const express     = require('express'); // import express
const MongoClient = require('mongodb').MongoClient; // import mondodb database
const bodyParser  = require('body-parser'); // import body-parser to parse JSON
const db          = require('./config/db'); // import database configuration file

const app         = express(); // define app as an express instance

const port        = 8000; // port that our app will listen to

app.use(bodyParser.urlencoded({ extended: true })); // allow the app to parse urlencoded params as JSON

// connect database
MongoClient.connect(db.url, (err, client) => {
  if (err) return console.log(err);

  const database = client.db('notable');
  
  require('./app/routes')(app, database); // import all routes and pass app and database object
  
  app.listen(port, () => { // tell the app to listen to the defined port i.e. 8000
    console.log("We are live on " + port);
  });
});