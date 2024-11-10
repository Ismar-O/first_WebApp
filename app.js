
const express = require('express');  
const app = express();
var cookieParser = require('cookie-parser');   //Parsing cookies
app.use(cookieParser());
const path = require('path');                 //For joining paths

app.set('view engine', 'pug');




/****************************************** */

app.use(express.json());

const port = 8000;    
const { MongoClient } = require("mongodb"); 



console.log(Date());

// Starting server
app.listen(port, '0.0.0.0', () => {
    console.log('Server running on port 8000');
});

const uri = "mongodb+srv://ismarosmanovic04:hCprY70OQEnq3yod@ismardb.s36za.mongodb.net/?retryWrites=true&w=majority&appName=ismarDB";  //Link for mongoDB database
const client = new MongoClient(uri); 


app.use(express.static(path.join(__dirname, '/public')))
//app.use(express.static(path.join(__dirname, '/public/js'))); Nije potrebno 
//app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/images')));

app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})



app.post('/newpost', (req, res) => {
  
    console.log('Redirectam');
    console.log(req.cookies); 
    
  
   
    res.cookie('rememberme', '1', { expires: new Date(Date.now() + 36000000), httpOnly: true, sameSite: 'None', secure: 'false'})

    res.redirect('/redirect');

    
  
    
  });


  app.get('/redirect', (req, res) =>{
   
     res.sendFile(path.join(__dirname, 'public', 'red.html'));
    
  })

  app.post('/redirect', (req,res)=>{
    res.redirect('/getred');
    console.log(req.body);
    res.end();

  })

  app.get('/getred', (req,res) =>{

    res.render('test', { title: 'Hey', message: 'Hello there!', paragraph: 'Ismar Osmanovic Ismar Osmanovic Ismar Osmanovic' })


  })




  //Writing to base
  async function pageWrite(pageColl, obj) {
   
    try {
      // Connect to the MongoDB server
      await client.connect();
      console.log("Connected successfully to server");
      const db = client.db("page");
      const result = await db.collection(pageColl).insertOne(obj);
      console.log("1 document inserted", result);
      } catch (err) {
      console.error("An error occurred:", err);
    } finally {
         await client.close();
    }
  }
  
  