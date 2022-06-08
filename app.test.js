process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('./app');
let items = require('./fakeDB');

let wine = { name: 'wine', price: 12.99 };

beforeEach(() => {
	items.push(wine);
});

afterEach(() => {
	items.length = 0;
});

describe('test GET routes', () => {
	test('get all items', async () => {
		const resp = await request(app).get('/items');
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual({ items });
	});
	test('get one item', async () => {
		const resp = await request(app).get('/items/wine');
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual({ item: wine });
	});
});

describe('test POST and PATCH routes', () => {
	test('post one item', async () => {
		const resp = await request(app).post('/items').send({
			name: 'coffee',
			price: 3.99
		});
		expect(resp.statusCode).toBe(201);
		expect(resp.body).toEqual({
			item: {
				name: 'coffee',
				price: 3.99
			}
		});
	});
	test('patch one item', async () => {
		const resp = await request(app).patch(`/items/${wine.name}`).send({
			price: 16.99
		});
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual({
			item: {
				name: 'wine',
				price: 16.99
			}
		});
	});
});

describe('test DELETE routes', () => {
	test('delete a single item', async () => {
		const resp = await request(app).delete(`/items/${wine.name}`);
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual({
			message: 'Deleted'
		});
	});
});
