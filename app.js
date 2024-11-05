const { time } = require('console');
const express = require('express');  
const path = require('path');  
const bodyParser = require('body-parser');   
const app = express();
const port = 8000;    
const { MongoClient } = require("mongodb"); 

console.log(Date());

// Starting server
app.listen(port, '0.0.0.0', () => {
    console.log('Server running on port 8000');
});

const uri = "mongodb+srv://ismarosmanovic04:hCprY70OQEnq3yod@ismardb.s36za.mongodb.net/?retryWrites=true&w=majority&appName=ismarDB";  //Link for mongoDB database
const client = new MongoClient(uri); 



app.use(bodyParser.urlencoded({ extended: true }));     

app.post('/newpost', (req, res) => {
    const Text = "Novi"//req.body.myText;  
    const Head = "Novi"//req.body.myHead;
    const User = "Post"//req.body.myUser
  
    console.log("Post received");
  
  
  
    const myobj = {Head: Head, Text: Text, User: User }; 
    pageWrite("post", myobj);  
  
    // Send a response back to the client to confirm success
    res.json({ message: "Post successful", data: myobj });
  });


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
  
  