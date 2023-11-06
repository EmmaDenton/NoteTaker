
const express = require('express');
const path = require('path');
const generateUniqueId = require('generate-unique-id');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: generateUniqueId(),
    };
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);