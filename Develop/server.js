
const express = require('express');
const path = require('path');
// const { clog } = require('./middleware/clog');
// const api = require('./routes/index.js');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

// // Import custom middleware, "cLog"
// app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Server error' });
    }

    const notes = JSON.parse(data);

    res.json(notes);
  });
});

app.get('/assets/*', (req, res) => {
  res.sendFile(__dirname + '/public' + req.path);
});

app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

app.post('/api/notes', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);