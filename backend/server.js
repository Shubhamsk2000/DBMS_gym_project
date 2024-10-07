const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const apiRoutes = require('./routes/apiRoutes');
const app = express();


app.use(cors());  // Enable CORS for all requests
app.use(bodyParser.json());  // Parse JSON request bodies

// middleware for api routes
app.use('/api', apiRoutes);

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1318',
    database: 'fitness_center_db'
  });

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.log('Error connecting to MySQL database', err);
    return;
  }
  console.log('Connected to MySQL database');
});


// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});