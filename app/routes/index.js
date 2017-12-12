// This is our main routes file that will import all the routes and export them passing app and database

const noteRoutes = require ('./note_routes'); // Import note_routes

module.exports = function(app, db) {
  noteRoutes(app, db); // Pass app and db object to be used in note_routes file
}