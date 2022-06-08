const express = require('express');
const routes = require('./routes');
const ExpressError = require('./expressError');
const app = express();
app.use(express.json());
app.use('/items', routes);

//custom 404
app.use((req, res, next) => {
	const e = new ExpressError('Page not Found', 404);
	next(e);
});

//error handler
app.use((err, req, res, next) => {
	//default error status code to 500
	let status = err.status || 500;
	let msg = err.message;

	return res.status(status).json({
		error: { msg, status }
	});
});

module.exports = app;
