const path = require('path');  

const express = require('express');
const feedRouter = express.Router();               //For joining paths

feedRouter.use(express.json());

feedRouter.all('*', (req,res, next)=>{

    next();
  
  })

feedRouter.get('/novi', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'red.html'));

})

feedRouter.post('/routerred', (req, res) =>{
   
    res.send(JSON.stringify('ismar'));
    
   // res.sendFile(path.join(__dirname, 'public', 'red.html'));
   
 })


 module.exports = feedRouter;
