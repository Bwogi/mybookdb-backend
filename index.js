import express from 'express';
const app = express();
const PORT = 8800;
import mysql from 'mysql';

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Slu3th.,4783',
	database: 'test',
});

app.use(express.json());
app.get('/', (req, res) => {
	res.json('Hello this is the backend');
});

app.get('/books', (req, res) => {
	const q = 'SELECT * FROM books';
	db.query(q, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.post('/books', (req, res) => {
	const q = 'INSERT INTO books (`title`, `desc`, `cover`) values(?)';
	const values = [
		// insert into db directly
		// 'title from backend',
		// 'desc from backend',
		// 'cover from backend',

		// insert into db via client
		req.body.title,
		req.body.desc,
		req.body.cover,
	];
	db.query(q, [values], (err, data) => {
		if (err) {
			res.json(err);
		}
		return res.json(data);
	});
});

app.listen(PORT, () =>
	console.log(`Connected to Backend via http://localhost:${PORT}`)
);
