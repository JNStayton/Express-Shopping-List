const express = require('express');
const router = new express.Router();
const ExpressError = require('./expressError');
const items = require('./fakeDB');

router.get('/', (req, res) => {
	res.json({ items });
});

router.post('/', (req, res, next) => {
	try {
		if (!req.body.name || !req.body.price) {
			throw new ExpressError('Must include a name and price', 401);
		}
		let newItem = { name: req.body.name, price: req.body.price };
		items.push(newItem);
		return res.status(201).json({ item: newItem });
	} catch (e) {
		return next(e);
	}
});

router.get('/:name', (req, res, next) => {
	try {
		const item = items.find((item) => item.name === req.params.name);
		if (item === undefined) {
			throw new ExpressError('Item not found', 404);
		}
		return res.json({ item: item });
	} catch (e) {
		return next(e);
	}
});

router.patch('/:name', (req, res, next) => {
	try {
		const item = items.find((item) => item.name === req.params.name);
		if (item === undefined) {
			throw new ExpressError('Item not found', 404);
		}
		if (!req.body.price) {
			throw new ExpressError('Please update item price', 401);
		}
		item.price = req.body.price;
		return res.json({ item: item });
	} catch (e) {
		return next(e);
	}
});

router.delete('/:name', (req, res, next) => {
	try {
		const idx = items.findIndex((item) => item.name === req.params.name);
		if (idx === -1) {
			throw new ExpressError('Item not found', 404);
		}
		items.splice(idx, 1);
		return res.json({ message: 'Deleted' });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
