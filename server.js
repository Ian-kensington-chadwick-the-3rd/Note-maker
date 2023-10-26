const db = require('./db/db.json')
const express = require('express');
const util = require('node:util')
const PORT = 3001;
const path = require('path')
const app = express();
const fs = require('fs');
console.log(db)
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} note made!`);
    res.json(db)
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a tip`);
    
    const { title, text  } = req.body;
    
    const newNote = {
        title,
        text,
        
      };

     
     db.push(newNote)
      fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) {
          console.error('Error writing to the file:', err);
        } else {
          console.log('File has been written successfully.');
        }
      });
      res.json(db)
     });









app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT}`)
);

