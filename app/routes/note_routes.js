var ObjectID = require('mongodb').ObjectID; // Import Mongo Object ID to get _id as an object

module.exports = function(app, db) {
  
  // Create a Note
  app.post('/notes', (req, res) => {
		const note = { title: req.body.title, text: req.body.body }; // Create a JSON object

		db.collection('notes').insert(note, (err, result) => { // Ask for `notes` collection and pass the `note` object
		  if(err) {
				res.send({ 'error': 'An error has occured' });
		  } else {
		  	res.send(result.ops[0]); // Send the created note object
		  }
		});
  });

  // Read a Note
  app.get('/notes/:id', (req, res) => {
  	const id = req.params.id; // ID as a string from URL
  	const details = { '_id': new ObjectID(id) }; // Mongo requires _id as an ObjectID to find its related object

  	db.collection('notes').findOne(details, (err, item) => {
  		if(err) {
  			res.send({ 'error': 'An error has occured' });
  		} else {
  			res.send(item);
  		}
  	});
  });

  // Update a Note
  app.put('/notes/:id', (req, res) => {
  	const id = req.params.id; // ID as a string from URL
  	const details = { '_id': new ObjectID(id) }; // Mongo requires _id as an ObjectID to find its related object
  	const note = { title: req.body.title, text: req.body.body }; // Create a JSON object

  	db.collection('notes').update(details, note, (err, item) => {
  		if(err) {
  			res.send({ 'error': 'An error has occured' });
  		} else {
  			res.send(item);
  		}
  	});
  });

  // Delete a Note
  app.delete('/notes/:id', (req, res) => {
  	const id = req.params.id; // ID as a string from URL
  	const details = { '_id': new ObjectID(id) }; // Mongo requires _id as an ObjectID to find its related object

  	db.collection('notes').remove(details, (err, item) => {
  		if(err) {
  			res.send({ 'error': 'An error has occured' });
  		} else {
  			res.send('Note ' + id + ' deleted!');
  		}
  	});
  });

};