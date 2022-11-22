import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const port = 8900;
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Slu3th.,4783',
	database: 'students',
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json('Welcome to the backend!');
});

// tanscripts
app.get('/transcripts', (req, res) => {
	const q = 'SELECT * FROM transcripts';
	db.query(q, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.post('/transcripts', (req, res) => {
	const q =
		'INSERT INTO transcripts (`studentid`, `yearid`, `semesterid`, `progid`) VALUES (?)';
	const values = [
		req.body.studentid,
		req.body.yearid,
		req.body.semesterid,
		req.body.progid,
	];

	db.query(q, [values], (err, data) => {
		if (err) return res.json(err);
		return res.json('Transcript added successfully');
	});
});
// End tanscripts

// students
app.get('/students', (req, res) => {
	const q1 = 'SELECT * FROM students';
	db.query(q1, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.post('/students', (req, res) => {
	const q2 =
		'INSERT INTO students (`fname`,`lname`,`progid`,`gender`) VALUES(?)';
	const values = [
		req.body.fname,
		req.body.lname,
		req.body.progid,
		req.body.gender,
	];

	db.query(q2, [values], (err, data) => {
		if (err) return res.json(err);
		return res.json('Student created succesfully');
	});
});
// End students

// books
app.get('/books', (req, res) => {
	const q = 'SELECT * FROM books';
	db.query(q, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.post('/books', (req, res) => {
	const q = 'INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)';
	const values = [req.body.title, req.body.desc, req.body.cover];
	db.query(q, [values], (err, data) => {
		if (err) return res.json(err);
		return res.json('Book added successfully');
	});
});

// End books

app.listen(port, (req, res) => {
	console.log(`Server connected on http://localhost:${port}`);
});
