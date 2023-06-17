const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const socketIO = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = socketIO(server);

// Enable CORS
app.use(cors());

// Database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'practice',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});


// Middleware to parse JSON requests
app.use(express.json());


// Define a route to handle form submission and insert data into the database
app.post('/users', (req, res) => {
  const { username, userpassword, userfullname } = req.body;
  // Perform validation if needed
  // Create an SQL query to insert the data
  const query = `INSERT INTO users (username, userpassword, userfullname) VALUES (?, ?, ?)`;
  const values = [username, userpassword, userfullname];
  // Execute the query
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    // Data inserted successfully
    res.status(201).json({ message: 'Data inserted successfully' });
  });
});


app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Emit a socket.io event to notify connected clients of the updated user data
    io.emit('usersUpdated', results);

    res.json(results);
  });
});



// Get single user from the database
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results[0]); // Assuming the query returns a single user
  });
});


// edit single user from the database for edit
app.post('/edit/:id', (req, res) => {
  const userID = req.params.id;
  const { username, userpassword, userfullname } = req.body;

  connection.query(
    'UPDATE users SET username = ?, userpassword = ?, userfullname = ? WHERE ID = ?',
    [username, userpassword, userfullname, userID],
    (err, results) => {
      if (err) {
        console.error('Error updating user data:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({ message: 'User data updated successfully' });
    }
  );
});






// Start the server
const port = 3000; // or any other port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});