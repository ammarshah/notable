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

};