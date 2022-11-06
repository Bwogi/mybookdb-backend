import express from 'express';
const app = express();
const port = 8900;
import mysql from 'mysql';

const db = mysql.createConnection({
	database: 'test',
	user: 'root',
	password: 'Slu3th.,4783',
	host: 'localhost',
});

app.use(express.json());

app.get('/', (req, res) => {
	res.json('this is the home route of this app.');
});

app.get('/books', (req, res) => {
	// res.json('this is the books route of this app.');
	const myQuery = 'SELECT * FROM books';
	db.query(myQuery, (err, data) => {
		if (err) {
			return res.json(err);
		}
		return res.json(data);
	});
});
app.post('/newbook', (req, res) => {
	const newQuery = 'INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)';
	const values = [req.body.title, req.body.desc, req.body.cover];
	db.query(newQuery, [values], (err, data) => {
		if (err) {
			return res.json(err);
		}
		return res.json(data);
	});
});
app.listen(port, () =>
	console.log(`server is running on http://127.0.0.1:${port}`)
);
