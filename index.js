const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());
const fs = require('fs');

app.post('/save-changes', async (req, res) => {
	const post = {
			id: req.body.id,
			action: req.body.action,
			status: req.body.status,
			timestamp: new Date()
		};
	const path = './public/log.json';
	try{
		fs.readFile(path, function (err, data) {
			var json = [];
			if(data)
		    	json = JSON.parse(data);
		    json.push(post);
		    fs.writeFile(path, JSON.stringify(json), function(err, result) {
		     if(err) console.log('error', err);
		   });
		});
		res.status(201).json(post);
	}
	catch(err){
		res.status(400).json({
			message: err
		});
	}
});
app.get('/saved-changes', (req, res) => {
	const path = './public/log.json';
	try{
		fs.readFile(path, function (err, data) {
			let changes = JSON.parse(data);
			res.status(200).json(changes);
		});
	}
	catch(err){
		res.status(400).json({
			message: err
		});
	}
});
app.listen(PORT, () => console.log(`Server started on ${PORT}`));