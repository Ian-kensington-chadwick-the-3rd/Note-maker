const db = require('./db/db.json')
const express = require('express');

const path = require('path')
const app = express();
const fs = require('fs');
const uuid = require('./uuid')


app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// app.get('/api/notes', (req, res) => {
//     console.info(`${req.method} note made!`);
//     fs.readFile('./db/db.json' ,  (error, data) => {
//       if(error){
//         console.log('error');
//       }else {
//         console.log(data);
//         // res.json(data)
//          res.json(db)
//       }
//      }) 
    
// });




app.get('/api/notes', (req, res) => {
    console.info(`${req.method} note made!`);
    res.json(db)
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a tip`);
    
    const { title, text, id } = req.body;
    
    const newNote = {
        title,
        text,
        id : uuid()
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

    // it dont work all the way
     app.delete('/api/notes/:id', (req, res) => {
         const noteId = req.params.id;
         console.log('this is NOTEID:',noteId)
          fs.readFile('./db/db.json', 'utf-8', (error, data) => {
         if(error) {
          console.log('error reading file')
         } else {

            let parsedData = JSON.parse(data);
            console.log('this is parsed data:', parsedData);
           
          let result = parsedData.filter((note) => 
            note.id !== noteId 
            // console.log(result); 
          );
          console.log('this is RESULT:',result);
           fs.writeFile('./db/db.json' , JSON.stringify(result), (error)=> {
            if(error){
              console.log('error deleting file');
            }else {
              console.log("note deleted");
            }
           }) 
         } 
          //  console.log(data);
          
        })

        
        res.json(db)
      
    });
  


app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT}`)
);

