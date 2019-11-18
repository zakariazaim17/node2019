'use strict';


//console.log('my powerful app.');

const express = require('express');
const connection = require('./model/db.js');



const port = 3000;
const app = express();

app.use(express.static('public'));

app.get('/animals', async (req, res) => {
    try{
	const [results, fields] = await connection.query(
		'SELECT * FROM zoo.animal');
		
			console.log(results);
			console.log(fields);
			res.json(results);
} catch (e) {
	console.log(e);
	res.send('db error :(');
}

});

app.get ('/animal', async (req, res) => {
   
});

app.get('/', (req, res) => {
    res.send('Hello from my node server');
});

app.get('/demo', (req, res)=> {
	
		console.log('request', req);
		res.send('demo');
});

app.listen(3000, () => {
	console.log('server app start?');
});
