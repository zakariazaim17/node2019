'use strict';

console.log('my powerful app.');

const express = require('express');

const port = 3000;
const app = express();

app.use(express.static('public'));


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
