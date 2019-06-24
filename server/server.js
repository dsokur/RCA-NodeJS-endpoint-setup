const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const port = 7777;
const helmet = require('helmet');

//set various HTTP headers to help protect your app.
app.use(helmet());
// Takes the raw requests and turns them into usable properties on req.body
// middleware that allow to take url query sting and put it to req (req.query/req.body) in our functions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set header params for CORS requests
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

//pre-flight requests
app.options('*', function(req, res) {
	res.send(200);
});

app.post('/api/v1/add', (req, res) => {
	res.status(200).send({
		success: 'true',
		message: 'todos retrieved successfully',
		todos: req.body
	})
});

app.post('/add', ( req, res) => {
	res.status(200);
	console.log('req.body', req.body);
	res.send('working');
	res.end();
});

//if we have to setup 2 or more requests on same endpoint we can use this pattern
app.all('/', (req, res) => {
	if (req.method === 'GET') {

	} else if (req.method === 'POST') {

	} else if (req.method === 'PUT') {

	}
});

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	/* eslint-disable no-console */
	console.log(`Express running → PORT ${port}`);
});

module.exports = server;