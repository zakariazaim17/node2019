'use strict';


//console.log('my powerful app.');

const express = require('express');
const connection = require('./model/db.js');
const animal = require('./model/animal.js');


const port = 3000;
const app = express();

if(process.env.SERVER === 'dev_localhost'){
	require('./secure/localhost')(app);
} else {
	require('./secure/server')(app);
	app.listen(3000, () => {
	console.log('server app start')
	});
}




const bodyParser = require('body-parser');



app.use(express.static('public'));

app.get('/animals', async (req, res) => {
    try{
	const results = await animal.getAll();
		
			
			res.json(results);
} catch (e) {
	console.log(e);
	res.send('db error :(');
}

});

app.get('/animal', async (req, res) => {
  console.log(req.query);

	//res.send(`query params? ${req.query}`);
	try{
		       res.json(await animal.search(req.query.name));
	} catch (e) {
		res.send(`db error`);
	}
});

app.post('/animal', bodyParser.urlencoded({extended: true}), async (req, res) => {
  
	console.log(req.body);
	try{
		        res.json(await animal.insert(req.body.name));

	} catch (e){
	console.log(e);
	res.send('db error');
	}


});

app.get('/', (req, res) => {
	if(req.secure){
	res.send('Hello from my node secure server');}
	else {
		res.send('Hello  from my node server unsecure');
	}
});

app.get('/demo', (req, res)=> {
	
		console.log('request', req);
		res.send('demo');
});


