const express = require('express');
const mysql = require('mysql');
const app = express();

// Assume we have a MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'test_db'
});

app.get('/user', (req, res) => {
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
