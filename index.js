const express = require('express');
const mysql = require('mysql');
const RateLimit = require('express-rate-limit');
const app = express();

// Assume we have a MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'test_db'
});

// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

app.get('/user', limiter, (req, res) => {
  const userId = req.query.id;

  // Vulnerable: Using user input directly in the SQL query
  const query = `SELECT * FROM users WHERE id = ${userId}`;

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error querying the database.');
    } else {
      res.json(results);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
