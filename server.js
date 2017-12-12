const express     = require('express'); // Import Express
const MongoClient = require('mongodb').MongoClient; // Import Mongo Client to connect to database
const bodyParser  = require('body-parser'); // Import body-parser to parse JSON
const db          = require('./config/db'); // Import database configuration file

const app         = express(); // Define app as an express instance

const port        = 8000; // Port that our app will listen to

app.use(bodyParser.urlencoded({ extended: true })); // Allow the app to parse urlencoded params as JSON

// Connect database
MongoClient.connect(db.url, (err, client) => {
  if (err) return console.log(err);

  const database = client.db('notable'); // Get database from client object. This is specific to Mongodb v3.0.0rc0
  
  require('./app/routes')(app, database); // Import all routes and pass app and database object
  
  app.listen(port, () => { // Tell the app to listen to the defined port i.e. 8000
    console.log("We are live on " + port);
  });
});